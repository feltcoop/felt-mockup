import dotenv from 'dotenv';
dotenv.config();
const {
	NODE_ENV,
	DEPLOY_SERVER_USER,
	DEPLOY_SERVER_IP,
	DEPLOY_SERVER_SSH_PORT,
	DEPLOY_SERVER_DIR,
	DEPLOY_DRY_RUN,
	DEPLOY_NODE_PROCESS_NAME,
	SERVER_DEPLOY,
} = process.env;
if (NODE_ENV !== 'production') {
	throw Error(`Expected NODE_ENV to be 'production', not '${NODE_ENV}'`);
}
if (!DEPLOY_SERVER_USER && !SERVER_DEPLOY) {
	throw Error('DEPLOY_SERVER_USER env var is required for deployment');
}
if (!DEPLOY_SERVER_IP && !SERVER_DEPLOY) {
	throw Error('DEPLOY_SERVER_IP env var is required for deployment');
}
if (!DEPLOY_SERVER_DIR) {
	throw Error('DEPLOY_SERVER_DIR env var is required for deployment');
}
if (!DEPLOY_NODE_PROCESS_NAME) {
	throw Error('DEPLOY_NODE_PROCESS_NAME env var is required for deployment');
}

import * as fileSystem from 'fs';
import * as filePath from 'path';
import {exec} from 'child_process';
import kleur from 'kleur';

const {magenta, cyan, yellow, green} = kleur;

import {paths} from '../../paths.js';

// ensure the build is ready
if (!fileSystem.existsSync(paths.sapperBuild)) {
	throw Error(
		`Build directory does not exist: ${paths.sapperBuild} -- run 'gro build' and try again`,
	);
}

// TODO add logging module
const info = console.log.bind(console);

/*

Deploys the build artifacts to a live server.

Note that this task does not build any project files.
Building and deploying are intentionally decoupled so that anything can be
directly deployed without special handling.

*/
const deploy = async (): Promise<void> => {
	var command: string;
	if (SERVER_DEPLOY) {
		command = createLocalDeploymentCommand();
	} else {
		command = createDeploymentCommand();
	}
	info(magenta(`deployment command`), cyan(command));

	if (DEPLOY_DRY_RUN) {
		console.log(magenta('dry run - skipping deployment command execution'));
		return;
	}

	info(magenta('executing deployment command'));
	const {stdout, stderr} = await new Promise((resolve, reject) => {
		exec(command, (err, stdout, stderr) => {
			if (err) {
				reject(err);
			} else {
				resolve({stdout, stderr});
			}
		});
	});
	if (stdout) console.log(stdout);
	if (stderr) console.error(stderr);
	info(magenta('executed deployment command'));
};

/*

Returns a Bash/Dash script string that performs the deployment.

1. zip up the locally built dist directory
2. copy the zipped dist to the remote server
3. ssh into the remote server
4. unzip and prepare the dist in a temporary directory
5. stop the current Node process
6. remove the previously deployed final directory
7. move the dist from the temporary directory to the final directory
8. restart the Node process

*/
const createDeploymentCommand = (): string => {
	const deployPaths = createDeploymentPaths();
	info(magenta('deployment paths'), deployPaths);

	// Configure shell behavior.
	// -e - exit the script if any command returns a nonzero exit code
	// -u - throw an error if nonexistent variables are accessed
	// from https://stackoverflow.com/questions/821396/aborting-a-shell-script-if-any-command-returns-a-non-zero-value
	const setupShell = `set -eu`;

	const tarballContents = [
		'package.json',
		'package-lock.json',
		filePath.relative(paths.root, paths.sapperBuild),
		filePath.relative(paths.root, paths.static),
	];
	const createTarball = `tar -czf ${deployPaths.localTarball} -C ${
		paths.root
	} ${tarballContents.join(' ')}`;

	const serverHost = `${DEPLOY_SERVER_USER}@${DEPLOY_SERVER_IP}`;

	const scpTarball = `scp ${
		DEPLOY_SERVER_SSH_PORT ? `-P ${DEPLOY_SERVER_SSH_PORT}` : ''
	} -p ${deployPaths.localTarball} ${serverHost}:${deployPaths.remoteRootDir}`;

	const ssh = `ssh -t ${serverHost}${
		DEPLOY_SERVER_SSH_PORT ? ` -p ${DEPLOY_SERVER_SSH_PORT}` : ''
	}`;

	const setupServer = [
		setupShell,

		// Change to the app's root directory to fail early if it doesn't exist.
		`cd ${deployPaths.remoteRootDir}`,

		// The non-interactive `ssh` does not load `.bashrc` and
		// we need both `npm` and the Node module `pm2` to deploy,
		// so we load fnm manually so the script can acccess them.
		// https://github.com/Schniz/fnm
		// TODO could put this setup in `.profile` and source it with '. ~/.profile'
		// but we'd need to automate adding these same lines to `.profile`.
		'export PATH=~/.fnm:$PATH',
		'eval "`fnm env --multi`"',

		`rm -rf ${deployPaths.remoteTempDir}`,
		`mkdir -p ${deployPaths.remoteTempDir}`,
		`cd ${deployPaths.remoteTempDir}`,
		`tar -xzf ${deployPaths.remoteTarball}`,
		'npm install --production',

		`pm2 stop ${DEPLOY_NODE_PROCESS_NAME}`,
		`rm -rf ${deployPaths.remoteDistDir}`,
		`mv ${deployPaths.remoteTempDir} ${deployPaths.remoteDistDir}`,
		`pm2 restart ${DEPLOY_NODE_PROCESS_NAME}`,
	].join('\n');

	const deploymentCommand = [
		setupShell,
		createTarball,
		scpTarball,
		`${ssh} '${setupServer}'`,
	].join('\n');

	return deploymentCommand;
};

