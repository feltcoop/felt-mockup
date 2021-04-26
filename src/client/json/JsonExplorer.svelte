<script lang="ts">
	import {getJsonType} from '../json/index.js';

	export let json;
	export let indentedClasses = 'pl-6';

	$: jsonType = getJsonType(json);
</script>

{#if jsonType === 'number'}
	<span class="text-yellow-700">{json}</span>
	<span class="syntax">,</span>
	<!-- <small class="bg-gray-200 mx-2">number</small> -->
{:else if jsonType === 'string'}
	<span class="text-green-700">'{json}'</span>
	<span class="syntax">,</span>
	<!-- <small class="bg-gray-200 mx-2">string</small> -->
{:else if jsonType === 'boolean'}
	<span class="text-blue-700">{json}</span>
	<span class="syntax">,</span>
	<!-- <small class="bg-gray-200 mx-2">boolean</small> -->
{:else if jsonType === 'null'}
	<span class="syntax">,</span>
	<span class="syntax">null</span>
{:else if jsonType === 'array'}
	<span class="syntax">[</span>
	{#each json as item}
		<svelte:self json={item} />
	{/each}
	<span class="syntax">],</span>
{:else}
	<span class="syntax">{'{'}</span>
	{#each Object.keys(json) as key}
		<div class={indentedClasses}>
			<span>
				{key}
				<span class="text-gray-500">:</span>
			</span>
			<svelte:self json={json[key]} />
		</div>
	{/each}
	<span class="syntax">{'}'},</span>
{/if}

<style>
	.syntax {
		@apply text-gray-500;
	}
</style>
