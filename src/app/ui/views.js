import BoxView from './BoxView.svelte';
import ChatView from '../chat/ChatView.svelte';
import ForumView from '../forum/ForumView.svelte';
import EventsView from '../events/EventsView.svelte';

// TODO this has circular dependencies
// Circular dependency: src/app/forum/ForumReply.svelte -> src/app/forum/ForumReplies.svelte -> src/app/forum/ForumReply.svelte
// Circular dependency: src/app/ui/View.svelte -> src/app/ui/views.js -> src/app/ui/BoxView.svelte -> src/app/ui/View.svelte

// TODO this is temporarily hardcoded - should be pluginable
// are we doing to want an async api for dynamic imports?
export const views = {
	BoxView,
	ChatView,
	ForumView,
	EventsView,
};
