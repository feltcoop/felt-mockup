import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import fs from 'fs';
import fp from 'path';
import bodyParser from 'body-parser';

import {isEmail, normalizeEmail} from './client/email/utils.js';
import {getEnv} from './project/env.js';

const {PORT, NODE_ENV} = getEnv();
const dev = NODE_ENV === 'development';

// TODO put these in a centralized paths module
const DATA_DIR = fp.resolve(dev ? '__sapper__/data' : '../data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
const EMAILS_FILE_PATH = fp.join(DATA_DIR, 'emails.txt');

polka()
	.use(compression({threshold: 0}), sirv('static', {dev}))
	.use(bodyParser.json())
	.post('/mailing-list', (req: any, res: any, next: Function) => {
		console.log('POST /mailing-list', req.body);
		const {email} = req.body;
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
	const line = JSON.stringify({email, time: Date.now()});
	const oldFileText = fs.readFileSync(EMAILS_FILE_PATH, 'utf8');
	const newFileText = oldFileText + '\n' + line;
	fs.writeFileSync(EMAILS_FILE_PATH, newFileText, 'utf8');
};

const initEmailsFile = (): void => {
	if (fs.existsSync(EMAILS_FILE_PATH)) return;
	fs.writeFileSync(EMAILS_FILE_PATH, '');
};
