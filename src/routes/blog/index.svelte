<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`)
			.then(r => r.json())
			.then(posts => {
				return { posts };
			});
	}
</script>

<script>
	import Content from '../../app/ui/Content.svelte';
	import Blog from '../../app/blog/Blog.svelte';

	export let posts;

	let count1 = 0;
	let count2 = 0;
	let count3 = 0;
</script>

<svelte:head>
	<title>felt / blog</title>
</svelte:head>

<!--
	TODO replace this and other `max-width: 640px` stuff
	with a <Container/> or <Cell /> or <Box /> or something
-->
<div class="flex-1 p-2" style="max-width: 640px;">
	<Blog {posts} />
	<div style="width: 300px;">
		<div
			class="bg-pink-200 text-pink-700 border-pink-300 border-dashed mb-1
			rounded-lg border-l-4 border-b-4 border-t-2 border-r-2 text-xl pl-1
			whitespace-no-wrap"
			style="height: {30 + 2 * count1}px; width: {90 * (1 + count1 * count1)}px;"
			on:click={() => count1++}>
			:D subscribe 18%
			{#if count1}+ {count1}{/if}
		</div>
		<div
			class="bg-indigo-200 text-indigo-700 border-indigo-300 border-dashed mb-1
			rounded-lg border-l-4 border-b-4 border-t-2 border-r-2 text-xl pl-1
			whitespace-no-wrap"
			style="height: {30 + 2 * count2}px; width: {250 * (1 + count2 * count2)}px;"
			on:click={() => count2++}>
			:) like 49%
			{#if count2}+ {count2}{/if}
		</div>
		<div
			class="bg-yellow-200 text-yellow-700 border-yellow-300 border-dashed mb-1
			rounded-lg border-l-4 border-b-4 border-t-2 border-r-2 text-xl pl-1
			whitespace-no-wrap"
			style="height: {30 + 2 * count3}px; width: {170 * (1 + count3 * count3)}px;"
			on:click={() => count3++}>
			:| meh 33%
			{#if count3}+ {count3}{/if}
		</div>
		<div class="flex">
			{#each { length: count1 } as item}
				<div
					class="bg-pink-200 text-pink-700 border-pink-300 border-dashed mb-1
					rounded-lg border-l-4 border-b-4 border-t-2 border-r-2 text-xl p-2
					whitespace-no-wrap"
					style="width: 48px; height: 48px;">
					:D
				</div>
			{/each}
			{#each { length: count2 } as item}
				<div
					class="bg-indigo-200 text-indigo-700 border-indigo-300 border-dashed
					mb-1 rounded-lg border-l-4 border-b-4 border-t-2 border-r-2 text-xl
					p-2 whitespace-no-wrap"
					style="width: 48px; height: 48px;">
					:)
				</div>
			{/each}
			{#each { length: count3 } as item}
				<div
					class="bg-yellow-200 text-yellow-700 border-yellow-300 border-dashed
					mb-1 rounded-lg border-l-4 border-b-4 border-t-2 border-r-2 text-xl
					p-2 whitespace-no-wrap"
					style="width: 48px; height: 48px;">
					:|
				</div>
			{/each}
		</div>
	</div>
</div>
