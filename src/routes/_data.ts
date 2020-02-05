import { symbols } from '@app/ui/symbols.js';

type Id = number;
let idCounter = 0;
export const id = (): number => idCounter++;

// TODO chat messages
const messages: ChatMessageData[] = [
	{ type: 'message', id: id(), author: 'rick', content: 'hi!' },
	{
		type: 'message',
		id: id(),
		author: 'alex',
		content: 'what is up fellow chat friends?',
	},
	{ type: 'message', id: id(), author: 'alice', content: 'nm u?' },
];
const anonMessages: ChatMessageData[] = [
	{
		type: 'message',
		id: id(),
		author: symbols.avatar,
		content: 'hi!',
	},
	{
		type: 'message',
		id: id(),
		author: symbols.avatar,
		content: 'what is up fellow anonymous chat friends?',
	},
	{
		type: 'message',
		id: id(),
		author: symbols.avatar,
		content: 'nm u?',
	},
];

// TODO forum topics
const topics: ForumTopicData[] = [
	{
		type: 'topic',
		id: id(),
		author: 'rick',
		title: 'I have a serious anonymous topic to discuss!',
		content: "Now that we're here for the serious topic, who wants icecream?",
		slug: 'serious-topic',
		children: [
			{
				type: 'reply',
				id: id(),
				parent: 1,
				author: 'alex',
				content: 'Ok!',
				children: [
					{
						type: 'reply',
						id: id(),
						parent: 2,
						author: 'rick',
						content: 'We need topics and topics!',
					},
				],
			},
			{
				type: 'reply',
				id: id(),
				parent: 1,
				author: 'alice',
				content: 'orly?',
			},
		],
	},
	{
		type: 'topic',
		id: id(),
		author: 'alice',
		title: 'When are you?',
		slug: 'when-are-you',
	},
];
const anonTopics: ForumTopicData[] = [
	{
		type: 'topic',
		id: id(),
		author: symbols.avatar,
		title: 'I have a serious topic to discuss!',
		content: "Now that we're here for the serious topic, who wants icecream?",
		slug: 'serious-topic',
		children: [
			{
				type: 'reply',
				id: id(),
				parent: 1,
				author: symbols.avatar,
				content: 'Ok!',
				children: [
					{
						type: 'reply',
						id: id(),
						parent: 2,
						author: symbols.avatar,
						content: 'We need topics and topics!',
					},
				],
			},
			{
				type: 'reply',
				id: id(),
				parent: 1,
				author: symbols.avatar,
				content: 'orly?',
			},
		],
	},
	{
		type: 'topic',
		id: id(),
		author: symbols.avatar,
		title: 'When are you?',
		slug: 'when-are-you',
	},
];

const activities: ActivityData[] = [
	{
		type: 'activity',
		id: id(),
		author: 'rick',
		title: 'activity1',
		content: 'activity1 content',
	},
	{
		type: 'activity',
		id: id(),
		author: 'rick',
		title: 'activity2',
		content: 'activity2 content',
	},
];

const events: EventData[] = [
	{
		type: 'event',
		id: id(),
		author: 'dara',
		title: 'event1 title',
		content: 'event1 content',
	},
	{
		type: 'event',
		id: id(),
		author: 'chris',
		title: 'event2 title',
		content: 'event2 content',
	},
];

const notes: InboxNoteData[] = [
	{
		type: 'note',
		id: id(),
		author: 'rick',
		title: 'note1',
		content: 'content1',
	},
	{
		type: 'note',
		id: id(),
		author: 'rick',
		title: 'note2',
		content: 'content2',
	},
];

const posts: BlogPostData[] = [
	{
		type: 'post',
		id: id(),
		author: 'rick',
		title: 'What is Felt?',
		slug: 'what-is-felt',
		content: `
			<p>Great question! We're so glad you asked.</p>
			<p>ok. good stuff.</p>
		`,
	},
	{
		type: 'post',
		id: id(),
		author: 'rick',
		title: 'Why Felt is a co-op',
		slug: 'why-felt-is-a-co-op',
		content: `
			<p>todo</p>
		`,
	},
];

