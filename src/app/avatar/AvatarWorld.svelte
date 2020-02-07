<script>
	import EntityExplorer from '../ui/EntityExplorer.svelte';
	import InboxList from '../inbox/InboxList.svelte';
	import NotesList from '../notes/NotesList.svelte';
	import ActivitiesList from '../activity/ActivitiesList.svelte';
	import PlaceholderInfo from '../ui/PlaceholderInfo.svelte';
	import WorldName from '../world/WorldName.svelte';

	export let world;

	$: inboxNotes = $world.spaces[0].notes; // TODO temporarily hardcoded
	$: notesNotes = $world.spaces[0].notes; // TODO temporarily hardcoded
	$: activities = $world.spaces[2].activities; // TODO temporarily hardcoded
</script>

<PlaceholderInfo>
	this is one of your avatars,
	<WorldName classes="text-4xl" name={$world.slug} isMention={true} />
</PlaceholderInfo>
<PlaceholderInfo>
	avatars are like characters in a story, pseudonyms that you control
</PlaceholderInfo>
<PlaceholderInfo>
	on the left, you'll see your avatar's spaces - click around to learn more
</PlaceholderInfo>
<PlaceholderInfo>
	TODO show all activity for this avatar & interact with it
</PlaceholderInfo>

<!-- TODO this is temp  -->
<InboxList notes={inboxNotes} />
<NotesList notes={notesNotes} />
<ActivitiesList {activities} />

{#if $world.content}{$world.content}{/if}
