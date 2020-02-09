import { symbols } from '../app/ui/symbols.js';
let idCounter = 0;
export const id = () => idCounter++;
// TODO chat messages
const createMessages = (author1 = 'rick', author2 = 'alice') => [
    { type: 'message', id: id(), author: author1, content: 'hi!' },
    { type: 'message', id: id(), author: author2, content: 'supp' },
    { type: 'message', id: id(), author: author2, content: 'i found a bug' },
];
const createAnonMessages = () => [
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
    {
        type: 'message',
        id: id(),
        author: symbols.avatar,
        content: 'a bug found me',
    },
];
const createChat = (slug = 'chat', author = 'rick', doc, author2 = 'alice') => ({
    type: 'chat',
    id: id(),
    slug,
    title: slug,
    messages: createMessages(author, author2),
    ...doc,
});
const createForum = (slug = 'forum', author = 'rick', doc) => ({
    type: 'forum',
    id: id(),
    slug,
    title: slug,
    topics: createTopics(author),
    ...doc,
});
// TODO forum topics
const createTopics = (author = 'rick') => [
    {
        type: 'topic',
        id: id(),
        author: 'alice',
        title: 'Welcome! Read me first :D',
        slug: 'welcome',
        content: 'jk we got no content!',
    },
    {
        type: 'topic',
        id: id(),
        author,
        title: 'I have a serious topic to discuss!',
        content: "Now that we're here for the serious topic, who wants icecream?",
        slug: 'serious-topic',
        children: [
            {
                type: 'reply',
                id: id(),
                parent: 1,
                author: 'alice',
                content: 'me?',
                children: [
                    {
                        type: 'reply',
                        id: id(),
                        parent: 2,
                        author: 'dana',
                        content: 'you?',
                    },
                    {
                        type: 'reply',
                        id: id(),
                        parent: 2,
                        author: 'alex',
                        content: 'u',
                    },
                ],
            },
            {
                type: 'reply',
                id: id(),
                parent: 1,
                author: 'alice',
                content: 'orly?',
                children: [
                    {
                        type: 'reply',
                        id: id(),
                        parent: 2,
                        author: 'dana',
                        content: 'ya rly',
                    },
                    {
                        type: 'reply',
                        id: id(),
                        parent: 2,
                        author: 'bob',
                        content: ':|',
                    },
                ],
            },
        ],
    },
];
const anonTopics = [
    {
        type: 'topic',
        id: id(),
        author: symbols.avatar,
        title: 'I have a serious anonymous topic to discuss!',
        content: "Now that we're here for the serious topic, who wants icecream?",
        slug: 'serious-topic',
        children: [
            {
                type: 'reply',
                id: id(),
                parent: 1,
                author: symbols.avatar,
                content: 'u sure thats rly anon?',
                children: [
                    {
                        type: 'reply',
                        id: id(),
                        parent: 2,
                        author: symbols.avatar,
                        content: "doesn't look very anonymous to me but IANAL",
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
        children: [
            {
                type: 'reply',
                id: id(),
                parent: 1,
                author: symbols.avatar,
                content: 'now',
                children: [
                    {
                        type: 'reply',
                        id: id(),
                        parent: 2,
                        author: symbols.avatar,
                        content: 'now',
                    },
                ],
            },
        ],
    },
];
const createActivities = (author = 'rick') => [
    {
        type: 'activity',
        id: id(),
        author,
        title: 'activity1',
        content: 'activity1 content',
    },
    {
        type: 'activity',
        id: id(),
        author,
        title: 'activity2',
        content: 'activity2 content',
    },
];
const events = [
    {
        type: 'event',
        id: id(),
        author: 'dana',
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
const createNotes = (author = 'rick') => [
    {
        type: 'note',
        id: id(),
        author,
        title: 'note1',
        content: 'content1',
    },
    {
        type: 'note',
        id: id(),
        author,
        title: 'note2',
        content: 'content2',
    },
];
const createPosts = (author = 'rick') => [
    {
        type: 'post',
        id: id(),
        author,
        title: 'What is Felt?',
        slug: 'what-is-felt',
        content: `
			<p>Great question! We're so glad you asked.</p>
			<p>ok. good stuff.</p>
		`,
        children: [
            {
                type: 'reply',
                id: id(),
                author: 'alice',
                content: 'comments go here',
            },
            { type: 'reply', id: id(), author: 'bob', content: 'me too' },
            {
                type: 'reply',
                id: id(),
                author: 'dana',
                content: ':eyeroll',
                children: [
                    {
                        type: 'reply',
                        id: id(),
                        author: 'bob',
                        content: 'I was being cheeky :d',
                        children: [
                            {
                                type: 'reply',
                                id: id(),
                                author: 'dana',
                                content: ':O',
                            },
                        ],
                    },
                ],
            },
            { type: 'reply', id: id(), author: 'alex', content: ':P' },
        ],
    },
    {
        type: 'post',
        id: id(),
        author,
        title: 'Why Felt is a co-op',
        slug: 'why-felt-is-a-co-op',
        content: `
			<p>todo</p>
		`,
        children: [
            {
                type: 'reply',
                id: id(),
                author,
                content: 'wait what where am i?',
            },
            { type: 'reply', id: id(), author: 'chris', content: 'dont ask' },
        ],
    },
];
const randPosts = (author = 'rick') => [
    {
        type: 'post',
        id: id(),
        title: 'Blog post title 2',
        slug: '2',
        author,
        content: 'Blog post content 2 <small>:O:D</small>',
        children: [{ type: 'reply', id: id(), author: 'dana', content: '!??' }],
    },
    {
        type: 'post',
        id: id(),
        title: 'Blog post title 1',
        slug: '1',
        author: 'alex',
        content: 'Blog post content 1 <small>:):)</small>',
        children: [
            { type: 'reply', id: id(), author: 'dana', content: 'ohhh' },
            {
                type: 'reply',
                id: id(),
                author: 'dana',
                content: 'wait how do i undo?',
            },
        ],
    },
];
// TODO should PEOPLE have child ACCOUNTS, and ACCOUNTS have child USERS?
// or does PERSON === ACCOUNT?
const people = [
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
                type: 'chat',
                id: id(),
                title: 'chat',
                slug: 'chat',
                messages: [
                    {
                        type: 'message',
                        id: id(),
                        author: 'rick',
                        content: 'echo-ey in here',
                    },
                ],
            },
            {
                type: 'blog',
                id: id(),
                title: 'blog',
                slug: 'blog',
                posts: randPosts(),
            },
            createForum('forum', 'rick'),
            {
                type: 'activities',
                id: id(),
                title: 'history',
                slug: 'history',
                activities: createActivities('rick'),
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
            createChat('chat', 'alex', undefined, 'rick'),
            {
                type: 'blog',
                id: id(),
                title: 'blog',
                slug: 'blog',
                posts: randPosts(),
            },
            createForum('forum', 'alex'),
            {
                type: 'activities',
                id: id(),
                title: 'history',
                slug: 'history',
                activities: createActivities('alex'),
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
            createChat('chat', 'sue', undefined, 'rick'),
            {
                type: 'blog',
                id: id(),
                title: 'blog',
                slug: 'blog',
                posts: randPosts(),
            },
            createForum('forum', 'sue'),
            {
                type: 'activities',
                id: id(),
                title: 'history',
                slug: 'history',
                activities: createActivities('sue'),
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
            createChat('chat', 'alice', undefined, 'rick'),
            {
                type: 'blog',
                id: id(),
                title: 'blog',
                slug: 'blog',
                posts: randPosts(),
            },
            createForum('forum', 'alice'),
            {
                type: 'activities',
                id: id(),
                title: 'history',
                slug: 'history',
                activities: createActivities('alice'),
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
            {
                type: 'inbox',
                id: id(),
                title: 'inbox',
                slug: 'inbox',
                notes: createNotes('bob'),
            },
            {
                type: 'blog',
                id: id(),
                title: 'pics',
                slug: 'pics',
                posts: randPosts(),
            },
            {
                type: 'blog',
                id: id(),
                title: 'bookmarks',
                slug: 'bookmarks',
                posts: randPosts(),
            },
            createForum('forum', 'bob'),
            {
                type: 'activities',
                id: id(),
                title: 'history',
                slug: 'history',
                activities: createActivities('bob'),
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
            createChat('chat', 'chris', undefined, 'rick'),
            {
                type: 'blog',
                id: id(),
                title: 'blog',
                slug: 'blog',
                posts: randPosts(),
            },
            createForum('forum', 'chris'),
            {
                type: 'activities',
                id: id(),
                title: 'history',
                slug: 'history',
                activities: createActivities('chris'),
            },
        ],
    },
    {
        type: 'person',
        slug: 'dana',
        title: 'Dana',
        id: id(),
        avatars: [
            { type: 'avatar', name: `avatar${id()}`, id: id() },
            { type: 'avatar', name: `avatar${id()}`, id: id() },
            { type: 'avatar', name: `avatar${id()}`, id: id() },
        ],
        spaces: [
            createChat('chat', 'dana', undefined, 'rick'),
            {
                type: 'blog',
                id: id(),
                title: 'blog',
                slug: 'blog',
                posts: randPosts(),
            },
            createForum('forum', 'dana'),
            {
                type: 'activities',
                id: id(),
                title: 'history',
                slug: 'history',
                activities: createActivities('dana'),
            },
        ],
    },
];
const data = {
    people,
    posts: createPosts(),
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
                {
                    type: 'inbox',
                    id: id(),
                    title: 'inbox',
                    slug: 'inbox',
                    notes: createNotes('rick'),
                },
                {
                    type: 'notes',
                    id: id(),
                    title: 'notes',
                    slug: 'notes',
                    notes: createNotes('rick'),
                },
                {
                    type: 'activities',
                    id: id(),
                    title: 'history',
                    slug: 'history',
                    activities: createActivities('rick'),
                },
            ],
        },
        {
            type: 'avatar',
            id: id(),
            title: 'rick_of_legend',
            slug: 'rick_of_legend',
            spaces: [
                {
                    type: 'inbox',
                    id: id(),
                    title: 'inbox',
                    slug: 'inbox',
                    notes: createNotes('rick_of_legend'),
                },
                {
                    type: 'notes',
                    id: id(),
                    title: 'notes',
                    slug: 'notes',
                    notes: createNotes('rick_of_legend'),
                },
                {
                    type: 'activities',
                    id: id(),
                    title: 'history',
                    slug: 'history',
                    activities: createActivities('rick_of_legend'),
                },
            ],
        },
        {
            type: 'avatar',
            id: id(),
            title: 'roll',
            slug: 'roll',
            spaces: [
                {
                    type: 'inbox',
                    id: id(),
                    title: 'inbox',
                    slug: 'inbox',
                    notes: createNotes('roll'),
                },
                {
                    type: 'notes',
                    id: id(),
                    title: 'notes',
                    slug: 'notes',
                    notes: createNotes('roll'),
                },
                {
                    type: 'activities',
                    id: id(),
                    title: 'history',
                    slug: 'history',
                    activities: createActivities('roll'),
                },
            ],
        },
        {
            type: 'avatar',
            id: id(),
            title: 'rrr',
            slug: 'rrr',
            spaces: [
                {
                    type: 'inbox',
                    id: id(),
                    title: 'inbox',
                    slug: 'inbox',
                    notes: createNotes('rrr'),
                },
                {
                    type: 'notes',
                    id: id(),
                    title: 'notes',
                    slug: 'notes',
                    notes: createNotes('rrr'),
                },
                {
                    type: 'activities',
                    id: id(),
                    title: 'history',
                    slug: 'history',
                    activities: createActivities('rrr'),
                },
            ],
        },
        {
            type: 'avatar',
            id: id(),
            title: 'ape_of_clubs',
            slug: 'ape_of_clubs',
            spaces: [
                {
                    type: 'inbox',
                    id: id(),
                    title: 'inbox',
                    slug: 'inbox',
                    notes: createNotes('ape_of_clubs'),
                },
                {
                    type: 'notes',
                    id: id(),
                    title: 'notes',
                    slug: 'notes',
                    notes: createNotes('ape_of_clubs'),
                },
                {
                    type: 'activities',
                    id: id(),
                    title: 'history',
                    slug: 'history',
                    activities: createActivities('ape_of_clubs'),
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
                createChat('hi'),
                createForum('help'),
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
                            content: '<img style="width: 192px; height: 178px;" src="/logo-heart.png"/>',
                        },
                        {
                            type: 'message',
                            id: id(),
                            author: 'bob',
                            content: '<img src="/logo-192-textured.png"/>',
                        },
                        ...createMessages(),
                    ],
                },
                {
                    type: 'forum',
                    id: id(),
                    title: 'news',
                    slug: 'news',
                    description: '<small>take it real easy <3</small>',
                    topics: [
                        {
                            type: 'topic',
                            id: id(),
                            author: 'rick',
                            title: 'I have a serious topic to discuss!',
                            content: "Now that we're here for the serious topic, who wants icecream?",
                            slug: 'serious-topic',
                            children: [
                                {
                                    type: 'reply',
                                    id: id(),
                                    parent: 1,
                                    author: 'alex',
                                    content: 'wtf <span class="text-4xl leading-none">r</span> <span class="text-5xl leading-none">U</span> <span class="text-xl">SERIOUS?</span>',
                                    children: [
                                        {
                                            type: 'reply',
                                            id: id(),
                                            parent: 2,
                                            author: 'rick',
                                            content: 'yes absolutely',
                                        },
                                    ],
                                },
                                {
                                    type: 'reply',
                                    id: id(),
                                    parent: 1,
                                    author: 'alice',
                                    content: 'orly?',
                                    children: [
                                        {
                                            type: 'reply',
                                            id: id(),
                                            parent: 2,
                                            author: 'dana',
                                            content: 'ya rly',
                                        },
                                        {
                                            type: 'reply',
                                            id: id(),
                                            parent: 2,
                                            author: 'chris',
                                            content: 'ya rly',
                                        },
                                        {
                                            type: 'reply',
                                            id: id(),
                                            parent: 2,
                                            author: 'bob',
                                            content: 'ya rly',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    type: 'forum',
                    id: id(),
                    title: 'fun',
                    slug: 'fun',
                    topics: createTopics(),
                },
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
                            content: '<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><img src="rick.jpg" alt="rick roll" /></a>',
                        },
                        {
                            type: 'message',
                            id: id(),
                            author: 'rick',
                            content: `don't <span class="text-3xl font-hairline">u</span> meme on me!!1 <span class="text-transparent">pls :P</span>`,
                        },
                    ],
                },
                {
                    type: 'forum',
                    id: id(),
                    title: 'code',
                    slug: 'code',
                    topics: createTopics(),
                },
                createChat('etc'),
                createForum('meta'),
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
                {
                    type: 'chat',
                    id: id(),
                    title: 'talk',
                    slug: 'talk',
                    messages: createMessages(),
                },
                { type: 'events', id: id(), title: 'events', slug: 'events', events },
                createForum('design'),
                {
                    type: 'forum',
                    title: 'steam',
                    id: id(),
                    slug: 'steam',
                    description: '<small>science, technology, engineering, art, & mathematics</small>',
                    topics: createTopics(),
                },
                {
                    type: 'blog',
                    id: id(),
                    title: 'blog',
                    slug: 'blog',
                    posts: randPosts(),
                },
                createForum('tech'),
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
                            title: 'Moderation',
                            slug: 'moderation',
                            content: 'seriously',
                        },
                        {
                            type: 'topic',
                            id: id(),
                            author: 'rick',
                            title: 'Big discussion topic thing title',
                            slug: 'big_discussion_topic_thing',
                            content: 'Topic content - an important discussion question.',
                        },
                        {
                            type: 'topic',
                            id: id(),
                            author: 'alex',
                            title: 'we need topics and replies!',
                            slug: 'we-need-topics-and-replies',
                            content: `
							<div style="width: 300px;">
								<div class="border-pink-300 bg-pink-200 text-pink-700 text-xl rounded-lg mb-1 pl-1 whitespace-no-wrap border-4 border-dashed" style="height: 32px; width: 90px">topics 18%</div>
								<div class="border-indigo-300 bg-indigo-200 text-indigo-700 text-xl rounded-lg mb-1 pl-1 whitespace-no-wrap border-4 border-dashed" style="height: 32px; width: 250px">?? 49%</div>
								<div class="border-yellow-300 bg-yellow-200 text-yellow-700 text-xl rounded-lg mb-1 pl-1 whitespace-no-wrap border-4 border-dashed" style="height: 32px; width: 170px">replies..? 33%</div>
							</div>`,
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
                            content: '<div>',
                            status: 'done',
                        },
                        {
                            type: 'topic',
                            id: id(),
                            author: 'rick',
                            title: 'What should the name of the top-level community be?',
                            slug: 'what-should-the-name-of-the-top-level-community-be',
                            content: `
							<div style="width: 300px;">
								<div class="border-pink-300 bg-pink-200 text-pink-700 text-xl rounded-lg mb-1 pl-1 whitespace-no-wrap border-4 border-dashed" style="height: 32px; width: 90px">felt</div>
								<div class="border-indigo-300 bg-indigo-200 text-indigo-700 text-xl rounded-lg mb-1 pl-1 whitespace-no-wrap border-4 border-dashed" style="height: 32px; width: 250px">i dunno</div>
								<div class="border-yellow-300 bg-yellow-200 text-yellow-700 text-xl rounded-lg mb-1 pl-1 whitespace-no-wrap border-4 border-dashed" style="height: 32px; width: 170px">felt.social</div>
							</div>`,
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
                {
                    type: 'chat',
                    id: id(),
                    title: 'stream',
                    slug: 'stream',
                    messages: createMessages(),
                },
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
                            author: 'dana',
                            content: 'you came to the right place ~~',
                        },
                    ],
                },
                { type: 'events', id: id(), title: 'events', slug: 'events', events },
                createForum('questions'),
                createForum('design'),
                createForum('requests'),
                {
                    type: 'blog',
                    id: id(),
                    title: 'blog',
                    slug: 'blog',
                    posts: randPosts(),
                },
                createForum('test'),
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
                            title: 'Contributors',
                            slug: 'contributors',
                            content: 'who? docs!',
                        },
                        {
                            type: 'topic',
                            id: id(),
                            author: 'rick',
                            title: 'Should we do the thing?',
                            slug: 'should_we_do_the_thing',
                            content: 'hmm?',
                        },
                        {
                            type: 'topic',
                            id: id(),
                            author: 'alex',
                            title: 'we need topics and replies!',
                            slug: 'we-need-topics-and-replies',
                            content: `
							<div style="width: 300px;">
								<div class="border-pink-300 bg-pink-200 text-pink-700 text-xl rounded-lg mb-1 pl-1 whitespace-no-wrap border-4 border-dashed" style="height: 32px; width: 90px">topics 18%</div>
								<div class="border-indigo-300 bg-indigo-200 text-indigo-700 text-xl rounded-lg mb-1 pl-1 whitespace-no-wrap border-4 border-dashed" style="height: 32px; width: 250px">?? 49%</div>
								<div class="border-yellow-300 bg-yellow-200 text-yellow-700 text-xl rounded-lg mb-1 pl-1 whitespace-no-wrap border-4 border-dashed" style="height: 32px; width: 170px">replies..? 33%</div>
							</div>`,
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
                            content: `
							<div style="width: 300px;">
								<div class="border-pink-300 bg-pink-200 text-pink-700 text-xl rounded-lg mb-1 pl-1 whitespace-no-wrap border-4 border-dashed" style="height: 32px; width: 90px">AGPL 18%</div>
								<div class="border-indigo-300 bg-indigo-200 text-indigo-700 text-xl rounded-lg mb-1 pl-1 whitespace-no-wrap border-4 border-dashed" style="height: 32px; width: 250px">ISC 49%</div>
								<div class="border-yellow-300 bg-yellow-200 text-yellow-700 text-xl rounded-lg mb-1 pl-1 whitespace-no-wrap border-4 border-dashed" style="height: 32px; width: 170px">I feel disenfranchised 33%</div>
							</div>`,
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
                createForum('threads'),
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
                createForum('support'),
                createChat('talk'),
                {
                    type: 'events',
                    id: id(),
                    title: 'meetings',
                    slug: 'meetings',
                    events,
                },
                createForum('design'),
                {
                    type: 'blog',
                    id: id(),
                    title: 'blog',
                    slug: 'blog',
                    posts: randPosts(),
                },
                createForum('tech'),
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
                            content: `
							<div style="width: 300px;">
								<div class="border-pink-300 bg-pink-200 text-pink-700 text-xl rounded-lg mb-1 pl-1 whitespace-no-wrap border-4 border-dashed" style="height: 32px; width: 90px">topics 18%</div>
								<div class="border-indigo-300 bg-indigo-200 text-indigo-700 text-xl rounded-lg mb-1 pl-1 whitespace-no-wrap border-4 border-dashed" style="height: 32px; width: 250px">?? 49%</div>
								<div class="border-yellow-300 bg-yellow-200 text-yellow-700 text-xl rounded-lg mb-1 pl-1 whitespace-no-wrap border-4 border-dashed" style="height: 32px; width: 170px">replies..? 33%</div>
							</div>`,
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
                            content: `
							<div style="width: 300px;">
								<div class="border-pink-300 bg-pink-200 text-pink-700 text-xl rounded-lg mb-1 pl-1 whitespace-no-wrap border-4 border-dashed" style="height: 32px; width: 90px">AGPL 18%</div>
								<div class="border-indigo-300 bg-indigo-200 text-indigo-700 text-xl rounded-lg mb-1 pl-1 whitespace-no-wrap border-4 border-dashed" style="height: 32px; width: 250px">ISC 49%</div>
								<div class="border-yellow-300 bg-yellow-200 text-yellow-700 text-xl rounded-lg mb-1 pl-1 whitespace-no-wrap border-4 border-dashed" style="height: 32px; width: 170px">I feel disenfranchised 33%</div>
							</div>`,
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
                {
                    type: 'chat',
                    id: id(),
                    title: 'tavern',
                    slug: 'tavern',
                    messages: createMessages(),
                },
                createForum('library'),
                {
                    type: 'chat',
                    id: id(),
                    title: 'underground',
                    slug: 'underground',
                    description: '// TODO some spaces should be ephemeral, saving no history, and others may allow or force an expiry time on content - this message will be destroyed in 5, 4,',
                    messages: createAnonMessages(),
                },
                {
                    type: 'forum',
                    id: id(),
                    title: 'caves',
                    slug: 'caves',
                    topics: anonTopics,
                    description: 
                    // TODO maybe click this for more flavor, class="flavor-text"
                    '<small>dark, wet, rock, depth, beetles, bioluminescence, mushrooms, moss, vines, tangled, critters</small>',
                },
                { type: 'events', id: id(), title: 'raids', slug: 'raids', events },
                {
                    type: 'chat',
                    id: id(),
                    title: 'forest',
                    slug: 'forest',
                    messages: createMessages(),
                    description: 
                    // TODO maybe click this for more flavor, class="flavor-text"
                    '<small>mystery, green, ferns, leaves, spiders, mushrooms, moss, birds, squirrels, risk</small>',
                },
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
                },
            ],
            view: {
                type: 'view',
                id: id(),
                component: 'BoxView',
                children: [
                    {
                        type: 'view',
                        id: id(),
                        component: 'BoxView',
                        children: [
                            {
                                type: 'view',
                                id: id(),
                                component: 'ChatView',
                                props: { chatSlug: 'tavern' },
                            },
                            {
                                type: 'view',
                                id: id(),
                                component: 'ForumView',
                                props: { forumSlug: 'library' },
                            },
                        ],
                    },
                    {
                        type: 'view',
                        id: id(),
                        component: 'EventsView',
                        props: { eventsSlug: 'raids' },
                    },
                ],
            },
        },
        {
            type: 'community',
            id: id(),
            title: 'help',
            slug: 'help',
            description: "<small>need support? got some questions? we're here to help!</small>",
            spaces: [
                {
                    ...createChat(),
                    messages: [
                        {
                            type: 'message',
                            id: id(),
                            author: 'alex',
                            content: 'i need help',
                        },
                        {
                            type: 'message',
                            id: id(),
                            author: 'alice',
                            content: 'what can we help you with?',
                        },
                        { type: 'message', id: id(), author: 'alex', content: 'im lost' },
                    ],
                },
                createForum(),
            ],
            // TODO this belongs in the layout no? points to a world and a view for that world?
            view: {
                type: 'view',
                id: id(),
                component: 'BoxView',
                children: [
                    {
                        type: 'view',
                        id: id(),
                        component: 'ChatView',
                        props: { chatSlug: 'chat' },
                    },
                    {
                        type: 'view',
                        id: id(),
                        component: 'ForumView',
                        props: { forumSlug: 'forum' },
                    },
                ],
            },
        },
        // people
        ...people,
        // pages
        {
            type: 'page',
            id: id(),
            title: 'about',
            slug: 'about',
            spaces: [createChat('about'), createForum('about')],
        },
        {
            type: 'page',
            id: id(),
            title: 'blog',
            slug: 'blog',
            spaces: [createChat('blog'), createForum('blog')],
        },
    ],
};
export default data;
