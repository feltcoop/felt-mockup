export const EMAIL_MATCHER = /^.+\@.+\..+$/;

const EMAIL_MAX_LENGTH = 280;

export const isEmail = (text: string): boolean => {
	if (!text || !text.length || text.length > EMAIL_MAX_LENGTH) return false;
	if (!text.match(EMAIL_MATCHER)) return false;
	return true;
};

export const normalizeEmail = (email: string): string => email.trim();
