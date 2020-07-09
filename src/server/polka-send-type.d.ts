declare module '@polka/send-type' {
	import {OutgoingHttpHeaders, ServerResponse} from 'http';
	import {Stream} from 'stream';

	interface SendType {
		(
			res: ServerResponse,
			code?: number,
			data?: string | object | Buffer | Stream,
			headers?: OutgoingHttpHeaders,
		): void;
	}

	const send: SendType;

	export default send;
}
