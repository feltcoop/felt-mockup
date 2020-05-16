import data from '../_data.js';

const { posts } = data;

const contents = JSON.stringify(posts);

export function get(_req: any, res: any) { // TODO types
	res.writeHead(200, {
		'Content-Type': 'application/json',
	});

	res.end(contents);
}
