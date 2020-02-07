import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import fs from 'fs';
import bodyParser from 'body-parser';

import { isEmail, normalizeEmail } from './app/email/utils.js';

const EMAILS_FILE_PATH = './emails.txt';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

console.log('PORT', PORT);
console.log('NODE_ENV', NODE_ENV);

polka()
	.use(compression({ threshold: 0 }), sirv('static', { dev }))
	.use(bodyParser.json())
	.post('/mailing-list', (req, res, next) => {
		console.log('POST /mailing-list', req.body);
		const { email } = req.body;
		if (!isEmail(email)) {
			console.log('invalid email');
			const err = new Error('Invalid email address');
			err.code = 400;
			next(err);
			return;
		}
		addEmail(normalizeEmail(email));
		res.end('success!');
	})
	.use(sapper.middleware())
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

const addEmail = email => {
	console.log('add email', email);
	initEmailsFile();
	const line = JSON.stringify({ email, time: Date.now() });
	const oldFileText = fs.readFileSync(EMAILS_FILE_PATH, 'utf8');
	const newFileText = oldFileText + '\n' + line;
	fs.writeFileSync(EMAILS_FILE_PATH, newFileText, 'utf8');
};

const initEmailsFile = () => {
	if (fs.existsSync(EMAILS_FILE_PATH)) return;
	fs.writeFileSync(EMAILS_FILE_PATH, '');
};
