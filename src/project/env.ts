import dotenv from 'dotenv';

let isConfigured = false;

export const getEnv = (forceRefresh = false): NodeJS.ProcessEnv => {
	if (!isConfigured || forceRefresh) {
		isConfigured = true;
		dotenv.config();
	}
	return process.env;
};
