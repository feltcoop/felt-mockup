<script>
	import InboxList from '../inbox/InboxList.svelte';
	import NotesList from '../notes/NotesList.svelte';
	import ActivitiesList from '../activity/ActivitiesList.svelte';
	import PlaceholderInfo from '../ui/PlaceholderInfo.svelte';
	import WorldName from '../world/WorldName.svelte';
	import View from '../ui/View.svelte';
	import Content from '../ui/Content.svelte';

	export let world;

	$: inboxNotes = $world.spaces[0].notes; // TODO temporarily hardcoded
	$: notesNotes = $world.spaces[0].notes; // TODO temporarily hardcoded
	$: activities = $world.spaces[2].activities; // TODO temporarily hardcoded
</script>

<Content>
	<PlaceholderInfo>
		this is one of your personas,
		<WorldName name={$world.slug} isMention={true} />
	</PlaceholderInfo>
	<PlaceholderInfo>
		personas are pseudonyms, names under your control in online spaces
	</PlaceholderInfo>
	<PlaceholderInfo>
		sometimes we think of them as characters in a story
	</PlaceholderInfo>
	<PlaceholderInfo>
		on the left, you'll see your persona's spaces - we're a work in progress
	</PlaceholderInfo>
	<PlaceholderInfo>
		TODO show this persona's communities and custom nav and spaces
	</PlaceholderInfo>
	<PlaceholderInfo>
		TODO show all activity for this persona & interact with it
	</PlaceholderInfo>
</Content>

<!-- TODO this is temp  -->
<InboxList notes={inboxNotes} />
<NotesList notes={notesNotes} />
<ActivitiesList {activities} />

{#if $world.content}{$world.content}{/if}

{#if $world.view}
	<View view={$world.view} />
{/if}
