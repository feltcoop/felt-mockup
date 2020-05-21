import data from '../../_data.js';

const {posts} = data;

const postsBySlug = new Map();
posts.forEach((post) => {
	postsBySlug.set(post.slug, JSON.stringify(post));
});

export function get(req: any, res: any) {
	// TODO types
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const {slug} = req.params;

	if (postsBySlug.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json',
		});

		res.end(postsBySlug.get(slug));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json',
		});

		res.end(
			JSON.stringify({
				message: `Not found`,
			}),
		);
	}
}
