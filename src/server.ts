import dotenv from 'dotenv';
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import fs from 'fs-extra';
import fp from 'path';
import bodyParser from 'body-parser';
import pgPromise from 'pg-promise';

import { isEmail, normalizeEmail } from './app/email/utils.js';

dotenv.config();
const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

// TODO put these in a centralized paths module
const DATA_DIR = fp.resolve(dev ? '__sapper__/data' : '../data');
fs.ensureDirSync(DATA_DIR);
const EMAILS_FILE_PATH = fp.join(DATA_DIR, 'emails.txt');

// TODO this is temporary code that verifies the db is working
const testDb = () => {
	const pgp = pgPromise();
	const db = pgp({
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT),
		database: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
	});
	return db
		.one('INSERT INTO accounts(email) VALUES($1) RETURNING id', [
			'foo@email.com',
		])
		.then(data => {
			console.log('db inserted', data);
		})
		.then(() => {
			return db.any('SELECT * FROM accounts WHERE email = $1', [
				'foo@email.com',
			]);
		})
		.then(data => {
			console.log('db selected', data);
		});
};
testDb().catch(error => {
	console.log('db error', error);
});

polka()
	.use(compression({ threshold: 0 }), sirv('static', { dev }))
	.use(bodyParser.json())
	.post('/mailing-list', (req: any, res: any, next: Function) => {
		console.log('POST /mailing-list', req.body);
		const { email } = req.body;
		if (!isEmail(email)) {
			console.log('invalid email');
			const err: any = new Error('Invalid email address');
			err.code = 400;
			next(err);
			return;
		}
		addEmail(normalizeEmail(email));
		res.end('success!');
	})
	.use(sapper.middleware())
	.listen(PORT, (err: any) => {
		if (err) console.log('error', err);
	});

const addEmail = (email: string): void => {
	console.log('add email', email);
	initEmailsFile();
	const line = JSON.stringify({ email, time: Date.now() });
	const oldFileText = fs.readFileSync(EMAILS_FILE_PATH, 'utf8');
	const newFileText = oldFileText + '\n' + line;
	fs.writeFileSync(EMAILS_FILE_PATH, newFileText, 'utf8');
};

const initEmailsFile = (): void => {
	if (fs.existsSync(EMAILS_FILE_PATH)) return;
	fs.writeFileSync(EMAILS_FILE_PATH, '');
};