const randPosts = (): BlogPostData[] => [
	{
		type: 'post',
		id: id(),
		title: 'Blog post title 2',
		slug: '2',
		author: 'rick',
		content: 'Blog post content 2 <small>:O:D</small>',
	},

	{
		type: 'post',
		id: id(),
		title: 'Blog post title 1',
		slug: '1',
		author: 'alex',
		content: 'Blog post content 1 <small>:):)</small>',
	},
];

// TODO should PEOPLE have child ACCOUNTS, and ACCOUNTS have child USERS?
// or does PERSON === ACCOUNT?
const people: PersonData[] = [
	{
		type: 'person',
		slug: 'rick',
		title: 'Rick',
		id: id(),
		avatars: [
			{ type: 'avatar', name: `avatar${id()}`, id: id() },
			{ type: 'avatar', name: `avatar${id()}`, id: id() },
			{ type: 'avatar', name: `avatar${id()}`, id: id() },
		],
		spaces: [
			{
				type: 'blog',
				id: id(),
				title: 'blog',
				slug: 'blog',
				posts: randPosts(),
			},
			{ type: 'chat', id: id(), title: 'chat', slug: 'chat', messages },
			{ type: 'forum', id: id(), title: 'forum', slug: 'forum', topics },
			{
				type: 'activities',
				id: id(),
				title: 'history',
				slug: 'history',
				activities,
			},
		],
	},
	{
		type: 'person',
		slug: 'alex',
		title: 'Alex',
		id: id(),
		avatars: [
			{ type: 'avatar', name: `avatar${id()}`, id: id() },
			{ type: 'avatar', name: `avatar${id()}`, id: id() },
			{ type: 'avatar', name: `avatar${id()}`, id: id() },
		],
		spaces: [
			{
				type: 'blog',
				id: id(),
				title: 'blog',
				slug: 'blog',
				posts: randPosts(),
			},
			{ type: 'chat', id: id(), title: 'chat', slug: 'chat', messages },
			{ type: 'forum', id: id(), title: 'forum', slug: 'forum', topics },
			{
				type: 'activities',
				id: id(),
				title: 'history',
				slug: 'history',
				activities,
			},
		],
	},
	{
		type: 'person',
		slug: 'sue',
		title: 'Sue',
		id: id(),
		avatars: [
			{ type: 'avatar', name: `avatar${id()}`, id: id() },
			{ type: 'avatar', name: `avatar${id()}`, id: id() },
			{ type: 'avatar', name: `avatar${id()}`, id: id() },
		],
		spaces: [
			{
				type: 'blog',
				id: id(),
				title: 'blog',
				slug: 'blog',
				posts: randPosts(),
			},
			{ type: 'chat', id: id(), title: 'chat', slug: 'chat', messages },
			{ type: 'forum', id: id(), title: 'forum', slug: 'forum', topics },
			{
				type: 'activities',
				id: id(),
				title: 'history',
				slug: 'history',
				activities,
			},
		],
	},
	{
		type: 'person',
		slug: 'alice',
		title: 'Alice',
		id: id(),
		avatars: [
			{ type: 'avatar', name: `avatar${id()}`, id: id() },
			{ type: 'avatar', name: `avatar${id()}`, id: id() },
			{ type: 'avatar', name: `avatar${id()}`, id: id() },
		],
		spaces: [
			{
				type: 'blog',
				id: id(),
				title: 'blog',
				slug: 'blog',
				posts: randPosts(),
			},
			{ type: 'chat', id: id(), title: 'chat', slug: 'chat', messages },
			{ type: 'forum', id: id(), title: 'forum', slug: 'forum', topics },
			{
				type: 'activities',
				id: id(),
				title: 'history',
				slug: 'history',
				activities,
			},
		],
	},
	{
		type: 'person',
		slug: 'bob',
		title: 'Bob',
		id: id(),
		avatars: [
			{ type: 'avatar', name: `avatar${id()}`, id: id() },
			{ type: 'avatar', name: `avatar${id()}`, id: id() },
			{ type: 'avatar', name: `avatar${id()}`, id: id() },
		],
		spaces: [
			{
				type: 'blog',
				id: id(),
				title: 'blog',
				slug: 'blog',
				posts: randPosts(),
			},
			{ type: 'chat', id: id(), title: 'chat', slug: 'chat', messages },
			{ type: 'forum', id: id(), title: 'forum', slug: 'forum', topics },
			{
				type: 'activities',
				id: id(),
				title: 'history',
				slug: 'history',
				activities,
			},
		],
	},
	{
		type: 'person',
		slug: 'chris',
		title: 'Chris',
		id: id(),
		avatars: [
			{ type: 'avatar', name: `avatar${id()}`, id: id() },
			{ type: 'avatar', name: `avatar${id()}`, id: id() },
			{ type: 'avatar', name: `avatar${id()}`, id: id() },
		],
		spaces: [
			{
				type: 'blog',
				id: id(),
				title: 'blog',
				slug: 'blog',
				posts: randPosts(),
			},
			{ type: 'chat', id: id(), title: 'chat', slug: 'chat', messages },
			{ type: 'forum', id: id(), title: 'forum', slug: 'forum', topics },
			{
				type: 'activities',
				id: id(),
				title: 'history',
				slug: 'history',
				activities,
			},
		],
	},
	{
		type: 'person',
		slug: 'dara',
		title: 'Dara', // who controls this? allow client renaming?
		id: id(),
		avatars: [
			{ type: 'avatar', name: `avatar${id()}`, id: id() },
			{ type: 'avatar', name: `avatar${id()}`, id: id() },
			{ type: 'avatar', name: `avatar${id()}`, id: id() },
		],
		spaces: [
			{
				type: 'blog',
				id: id(),
				title: 'blog',
				slug: 'blog',
				posts: randPosts(),
			},
			{ type: 'chat', id: id(), title: 'chat', slug: 'chat', messages },
			{ type: 'forum', id: id(), title: 'forum', slug: 'forum', topics },
			{
				type: 'activities',
				id: id(),
				title: 'history',
				slug: 'history',
				activities,
			},
		],
	},
];
interface Data {
	people: PersonData[];
	posts: BlogPostData[];
	session: SessionData;
	worlds: WorldData[]; // TODO or names/refs to objects?
}