const createLocalDeploymentCommand = (): string => {
	const deployPaths = createDeploymentPaths();
	info(magenta('deployment paths'), deployPaths);

	// Configure shell behavior.
	// -e - exit the script if any command returns a nonzero exit code
	// -u - throw an error if nonexistent variables are accessed
	// from https://stackoverflow.com/questions/821396/aborting-a-shell-script-if-any-command-returns-a-non-zero-value
	const setupShell = `set -eu`;

	const deploymentCommand = [
		setupShell,

		// Change to the app's root directory to fail early if it doesn't exist.
		`cd ${deployPaths.remoteRootDir}`,

		// The non-interactive `ssh` does not load `.bashrc` and
		// we need both `npm` and the Node module `pm2` to deploy,
		// so we load fnm manually so the script can acccess them.
		// https://github.com/Schniz/fnm
		// TODO could put this setup in `.profile` and source it with '. ~/.profile'
		// but we'd need to automate adding these same lines to `.profile`.
		'export PATH=~/.fnm:$PATH',
		'eval "`fnm env --multi`"',

		`rm -rf ${deployPaths.remoteTempDir}`,
		`mkdir -p ${deployPaths.remoteTempDir}`,
		`cd ${deployPaths.remoteTempDir}`,
		`cp ${paths.root}/package.json ${deployPaths.remoteTempDir}`,
		`cp ${paths.root}/package-lock.json ${deployPaths.remoteTempDir}`,
		`cp -r ${paths.build} ${deployPaths.remoteTempDir}`,
		`cp -r ${paths.static} ${deployPaths.remoteTempDir}`,
		'npm install --production',

		`pm2 stop ${DEPLOY_NODE_PROCESS_NAME}`,
		`rm -rf ${deployPaths.remoteDistDir}`,
		`mv ${deployPaths.remoteTempDir} ${deployPaths.remoteDistDir}`,
		`pm2 restart ${DEPLOY_NODE_PROCESS_NAME}`,
	].join('\n');

	return deploymentCommand;
};

interface DeploymentPaths {
	tarFileName: string;
	remoteTarball: string;
	localTarball: string;
	remoteRootDir: string;
	remoteDistDir: string;
	remoteTempDir: string;
}

const createDeploymentPaths = (): DeploymentPaths => {
	const tarFileName = 'dist.tar.gz';
	const remoteRootDir = DEPLOY_SERVER_DIR;
	return {
		tarFileName,
		localTarball: filePath.join(paths.build, tarFileName),
		remoteRootDir,
		remoteTarball: filePath.join(remoteRootDir, tarFileName),
		remoteDistDir: filePath.join(remoteRootDir, 'dist'),
		remoteTempDir: filePath.join(remoteRootDir, 'temp'),
	};
};

// TODO do this at the task level, exporting `deploy` instead of calling it here
deploy()
	.then(() => {
		console.log(
			[
				green('~~~~~~~~~~~~~~~~'),
				green('~❤~ deployed ~❤~'),
				green('~~~~~~~~~~~~~~~~'),
			].join('\n'),
		);
		if (DEPLOY_DRY_RUN) console.log(magenta('dry run complete'));
	})
	.catch((err: Error): void => {
		const message = err.stack
			? yellow(err.stack)
			: yellow(`Error: ${err.message}`);
		console.error(message);
		process.exit(1);
	});
