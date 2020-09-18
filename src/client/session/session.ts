import {AccountModel} from '../../accounts/AccountModel.js';
import {PersonaModel} from '../../personas/PersonaModel.js';
import {CommunityModel} from '../../communities/CommunityModel.js';

export type ClientSession = AccountSession | GuestSession;

export interface AccountSession {
	account: AccountModel;
	personas: PersonaModel[];
	communities: CommunityModel[];
	isGuest?: false;
}

export interface GuestSession {
	isGuest: true;
}
