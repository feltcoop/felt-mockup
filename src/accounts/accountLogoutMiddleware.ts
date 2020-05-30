import {Middleware} from 'polka';
import send from '@polka/send-type';

import {Server} from '../server/Server.js';

export const accountLogoutMiddleware = (_server: Server): Middleware => {
	return async (req, res) => {
		console.log('accountLogoutMiddleware account', req.account?.email); // TODO logging
		if (!req.account) {
			return send(res, 401, {reason: `Not logged in! 😕`});
		}
		req.session = null!;
		send(res, 200, {message: 'See ya soon! 👋'}); // TODO API types
	};
};
