import {Middleware} from 'polka';
import send from '@polka/send-type';

import {Server} from '../server/Server.js';

// TODO this really doesn't belong as its own middleware,
// we probably want a data structure representing our API
// powered by a single middleware

export const createCommunityMiddleware = (server: Server): Middleware => {
	return async (req, res) => {
		console.log('createCommunityMiddleware req.body', req.body!.name); // TODO logging
		const {name} = req.body!;

		// TODO declarative authorization
		if (!req.account) {
			return send(res, 401, {reason: `Please log in`});
		}

		try {
			const createCommunityResult = await server.db.repos.communities.create({name});
			if (createCommunityResult.ok) {
				return send(res, 200, {community: createCommunityResult.value});
			} else {
				return send(res, 400, {reason: createCommunityResult.reason});
			}
		} catch (_err) {
			return send(res, 500, {reason: 'Unknown error creating community'});
		}
	};
};
