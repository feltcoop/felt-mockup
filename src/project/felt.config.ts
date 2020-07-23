import {FeltConfig, CreateFeltConfig} from './config.js';

/*

This file provides a default Felt config.
It should work for developing both Felt and Felt-dependent projects
without any deployment-specific information.
To extend it, make a copy at `src/felt.config.ts` and edit the values as necessary.

*/

const appName = 'EXAMPLE APP';
const domain = 'EXAMPLE.com';
const helpEmailAddress = 'help@EXAMPLE.com';

// For convenience in development,
// you can safely toggle this flag to enable or disable email authentication.
// The flag is ignored in production.
const enableEmailInDevelopment = false;

export const createConfig: CreateFeltConfig = async ({env}) => {
	const {NODE_ENV, PORT} = env;
	const __DEV__ = NODE_ENV === 'development';
	const port = PORT || '3000';

	const config: FeltConfig = {
		server: {
			port,
			origin: __DEV__ ? `http://localhost:${port}` : `https://${domain}`,
		},
		email: {
			isEnabled: __DEV__ ? enableEmailInDevelopment : true,
			smtpTransportOptions: {
				// This is the argument passed to `nodemailer.createTransport`. It can take many forms.
				// See the nodemailer SMTP transport options docs at https://nodemailer.com/smtp/
				host: 'smtp.EXAMPLE-PROVIDER.com',
				port: 465,
				secure: true,
				auth: {
					user: 'EXAMPLE_USERNAME',
					pass: 'EXAMPLE_PASSWORD',
				},
			},
			getLoginEmail: (accountEmail, loginUrl) => {
				return {
					from: 'from@EXAMPLE.com',
					to: accountEmail,
					subject: `${appName} login`,
					html: getHtmlLoginEmail(loginUrl),
					text: getPlainTextLoginEmail(loginUrl),
				};
			},
		},
	};

	return config;
};

const getHtmlLoginEmail = (loginUrl: string): string => {
	return `<a href="${loginUrl}">Click here to log into ${appName}.</a>
	
<p>${getFooterText()}</p>
<p><a href="${loginUrl}">💚</a></p>`;
};

const getPlainTextLoginEmail = (loginUrl: string): string => {
	return `Here's your link to into ${appName}: ${loginUrl}

${getFooterText()}

💚`;
};

const getFooterText = (): string => `
If you did not request this email, you can safely ignore it.
To report abuse, please contact ${helpEmailAddress}.
`;
