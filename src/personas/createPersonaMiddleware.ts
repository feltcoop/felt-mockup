import {Middleware} from 'polka';
import send from '@polka/send-type';

import {Server} from '../server/Server.js';

// TODO this really doesn't belong as its own middleware,
// we probably want a data structure representing our API
// powered by a single middleware

export const createPersonaMiddleware = (server: Server): Middleware => {
	return async (req, res) => {
		console.log('createPersonaMiddleware req.body', req.body!.name); // TODO logging
		const {name} = req.body!;

		// TODO declarative authorization
		if (!req.account) {
			return send(res, 401, {reason: `Please log in`});
		}

		try {
			const createPersonaResult = await server.db.repos.personas.create({
				account: req.account.id,
				name,
			});
			if (createPersonaResult.ok) {
				return send(res, 200, {persona: createPersonaResult.value});
			} else {
				return send(res, 400, {reason: createPersonaResult.reason});
			}
		} catch (_err) {
			return send(res, 500, {reason: 'Unknown error creating persona'});
		}
	};
};
