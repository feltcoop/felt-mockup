import {test, t} from '@feltcoop/gro';

import {paths} from './paths.js';

test('paths', () => {
	t.ok(paths.db.startsWith(paths.source));
});
