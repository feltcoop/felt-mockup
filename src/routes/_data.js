let idCounter = 0;
export const id = () => idCounter++;
// TODO should PEOPLE have child ACCOUNTS, and ACCOUNTS have child USERS?
// or does PERSON === ACCOUNT?
const people = [
    {
        type: 'person',
        name: 'Hamilton',
        id: id(),
        avatars: [
            { type: 'avatar', name: `avatar${id()}`, id: id() },
            { type: 'avatar', name: `avatar${id()}`, id: id() },
            { type: 'avatar', name: `avatar${id()}`, id: id() },
        ],
    },
    {
        type: 'person',
        name: 'Sue',
        id: id(),
        avatars: [
            { type: 'avatar', name: `avatar${id()}`, id: id() },
            { type: 'avatar', name: `avatar${id()}`, id: id() },
            { type: 'avatar', name: `avatar${id()}`, id: id() },
        ],
    },
    {
        type: 'person',
        name: 'Alice',
        id: id(),
        avatars: [
            { type: 'avatar', name: `avatar${id()}`, id: id() },
            { type: 'avatar', name: `avatar${id()}`, id: id() },
            { type: 'avatar', name: `avatar${id()}`, id: id() },
        ],
    },
    {
        type: 'person',
        name: 'Bob',
        id: id(),
        avatars: [
            { type: 'avatar', name: `avatar${id()}`, id: id() },
            { type: 'avatar', name: `avatar${id()}`, id: id() },
            { type: 'avatar', name: `avatar${id()}`, id: id() },
        ],
    },
    {
        type: 'person',
        name: 'Chris',
        id: id(),
        avatars: [
            { type: 'avatar', name: `avatar${id()}`, id: id() },
            { type: 'avatar', name: `avatar${id()}`, id: id() },
            { type: 'avatar', name: `avatar${id()}`, id: id() },
        ],
    },
    {
        type: 'person',
        name: 'Dara',
        id: id(),
        avatars: [
            { type: 'avatar', name: `avatar${id()}`, id: id() },
            { type: 'avatar', name: `avatar${id()}`, id: id() },
            { type: 'avatar', name: `avatar${id()}`, id: id() },
        ],
    },
];
// TODO chat messages
const messages = [
    { type: 'message', id: id(), author: 'ryan', content: 'hi!' },
    {
        type: 'message',
        id: id(),
        author: 'hamilton',
        content: 'what is up fellow chat friend?',
    },
    { type: 'message', id: id(), author: 'ryan', content: 'nm u?' },
];
// TODO forum topics
const topics = [
    {
        type: 'topic',
        id: id(),
        author: 'ryan',
        title: 'I have a serious topic to discuss!',
        content: "Now that we're here for the serious topic, who wants icecream?",
        slug: 'serious-topic',
        children: [
            {
                type: 'reply',
                id: id(),
                parent: 1,
                author: 'hamilton',
                content: 'Ok!',
                children: [
                    {
                        type: 'reply',
                        id: id(),
                        parent: 2,
                        author: 'ryan',
                        content: 'We need topics and topics!',
                    },
                ],
            },
            {
                type: 'reply',
                id: id(),
                parent: 1,
                author: 'ryan',
                content: 'orly?',
            },
        ],
    },
    {
        type: 'topic',
        id: id(),
        author: 'ryan',
        title: 'What brought you here?',
        slug: 'what-brought-you-here',
    },
];
const activities = [
    {
        type: 'activity',
        id: id(),
        author: 'ryan',
        title: 'activity1',
        content: 'activity1 content',
    },
    {
        type: 'activity',
        id: id(),
        author: 'ryan',
        title: 'activity2',
        content: 'activity2 content',
    },
];
const notes = [
    {
        type: 'note',
        id: id(),
        author: 'ryan',
        title: 'note1',
        content: 'content1',
    },
    {
        type: 'note',
        id: id(),
        author: 'ryan',
        title: 'note2',
        content: 'content2',
    },
];
const posts = [
    {
        type: 'post',
        id: id(),
        author: 'ryan',
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
        author: 'ryan',
        title: 'Why Felt is a co-op',
        slug: 'why-felt-is-a-co-op',
        content: `
			<p>todo</p>
		`,
    },
];
const randPosts = () => [
    {
        type: 'post',
        id: id(),
        title: 'Blog post title 2',
        slug: '2',
        author: 'ryan',
        content: 'Blog post content 2 <small>:O:D</small>',
    },
    {
        type: 'post',
        id: id(),
        title: 'Blog post title 1',
        slug: '1',
        author: 'hamilton',
        content: 'Blog post content 1 <small>:):)</small>',
    },
];
const data = {
    people,
    posts,
    session: {
        type: 'session',
        id: id(),
        nav: [
            {
                title: 'avatars',
                items: ['ryan', 'onuk', 'overtowed'],
            },
            {
                title: 'communities',
                items: ['felt', 'feltcoop', 'village', 'help'],
            },
            {
                title: 'friends',
                items: ['hamilton', 'sue', 'alice', 'bob', 'chris'],
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
            title: 'ryan',
            slug: 'ryan',
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
            title: 'ryanatkn',
            slug: 'ryanatkn',
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
            title: 'onuk',
            slug: 'onuk',
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
            title: 'overtowed',
            slug: 'overtowed',
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
                { type: 'forum', id: id(), title: 'support', slug: 'support', topics },
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
                            content: '<img src="/logo-heart.png"/>',
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
                            content: '<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener"><img src="rick.jpg" alt="rick roll" /></a>',
                        },
                        ...messages,
                    ],
                },
                { type: 'forum', id: id(), title: 'code', slug: 'code', topics },
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
            slug: 'feltsocial',
            description: '<small>our team <3</small>',
            spaces: [
                { type: 'chat', id: id(), title: 'talk', slug: 'talk', messages },
                { type: 'forum', id: id(), title: 'design', slug: 'design', topics },
                {
                    type: 'forum',
                    title: 'steam',
                    id: id(),
                    slug: 'steam',
                    description: '<small>science, technology, engineering, art, & mathematics</small>',
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
                            author: 'hamilton',
                            title: 'hiring',
                            slug: 'hiring',
                            content: 'Hiring',
                        },
                        {
                            type: 'topic',
                            id: id(),
                            author: 'ryan',
                            title: 'funding',
                            slug: 'funding',
                            content: 'Funding',
                        },
                        {
                            type: 'topic',
                            id: id(),
                            author: 'hamilton',
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
                            author: 'hamilton',
                            title: 'What should milestone 1 include?',
                            slug: 'what-should-milestone-1-include',
                            content: '??',
                            status: 'open',
                        },
                        {
                            type: 'topic',
                            id: id(),
                            author: 'ryan',
                            title: 'Which software license should we use?',
                            slug: 'which-software-license-should-we-use',
                            content: '??',
                            status: 'done',
                        },
                        {
                            type: 'topic',
                            id: id(),
                            author: 'ryan',
                            title: 'What should the name of the top-level community be?',
                            slug: 'what-should-the-name-of-the-top-level-community-be',
                            content: '??',
                            status: 'open',
                        },
                        {
                            type: 'topic',
                            id: id(),
                            author: 'hamilton',
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
            title: 'felt.dev',
            slug: 'feltdev',
            description: '<small>our team <3</small>',
            spaces: [
                { type: 'chat', id: id(), title: 'talk', slug: 'talk', messages },
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
                            author: 'hamilton',
                            title: 'hiring',
                            slug: 'hiring',
                            content: 'Hiring',
                        },
                        {
                            type: 'topic',
                            id: id(),
                            author: 'ryan',
                            title: 'funding',
                            slug: 'funding',
                            content: 'Funding',
                        },
                        {
                            type: 'topic',
                            id: id(),
                            author: 'hamilton',
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
                            author: 'hamilton',
                            title: 'What should milestone 1 include?',
                            slug: 'what-should-milestone-1-include',
                            content: '??',
                            status: 'open',
                        },
                        {
                            type: 'topic',
                            id: id(),
                            author: 'ryan',
                            title: 'Which software license should we use?',
                            slug: 'which-software-license-should-we-use',
                            content: '??',
                            status: 'done',
                        },
                        {
                            type: 'topic',
                            id: id(),
                            author: 'ryan',
                            title: 'What should the name of the top-level community be?',
                            slug: 'what-should-the-name-of-the-top-level-community-be',
                            content: '??',
                            status: 'open',
                        },
                        {
                            type: 'topic',
                            id: id(),
                            author: 'hamilton',
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
            title: 'felt.coop',
            slug: 'feltcoop',
            description: '<small>our team <3</small>',
            spaces: [
                { type: 'chat', id: id(), title: 'talk', slug: 'talk', messages },
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
                            author: 'hamilton',
                            title: 'hiring',
                            slug: 'hiring',
                            content: 'Hiring',
                        },
                        {
                            type: 'topic',
                            id: id(),
                            author: 'ryan',
                            title: 'funding',
                            slug: 'funding',
                            content: 'Funding',
                        },
                        {
                            type: 'topic',
                            id: id(),
                            author: 'hamilton',
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
                            author: 'hamilton',
                            title: 'What should milestone 1 include?',
                            slug: 'what-should-milestone-1-include',
                            content: '??',
                            status: 'open',
                        },
                        {
                            type: 'topic',
                            id: id(),
                            author: 'ryan',
                            title: 'Which software license should we use?',
                            slug: 'which-software-license-should-we-use',
                            content: '??',
                            status: 'done',
                        },
                        {
                            type: 'topic',
                            id: id(),
                            author: 'ryan',
                            title: 'What should the name of the top-level community be?',
                            slug: 'what-should-the-name-of-the-top-level-community-be',
                            content: '??',
                            status: 'open',
                        },
                        {
                            type: 'topic',
                            id: id(),
                            author: 'hamilton',
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
            description: '<small>a carefully curated community for people who care</small>',
            spaces: [
                { type: 'chat', id: id(), title: 'tavern', slug: 'tavern', messages },
                {
                    type: 'forum',
                    id: id(),
                    title: 'library',
                    slug: 'library',
                    description: '<small>please mind the norms</small>',
                    topics,
                },
                {
                    type: 'chat',
                    id: id(),
                    title: 'underground',
                    slug: 'underground',
                    messages,
                },
                {
                    type: 'forum',
                    id: id(),
                    title: 'caves',
                    slug: 'caves',
                    topics,
                    description: 
                    // TODO maybe click this for more flavor, class="flavor-text"
                    '<small>depth, wet, rock, dark, beetles, bioluminescence, mushrooms, moss, vines, tangled, critters</small>',
                },
                {
                    type: 'chat',
                    id: id(),
                    title: 'forest',
                    slug: 'forest',
                    messages,
                    description: 
                    // TODO maybe click this for more flavor, class="flavor-text"
                    '<small>mystery, green, ferns, leaves, spiders, mushrooms, moss, birds, squirrels, danger</small>',
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
        },
        {
            type: 'community',
            id: id(),
            title: 'help',
            slug: 'help',
            description: "<p><small>need support? got some questions? we're here to help!</small></p><p>TODO show summary preview thumbnails of both the chat and forum, and other actionable insights into this world</p>",
            spaces: [
                { type: 'chat', id: id(), title: 'chat', slug: 'chat', messages },
                { type: 'forum', id: id(), title: 'forum', slug: 'forum', topics },
            ],
        },
        // people
        {
            type: 'person',
            id: id(),
            title: 'Hamilton',
            slug: 'hamilton',
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
            id: id(),
            title: 'Ryan',
            slug: 'Ryan',
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
            id: id(),
            title: 'Sue',
            slug: 'sue',
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
            id: id(),
            title: 'Alice',
            slug: 'alice',
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
            id: id(),
            title: 'Bob',
            slug: 'bob',
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
            id: id(),
            title: 'Chris',
            slug: 'chris',
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
            id: id(),
            title: 'Dara',
            slug: 'dara',
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