type Slug = string;

interface Entity {
	id: Id;
}

interface PersonData extends Entity {
	type: 'person';
	slug: string;
	title: string;
	avatars: AvatarData[];
	spaces: SpaceData[];
}

interface AvatarData extends Entity {
	type: 'avatar';
	name: string;
}

interface SessionData extends Entity {
	type: 'session';
	person: PersonData;
	nav: NavData[];
}

interface NavData {
	title: string;
	items: Slug[]; // space slug (TODO make a type?) -- TODO make this `children` and generic?
}

interface WorldData extends Entity {
	type: 'avatar' | 'community' | 'person' | 'page'; // TODO make this a union type like with spaces?
	title: string;
	slug: Slug;
	description?: string;
	spaces: SpaceData[];
}

type SpaceData =
	| ChatSpaceData
	| ForumSpaceData
	| InboxSpaceData
	| NotesSpaceData
	| BlogSpaceData
	| ActivitySpaceData
	| EventSpaceData;

interface BaseSpaceData extends Entity {
	title: string;
	slug: Slug;
	description?: string;
}

interface ChatSpaceData extends BaseSpaceData {
	type: 'chat';
	messages: ChatMessageData[];
}
interface ForumSpaceData extends BaseSpaceData {
	type: 'forum';
	topics: ForumTopicData[];
}
interface InboxSpaceData extends BaseSpaceData {
	type: 'inbox';
	notes: InboxNoteData[];
}
interface NotesSpaceData extends BaseSpaceData {
	type: 'notes';
	notes: InboxNoteData[];
}
interface BlogSpaceData extends BaseSpaceData {
	type: 'blog';
	posts: BlogPostData[];
}
interface ActivitySpaceData extends BaseSpaceData {
	type: 'activities';
	activities: ActivityData[];
}
interface EventSpaceData extends BaseSpaceData {
	type: 'events';
	events: EventData[];
}

interface ChatMessageData extends Entity {
	type: 'message';
	author: string;
	// slug: string; // TODO do this for permalink?
	content: string;
}
interface ForumTopicData extends Entity {
	type: 'topic';
	author: string;
	title: string;
	slug: string;
	content?: string;
	status?: 'open' | 'done' | 'punt';
	children?: ForumReplyData[];
}
interface ForumReplyData extends Entity {
	type: 'reply';
	author: string;
	content: string;
	// slug: string; // TODO do this for permalink?
	children?: ForumReplyData[];
	parent?: Id;
}
interface InboxNoteData extends Entity {
	type: 'note';
	author: string;
	title?: string;
	// slug: string; // TODO do this for permalink?
	content: string;
}
interface BlogPostData extends Entity {
	type: 'post';
	author: string;
	title: string;
	slug: Slug;
	content: string;
}
interface ActivityData extends Entity {
	type: 'activity';
	author: string;
	title?: string;
	// slug: string; // TODO do this for permalink?
	content: string;
}
interface EventData extends Entity {
	type: 'event';
	author: string;
	title: string;
	// slug: string; // TODO do this for permalink?
	content: string;
}

