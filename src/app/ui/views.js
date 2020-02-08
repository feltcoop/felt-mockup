import BoxView from './BoxView.svelte';
import ChatView from '../chat/ChatView.svelte';
import ForumView from '../forum/ForumView.svelte';
import EventsView from '../events/EventsView.svelte';

// TODO this is temporarily hardcoded - should be pluginable
// are we doing to want an async api for dynamic imports?
export const views = {
	BoxView,
	ChatView,
	ForumView,
	EventsView,
};
