import {Middleware} from 'polka';
import send from '@polka/send-type';

import {Server} from '../server/Server';

export const attachSessionAccountMiddleware = (server: Server): Middleware => {
	return async (req, res, next) => {
		if (!req.session.email) {
			return next();
		}

		console.log('attachSessionAccountMiddleware', req.session.email); // TODO logging
		const findAccountResult = await server.db.repos.accounts.findByEmail(req.session.email);
		if (findAccountResult.ok) {
			req.account = findAccountResult.value;
		} else {
			req.session = null!;
			return send(res, 500, {reason: findAccountResult.reason}); // TODO correct status code? not really a 401 is it?
		}

		next();
	};
};
