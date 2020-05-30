import sirv from 'sirv';
import compression from 'compression';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import polka, {Polka, Request} from 'polka';

import {accountLoginMiddleware} from '../accounts/accountLoginMiddleware.js';
import {accountLogoutMiddleware} from '../accounts/accountLogoutMiddleware.js';
import {attachSessionAccountMiddleware} from '../accounts/attachSessionAccountMiddleware.js';
import {Db} from '../db/Db.js';
import {ClientSession} from '../client/session/session.js';
import {getEnv} from '../project/env.js';

const {PORT, NODE_ENV} = getEnv();
const __DEV__ = NODE_ENV === 'development';

const TODO_SERVER_COOKIE_KEYS = ['TODO', 'KEY_2_TODO', 'KEY_3_TODO'];

type ExpressMiddleware = any; // TODO this is a temporary type hack - see `./polka.d.ts` for more

export class Server {
	readonly app: Polka;
	readonly db: Db;

	constructor() {
		this.app = polka();
		this.db = new Db();

		// Set up app middleware.
		this.app
			.use((req, _res, next) => {
				// TODO proper logger
				console.log('request', req.url, req.params);
				next();
			})
			.use(compression({threshold: 0}) as ExpressMiddleware, sirv('static', {dev: __DEV__}))
			.use(bodyParser.json() as ExpressMiddleware)
			.use(
				cookieSession({
					keys: TODO_SERVER_COOKIE_KEYS,
					maxAge: 1000 * 60 * 60 * 24 * 7 * 6, // 6 weeks
					secure: !__DEV__,
					sameSite: __DEV__ ? 'lax' : 'none',
				}) as ExpressMiddleware,
			)
			.use(attachSessionAccountMiddleware(this))
			.post('/api/v1/accounts/login', accountLoginMiddleware(this))
			.post('/api/v1/accounts/logout', accountLogoutMiddleware(this))
			.use(
				sapper.middleware({
					session: (req: Request): ClientSession =>
						req.account ? {account: req.account} : {isGuest: true},
				}),
			)
			.listen(PORT, () => {
				// TODO proper logger
				console.log(`listening on localhost:${PORT}`);
			});
	}

	// TODO test this
	async destroy(): Promise<void> {
		// TODO this.app.close?
		await this.db.destroy();
	}
}
