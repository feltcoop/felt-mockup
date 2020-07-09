import {AccountModel} from '../accounts/AccountModel.js';
import {Email} from '../client/email/email.js';

/*

These are temporary types while we're waiting on Polka's types.
(and we might not stay with Polka)

It merges some type declarations with app-specific values
as an alternative to using generics.
I'm not sure how to DRY up the code but it's temporary.

The session non-nullable because
it's not a condition middleware should normally have to handle.

*/

declare module 'polka' {
	export interface Request {
		account?: AccountModel;
		session: CookieSessionInterfaces.CookieSessionObject & {email?: Email};
	}
}

declare module 'express-serve-static-core' {
	export interface Request {
		account?: AccountModel;
		session: CookieSessionInterfaces.CookieSessionObject & {email?: Email};
	}
}
