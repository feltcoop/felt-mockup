import {Middleware} from 'polka';
import send from '@polka/send-type';

import {isEmail, normalizeEmail} from '../client/email/email.js';
import {Server} from '../server/Server.js';
import {AccountModel} from './AccountModel.js';
import {ClientSession} from '../client/session/session.js';

export const accountLoginMiddleware = (server: Server): Middleware => {
	return async (req, res) => {
		console.log('accountLoginMiddleware req.body', req.body!.email); // TODO logging

		// TODO formalize and automate validation and normalization
		const email = normalizeEmail(req.body!.email);
		if (!isEmail(email)) {
			return send(res, 400, {reason: `Invalid email '${email}'.`});
		}

		if (req.account) {
			if (req.account.email === email) {
				return send(res, 400, {reason: `Already logged in with email '${email}'.`});
			} else {
				return send(res, 400, {
					reason:
						`Already logged in with email '${req.account.email}'.` +
						` Please first log out if you wish to log in with email '${email}'.`,
				});
			}
		}

		// First see if the account already exists.
		const findAccountResult = await server.db.repos.accounts.findByEmail(email);
		let account: AccountModel;
		if (findAccountResult.ok) {
			// There's already an account, so proceed to log in.
			account = findAccountResult.value;
		} else if (findAccountResult.type === 'noAccountFound') {
			// There's no account, so create one.
			const createAccountResult = await server.db.repos.accounts.create({email});
			if (createAccountResult.ok) {
				account = createAccountResult.value;
			} else {
				return send(res, 500, {reason: createAccountResult.reason});
			}
		} else {
			return send(res, 400, {reason: findAccountResult.reason});
		}

		if (process.env.NODE_ENV === 'development') {
			// TODO how to ensure this NEVER gets run in production?
			// If the deployment somehow runs in dev mode.. this code is a disaster!
			// > Ham: Maybe instead of making it a dev env thing,
			// > we can have a role we can add to local dev accounts to grant a similar amount of access?

			// This assigns a trusted identity to the session cookie.
			// In development, that's every submission with no security.
			req.session.email = account.email;

			console.log('sending', account); // TODO logging
			const clientSession: ClientSession = {account};
			return send(res, 200, {session: clientSession}); // TODO API types
		}

		// TODO send an email!
		send(res, 501, {reason: 'Not yet implemented for production.'});
	};
};
