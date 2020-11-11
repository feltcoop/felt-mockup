import sirv from 'sirv';
import compression from 'compression';
import * as sapper from '@sapper/server';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import polka, {Polka, Request} from 'polka';
import nodemailer from 'nodemailer';

import {accountLoginMiddleware} from '../accounts/accountLoginMiddleware.js';
import {accountLogoutMiddleware} from '../accounts/accountLogoutMiddleware.js';
import {attachSessionAccountMiddleware} from '../accounts/attachSessionAccountMiddleware.js';
import {Db} from '../db/Db.js';
import {ClientSession} from '../client/session/session.js';
import {loadClientSession} from '../db/loadClientSession.js';
import {getEnv} from '../project/env.js';
import {loginWithSecretMiddleware} from '../accounts/loginWithSecretMiddleware.js';
import {FeltConfig} from '../project/config.js';
import {createPersonaMiddleware} from '../personas/createPersonaMiddleware.js';
import {createCommunityMiddleware} from '../communities/createCommunityMiddleware.js';

const {NODE_ENV} = getEnv();
const __DEV__ = NODE_ENV === 'development'; // TODO replace in build step

const TODO_SERVER_COOKIE_KEYS = ['TODO', 'KEY_2_TODO', 'KEY_3_TODO'];

type ExpressMiddleware = any; // TODO this is a temporary type hack - see `./polka.d.ts` for more

export class Server {
	readonly app: Polka;
	readonly db: Db;
	readonly mailer: nodemailer.Transporter | null;

	constructor(public readonly config: FeltConfig) {
		this.app = polka();
		this.db = new Db();

		// Set up the app and its middleware.
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
			.post('/api/v1/personas', createPersonaMiddleware(this)) // TODO declarative resource API
			.post('/api/v1/communities', createCommunityMiddleware(this)) // TODO declarative resource API
			.get('/api/v1/logins/:secret', loginWithSecretMiddleware(this))
			.use(
				sapper.middleware({
					session: async (req: Request): Promise<ClientSession> =>
						req.account ? loadClientSession(this.db, req.account) : {isGuest: true},
				}),
			);

		// Set up email.
		this.mailer = config.email.isEnabled
			? nodemailer.createTransport(config.email.smtpTransportOptions)
			: null;
	}

	async init(): Promise<this> {
		const {port} = this.config.server;
		// Start the app.
		await new Promise((resolve) => {
			this.app.listen(port, () => {
				// TODO proper logger
				console.log(`listening on localhost:${port}`);
				resolve();
			});
		});

		// Verify mailer connection.
		if (this.mailer) {
			await this.mailer.verify();
		}

		return this;
	}

	// TODO test this
	async destroy(): Promise<void> {
		// TODO this.app.close?
		await this.db.destroy();
	}
}
