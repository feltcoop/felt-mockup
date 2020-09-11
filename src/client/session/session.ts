import {AccountModel} from '../../accounts/AccountModel.js';
import {PersonaModel} from '../../personas/PersonaModel.js';

export type ClientSession = AccountSession | GuestSession;

export interface AccountSession {
	account: AccountModel;
	personas: PersonaModel[];
	isGuest?: false;
}

export interface GuestSession {
	isGuest: true;
}
