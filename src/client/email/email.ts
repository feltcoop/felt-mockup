export type Email = Flavored<string, 'Email'>;

export const EMAIL_MATCHER = /^.+\@.+\..+$/;

const EMAIL_MAX_LENGTH = 280;

export const isEmail = (text: string): text is Email => {
	if (!text || !text.length || text.length > EMAIL_MAX_LENGTH) return false;
	if (!text.match(EMAIL_MATCHER)) return false;
	return true;
};

// The technically correct thing to do here is to preserve email case but ignoring for now.
// https://stackoverflow.com/questions/9807909/are-email-addresses-case-sensitive
export const normalizeEmail = (email: Email): Email => email.trim().toLowerCase();
