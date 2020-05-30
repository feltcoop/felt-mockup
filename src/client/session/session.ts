import {AccountModel} from '../../accounts/AccountModel.js';

export type ClientSession = AccountSession | GuestSession;

export interface AccountSession {
	account: AccountModel;
	isGuest?: false;
}

export interface GuestSession {
	isGuest: true;
}
