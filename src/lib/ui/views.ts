import BoxView from './BoxView.svelte';
import ChatView from '../chat/ChatView.svelte';
import ForumView from '../forum/ForumView.svelte';
import EventsView from '../events/EventsView.svelte';
import EmojisView from '../emoji/EmojisView.svelte';

// TODO this has circular dependencies
// Circular dependency: src/lib/forum/ForumReply.svelte -> src/lib/forum/ForumReplies.svelte -> src/lib/forum/ForumReply.svelte
// Circular dependency: src/lib/ui/View.svelte -> src/lib/ui/views.js -> src/lib/ui/BoxView.svelte -> src/lib/ui/View.svelte

// TODO this is temporarily hardcoded - should be pluginable
// are we doing to want an async api for dynamic imports?
export const views = {
	BoxView,
	ChatView,
	ForumView,
	EventsView,
	EmojisView,
};
