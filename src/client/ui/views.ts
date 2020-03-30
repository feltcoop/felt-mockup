import BoxView from './BoxView.svelte';
import ChatView from '../chat/ChatView.svelte';
import ForumView from '../forum/ForumView.svelte';
import EventsView from '../events/EventsView.svelte';
import EmojisView from '../emoji/EmojisView.svelte';

// TODO this has circular dependencies
// Circular dependency: src/client/forum/ForumReply.svelte -> src/client/forum/ForumReplies.svelte -> src/client/forum/ForumReply.svelte
// Circular dependency: src/client/ui/View.svelte -> src/client/ui/views.js -> src/client/ui/BoxView.svelte -> src/client/ui/View.svelte

// TODO this is temporarily hardcoded - should be pluginable
// are we doing to want an async api for dynamic imports?
export const views = {
	BoxView,
	ChatView,
	ForumView,
	EventsView,
	EmojisView,
};
