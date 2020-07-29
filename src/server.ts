import {Server} from './server/Server.js';
import {loadConfig} from './project/config.js';

// Once top-level await arrives in Node without a CLI flag,
// we can remove this boilerplate and directly export the `server` instance.
const createServer = async () => {
	const config = await loadConfig();
	const server = new Server(config).init();
	return server;
};

createServer();