const data: Data = {
	people,
	posts,
	session: {
		type: 'session',
		id: id(),
		person: people[0],
		nav: [
			{
				title: 'avatars',
				items: ['rick', 'rrr', 'r'],
			},
			{
				title: 'communities',
				items: ['felt', 'feltcoop', 'village', 'help'],
			},
			{
				title: 'friends',
				items: ['alex', 'sue', 'alice', 'bob', 'chris'],
			},
			{
				title: 'felt.social',
				items: ['about', 'blog'],
			},
		],
	},

	worlds: [
		// avatars
		{
			type: 'avatar',
			id: id(),
			title: 'rick',
			slug: 'rick',
			spaces: [
				{ type: 'inbox', id: id(), title: 'inbox', slug: 'inbox', notes },
				{ type: 'notes', id: id(), title: 'notes', slug: 'notes', notes },
				{
					type: 'activities',
					id: id(),
					title: 'history',
					slug: 'history',
					activities,
				},
			],
		},
		{
			type: 'avatar',
			id: id(),
			title: 'roll',
			slug: 'roll',
			spaces: [
				{ type: 'inbox', id: id(), title: 'inbox', slug: 'inbox', notes },
				{ type: 'notes', id: id(), title: 'notes', slug: 'notes', notes },
				{
					type: 'activities',
					id: id(),
					title: 'history',
					slug: 'history',
					activities,
				},
			],
		},
		{
			type: 'avatar',
			id: id(),
			title: 'rrr',
			slug: 'rrr',
			spaces: [
				{ type: 'inbox', id: id(), title: 'inbox', slug: 'inbox', notes },
				{ type: 'notes', id: id(), title: 'notes', slug: 'notes', notes },
				{
					type: 'activities',
					id: id(),
					title: 'history',
					slug: 'history',
					activities,
				},
			],
		},
		{
			type: 'avatar',
			id: id(),
			title: 'ape_of_clubs',
			slug: 'ape_of_clubs',
			spaces: [
				{ type: 'inbox', id: id(), title: 'inbox', slug: 'inbox', notes },
				{ type: 'notes', id: id(), title: 'notes', slug: 'notes', notes },
				{
					type: 'activities',
					id: id(),
					title: 'history',
					slug: 'history',
					activities,
				},
			],
		},

		// communities
		{
			type: 'community',
			id: id(),
			title: 'felt',
			slug: 'felt',
			description: '<small>the felt community</small>',
			spaces: [
				{ type: 'chat', id: id(), title: 'hi', slug: 'hi', messages },
				{ type: 'forum', id: id(), title: 'help', slug: 'help', topics },
				// TODO events page for local meetups (structured in a hierarchy?
				// local/denver? local/denver/events and local/denver/{forum,chat}
				{
					type: 'chat',
					id: id(),
					title: 'dev',
					slug: 'dev',
					messages: [
						// TODO make these tile together with flexbox and flex-wrap (custom option for chat rooms)
						{
							type: 'message',
							id: id(),
							author: 'alice',
							content:
								'<img style="width: 192px; height: 178px;" src="/logo-heart.png"/>',
						},
						{
							type: 'message',
							id: id(),
							author: 'bob',
							content: '<img src="/logo-192-textured.png"/>',
						},
						...messages,
					],
				},
				{
					type: 'forum',
					id: id(),
					title: 'news',
					slug: 'news',
					description: '<small>take it real easy <3</small>',
					topics,
				},
				{ type: 'forum', id: id(), title: 'fun', slug: 'fun', topics },
				{
					type: 'chat',
					id: id(),
					title: 'memes',
					slug: 'memes',
					messages: [
						{
							type: 'message',
							id: id(),
							author: 'alice',
							content:
								'<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener"><img src="rick.jpg" alt="rick roll" /></a>',
						},
						{
							type: 'message',
							id: id(),
							author: 'rick',
							content: `don't <span class="text-3xl font-hairline">u</span> meme on me!!1 <span class="text-transparent">pls :P</span>`,
						},
					],
				},
				{ type: 'forum', id: id(), title: 'code', slug: 'code', topics }, // TODO make this a separate community? felt.social/dev or devs?
				{ type: 'chat', id: id(), title: 'etc', slug: 'etc', messages },
				{ type: 'forum', id: id(), title: 'meta', slug: 'meta', topics },
				{
					type: 'blog',
					id: id(),
					title: 'blog',
					slug: 'blog',
					posts: randPosts(),
				},
			],
		},
		{
			type: 'community',
			id: id(),
			title: 'felt.social',
			slug: 'felt.social',
			description: '<small>our community-as-a-service business</small>',
			spaces: [
				{ type: 'chat', id: id(), title: 'talk', slug: 'talk', messages },
				{ type: 'events', id: id(), title: 'events', slug: 'events', events },
				{ type: 'forum', id: id(), title: 'design', slug: 'design', topics },
				{
					type: 'forum',
					title: 'steam',
					id: id(),
					slug: 'steam',
					description:
						'<small>science, technology, engineering, art, & mathematics</small>',
					topics,
				},
				{
					type: 'blog',
					id: id(),
					title: 'blog',
					slug: 'blog',
					posts: randPosts(),
				},
				{ type: 'forum', id: id(), title: 'tech', slug: 'tech', topics },
				{
					type: 'forum',
					id: id(),
					title: 'discussions',
					slug: 'discussions',
					topics: [
						{
							type: 'topic',
							id: id(),
							author: 'alex',
							title: 'hiring',
							slug: 'hiring',
							content: 'Hiring',
						},
						{
							type: 'topic',
							id: id(),
							author: 'rick',
							title: 'funding',
							slug: 'funding',
							content: 'Funding',
						},
						{
							type: 'topic',
							id: id(),
							author: 'alex',
							title: 'we need topics and replies!',
							slug: 'we-need-topics-and-replies',
							content: '!!',
						},
					],
				},
				{
					type: 'forum',
					id: id(),
					title: 'decisions',
					slug: 'decisions',
					topics: [
						{
							// TODO are these something besides a topic?
							// we're adding the "status" here
							// compared to to the discussion forum's topics
							type: 'topic',
							id: id(),
							author: 'alex',
							title: 'What should milestone 1 include?',
							slug: 'what-should-milestone-1-include',
							content: '??',
							status: 'open',
						},
						{
							type: 'topic',
							id: id(),
							author: 'rick',
							title: 'Which software license should we use?',
							slug: 'which-software-license-should-we-use',
							content: '??',
							status: 'done',
						},
						{
							type: 'topic',
							id: id(),
							author: 'rick',
							title: 'What should the name of the top-level community be?',
							slug: 'what-should-the-name-of-the-top-level-community-be',
							content: '??',
							status: 'open',
						},
						{
							type: 'topic',
							id: id(),
							author: 'alex',
							title: 'punt this!?',
							slug: 'punt-this',
							content: '!?',
							status: 'punt',
						},
					],
				},
				{
					type: 'events',
					id: id(),
					title: 'qna',
					slug: 'qna',
					events: [
						{
							type: 'event',
							id: id(),
							author: 'rick',
							title: 'qna with rick!',
							content: 'not :P',
						},
						{
							type: 'event',
							id: id(),
							author: 'chris',
							title: 'qna with bots',
							content: 'all across the internet :O',
						},
					],
				},
				{ type: 'chat', id: id(), title: 'heh', slug: 'heh', messages: [] },
				{ type: 'forum', id: id(), title: 'hah', slug: 'hah', topics: [] },
			],
		},
		{
			type: 'community',
			id: id(),
			title: 'felt.dev',
			slug: 'felt.dev',
			description: '<small>the felt dev community</small>',
			spaces: [
				{ type: 'chat', id: id(), title: 'stream', slug: 'stream', messages },
				{
					type: 'chat',
					id: id(),
					title: 'support',
					slug: 'support',
					messages: [
						{
							type: 'message',
							id: id(),
							author: 'rick',
							content: 'i need help!',
						},
						{
							type: 'message',
							id: id(),
							author: 'dara',
							content: 'you came to the right place ~~',
						},
					],
				},
				{ type: 'events', id: id(), title: 'events', slug: 'events', events },
				{
					type: 'forum',
					id: id(),
					title: 'questions',
					slug: 'questions',
					topics,
				},
				{ type: 'forum', id: id(), title: 'design', slug: 'design', topics },
				{
					type: 'forum',
					id: id(),
					title: 'requests',
					slug: 'requests',
					topics,
				},
				{
					type: 'blog',
					id: id(),
					title: 'blog',
					slug: 'blog',
					posts: randPosts(),
				},
				{ type: 'forum', id: id(), title: 'test', slug: 'test', topics },
				{
					type: 'forum',
					id: id(),
					title: 'discussions',
					slug: 'discussions',
					topics: [
						{
							type: 'topic',
							id: id(),
							author: 'alex',
							title: 'hiring',
							slug: 'hiring',
							content: 'Hiring',
						},
						{
							type: 'topic',
							id: id(),
							author: 'rick',
							title: 'funding',
							slug: 'funding',
							content: 'Funding',
						},
						{
							type: 'topic',
							id: id(),
							author: 'alex',
							title: 'we need topics and replies!',
							slug: 'we-need-topics-and-replies',
							content: '!!',
						},
					],
				},
				{
					type: 'forum',
					id: id(),
					title: 'decisions',
					slug: 'decisions',
					topics: [
						{
							// TODO are these something besides a topic?
							// we're adding the "status" here
							// compared to to the discussion forum's topics
							type: 'topic',
							id: id(),
							author: 'alex',
							title: 'What should milestone 1 include?',
							slug: 'what-should-milestone-1-include',
							content: '??',
							status: 'open',
						},
						{
							type: 'topic',
							id: id(),
							author: 'rick',
							title: 'Which software license should we use?',
							slug: 'which-software-license-should-we-use',
							content: '??',
							status: 'done',
						},
						{
							type: 'topic',
							id: id(),
							author: 'rick',
							title: 'What should the name of the top-level community be?',
							slug: 'what-should-the-name-of-the-top-level-community-be',
							content: '??',
							status: 'open',
						},
						{
							type: 'topic',
							id: id(),
							author: 'alex',
							title: 'punt this!?',
							slug: 'punt-this',
							content: '!?',
							status: 'punt',
						},
					],
				},
				{ type: 'forum', id: id(), title: 'threads', slug: 'threads', topics },
				{
					type: 'chat',
					id: id(),
					title: 'huh',
					slug: 'huh',
					messages: [
						{ type: 'message', id: id(), author: 'rick', content: 'hii' },
						{ type: 'message', id: id(), author: 'alice', content: 'omggg' },
						{ type: 'message', id: id(), author: 'bob', content: 'why?' },
						{
							type: 'message',
							id: id(),
							author: 'chris',
							content: 'happy communities shitpost together',
						},
					],
				},
			],
		},
		{
			type: 'community',
			id: id(),
			title: 'feltcoop',
			slug: 'feltcoop',
			spaces: [
				{ type: 'forum', id: id(), title: 'support', slug: 'support', topics },
				{ type: 'chat', id: id(), title: 'talk', slug: 'talk', messages },
				{
					type: 'events',
					id: id(),
					title: 'meetings',
					slug: 'meetings',
					events,
				},
				{ type: 'forum', id: id(), title: 'design', slug: 'design', topics },
				{
					type: 'blog',
					id: id(),
					title: 'blog',
					slug: 'blog',
					posts: randPosts(),
				},
				{ type: 'forum', id: id(), title: 'tech', slug: 'tech', topics },
				{
					type: 'forum',
					id: id(),
					title: 'discussions',
					slug: 'discussions',
					topics: [
						{
							type: 'topic',
							id: id(),
							author: 'alex',
							title: 'hiring',
							slug: 'hiring',
							content: 'Hiring',
						},
						{
							type: 'topic',
							id: id(),
							author: 'rick',
							title: 'funding',
							slug: 'funding',
							content: 'Funding',
						},
						{
							type: 'topic',
							id: id(),
							author: 'alex',
							title: 'we need topics and replies!',
							slug: 'we-need-topics-and-replies',
							content: '!!',
						},
					],
				},
				{
					type: 'forum',
					id: id(),
					title: 'decisions',
					slug: 'decisions',
					topics: [
						{
							// TODO are these something besides a topic?
							// we're adding the "status" here
							// compared to to the discussion forum's topics
							type: 'topic',
							id: id(),
							author: 'alex',
							title: 'What should milestone 1 include?',
							slug: 'what-should-milestone-1-include',
							content: '??',
							status: 'open',
						},
						{
							type: 'topic',
							id: id(),
							author: 'rick',
							title: 'Which software license should we use?',
							slug: 'which-software-license-should-we-use',
							content: '??',
							status: 'done',
						},
						{
							type: 'topic',
							id: id(),
							author: 'rick',
							title: 'What should the name of the top-level community be?',
							slug: 'what-should-the-name-of-the-top-level-community-be',
							content: '??',
							status: 'open',
						},
						{
							type: 'topic',
							id: id(),
							author: 'alex',
							title: 'punt this!?',
							slug: 'punt-this',
							content: '!?',
							status: 'punt',
						},
					],
				},
			],
		},
		{
			type: 'community',
			id: id(),
			title: 'village',
			slug: 'village',
			description: '<small>sup</small>',
			spaces: [
				{ type: 'chat', id: id(), title: 'tavern', slug: 'tavern', messages },
				{
					type: 'forum',
					id: id(),
					title: 'library',
					slug: 'library',
					topics,
				}, // emoji only
				{
					type: 'chat',
					id: id(),
					title: 'underground',
					slug: 'underground',
					messages: anonMessages,
				}, // polls only and no topics - "psst ;)" - anonymous? oh dear lol
				{
					type: 'forum',
					id: id(),
					title: 'caves',
					slug: 'caves',
					topics: anonTopics,
					description:
						// TODO maybe click this for more flavor, class="flavor-text"
						'<small>dark, wet, rock, depth, beetles, bioluminescence, mushrooms, moss, vines, tangled, critters</small>',
				}, // :dolphin:
				{ type: 'events', id: id(), title: 'raids', slug: 'raids', events },
				{
					type: 'chat',
					id: id(),
					title: 'forest',
					slug: 'forest',
					messages,
					description:
						// TODO maybe click this for more flavor, class="flavor-text"
						'<small>mystery, green, ferns, leaves, spiders, mushrooms, moss, birds, squirrels, risk</small>',
				}, // :beetle:
				{
					type: 'forum',
					id: id(),
					title: 'bazaar',
					slug: 'bazaar',
					topics: [
						{
							type: 'topic',
							id: id(),
							author: 'alice',
							title: 'commerce in the bazaar is prohibit',
							slug: 'commerce-in-the-bazaar-is-prohibit',
						},
					],
					description: '<small>$ $ $ $ $ $ $ $ $</small>',
				}, // :moneybag:
				//type: 'chat', id: id(),  { title: 'crypt', slug: 'crypt', messages }, // images only
				// type: 'forum', id: id(), { title: 'dump', slug: 'dump', topics }, // lower-quality random junk, maybe limited to 1 message a week?
				// temple - chat for encouragement, platitudes, and other cheerful/motivational stuff
				// park - forum for comedy/recreation
				// forest - anon forum
			],
		},
		{
			type: 'community',
			id: id(),
			title: 'help',
			slug: 'help',
			description:
				"<p><small>need support? got some questions? we're here to help!</small></p><p>TODO show summary preview thumbnails of both the chat and forum, and other actionable insights into this world</p>",
			spaces: [
				{ type: 'chat', id: id(), title: 'chat', slug: 'chat', messages },
				{ type: 'forum', id: id(), title: 'forum', slug: 'forum', topics },
			],
		},

		// people
		...people,

		// pages
		{
			type: 'page',
			id: id(),
			title: 'about',
			slug: 'about',
			spaces: [
				{ type: 'chat', id: id(), title: 'chat', slug: 'chat', messages },
				{ type: 'forum', id: id(), title: 'forum', slug: 'forum', topics },
			],
		},
		{
			type: 'page',
			id: id(),
			title: 'blog',
			slug: 'blog',
			spaces: [
				{ type: 'chat', id: id(), title: 'chat', slug: 'chat', messages },
				{ type: 'forum', id: id(), title: 'forum', slug: 'forum', topics },
			],
		},
	],
};

export default data;
