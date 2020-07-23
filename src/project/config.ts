import SMTPTransport from 'nodemailer/lib/smtp-transport.js';
import {SendMailOptions} from 'nodemailer';
import {join} from 'path';
import {toSourceId} from '@feltcoop/gro/dist/paths.js';
import {existsSync} from 'fs';

import {getEnv} from './env.js';
import {paths} from '../paths.js';

/*

The Felt config lets dependent projects define a config file
at  `felt.config.ts` file in either `src/` or `src/project`.

When developing Felt, this resolves to `./felt.config.ts`,
which is `${FELT_DIR}/src/project/felt.config.ts`.

*/

const {NODE_ENV} = getEnv();
const __DEV__ = NODE_ENV === 'development'; // TODO replace in build step

// See `./felt.config.ts` for documentation.
export interface FeltConfig {
	server: {
		port: string;
		origin: string;
	};
	email: {
		isEnabled: boolean;
		smtpTransportOptions: SMTPTransport.Options;
		getLoginEmail: (accountEmail: string, loginUrl: string) => SendMailOptions;
	};
}

export interface CreateFeltConfigModule {
	createConfig: CreateFeltConfig;
}
export interface CreateFeltConfig {
	(options: CreateFeltConfigOptions): Promise<FeltConfig>;
}
export interface CreateFeltConfigOptions {
	env: NodeJS.ProcessEnv;
}

const CONFIG_FILE_NAME = 'felt.config.js';

let config: FeltConfig | undefined;

export const loadConfig = async (forceRefresh = false): Promise<FeltConfig> => {
	if (config && !forceRefresh) return config;

	const env = getEnv();

	// Check if there's a config located at `${cwd}/src/felt.config.ts`.
	// If it doesn't exist, fall back to Felt's default config
	// located at `felt/src/project/felt.config.ts`.

	// TODO these are broken outside of dev mode right now -
	// we need to fix the server build to include the config file,
	// and we need to do several things, including making the local version work,
	// so Felt can be used as a dependency in other projects
	const localConfigFilePath = join(paths.build, CONFIG_FILE_NAME);
	const defaultConfigFilePath = join(paths.build, 'project', CONFIG_FILE_NAME);
	let configFilePath: string;
	if (existsSync(toSourceId(localConfigFilePath))) {
		if (!existsSync(localConfigFilePath)) {
			throw Error(
				`Found a local Felt config source file but not the built version. ` +
					`Do you need to run 'gro dev'?`,
			);
		}
		configFilePath = localConfigFilePath;
	} else {
		configFilePath = defaultConfigFilePath;
	}

	const createConfigModule = await importConfig(configFilePath);
	const {createConfig} = createConfigModule;

	config = await createConfig({env});

	const result = validateConfig(config);
	if (!result.ok) {
		throw Error(`Invalid Felt config: ${result.reason}`);
	}

	return config;
};

const importConfig = async (configPath: string): Promise<CreateFeltConfigModule> => {
	const mod = await import(configPath);
	if (typeof mod.createConfig !== 'function') {
		throw Error(
			`Invalid Felt config module. ` +
				`Expected a 'createConfig' function export from ${configPath}.`,
		);
	}
	return mod;
};

export const validateConfig = (config: FeltConfig): Result<{}, {reason: string}> => {
	// Validate the `email` object.
	if (!__DEV__ && !config.email.isEnabled) {
		return {ok: false, reason: `Email must be enabled for production.`};
	}
	if (config.email.isEnabled && !config.email.smtpTransportOptions) {
		return {
			ok: false,
			reason:
				`Email is enabled but there is no nodemailer configuration. ` +
				`Please either disable email or add a nodemail config object.`,
		};
	}
	return {ok: true};
};
