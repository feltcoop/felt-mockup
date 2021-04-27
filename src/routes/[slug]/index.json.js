import data from '$lib/data';

const {worlds} = data;

const worldsBySlug = new Map();
worlds.forEach((world) => {
	worldsBySlug.set(world.slug, JSON.stringify(world));
});

export function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const {slug} = req.params;

	if (worldsBySlug.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json',
		});

		res.end(worldsBySlug.get(slug));
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
