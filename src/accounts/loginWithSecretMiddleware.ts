import {Middleware} from 'polka';
import send from '@polka/send-type';
import {noop} from '@feltcoop/gro/dist/utils/function.js';

import {Server} from '../server/Server.js';

export const loginWithSecretMiddleware = (server: Server): Middleware => {
	const serverOrigin = server.config.server.origin;

	return async (req, res) => {
		// TODO schema validation for params
		const {secret} = req.params;

		// Load the login matching the secret code.
		const findLoginResult = await server.db.repos.logins.findBySecret(secret);
		// TODO better error handling - maybe redirect to an error page with a login form?
		// or at minimum render an HTML page that linkifies the website
		if (!findLoginResult.ok) {
			if (findLoginResult.type === 'noLoginFound') {
				// TODO Because we're deleting the logins, we can't check whether or not
				// the user is already logged into the requested account,
				// and just redirect to the normal website instead of displaying an error.
				// One possible solution that doesn't require storing the login record
				// would be encoding the account in the login link.
				// A downside is that would leak account IDs in every email -
				// it's a small thing but probably worth considering carefully.
				return send(
					res,
					404,
					`Invalid login attempt. This link was probably already used or expired.` +
						` Please try again at ${serverOrigin}`,
				);
			} else {
				return send(res, 400, `Unknown server error: ${findLoginResult.reason}`);
			}
		}
		const login = findLoginResult.value;

		// Delete the login so it can be used only once.
		// We don't need to await the promise or handle errors
		// because expired logins will be cleaned up automatically.
		server.db.repos.logins.deleteById(login.id).catch(noop);

		// Check if the login has expired.
		if (login.expiresAt < new Date()) {
			return send(res, 400, `This login link has expired. Please try again at ${serverOrigin}`);
		}

		// Load the account associated with the login.
		const findAccountResult = await server.db.repos.accounts.findById(login.account);
		if (!findAccountResult.ok) {
			// Failed for some unknown reason.
			return send(res, 400, findAccountResult.reason);
		}
		const account = findAccountResult.value;

		// Assign the account to the request, just in case future code expects it.
		req.account = account;

		// Assign the trusted identity to the session cookie.
		req.session.email = account.email;
		console.log('logging into account', account); // TODO logging

		// Redirect to the specified path or the root if there is none.
		// Include the server origin so it's always scoped to this domain,
		// so malicious logins can't send people to other websites.
		// We could use the `referer` header instead,
		// but it doesn't include the hash path which we'll likely use in the future.
		res.writeHead(303, {Location: `${serverOrigin}${login.redirectPath || ''}`});
		res.end();
	};
};
