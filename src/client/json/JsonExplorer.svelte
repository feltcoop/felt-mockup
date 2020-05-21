<script>
	import {getJsonType} from '@feltcoop/gro/dist/utils/json.js';

	export let json;

	$: jsonType = getJsonType(json);
</script>

{#if jsonType === 'number'}
	<span class="type-number">{json}</span>
	<span class="syntax">,</span>
{:else if jsonType === 'string'}
	<span class="type-string">'{json}'</span>
	<span class="syntax">,</span>
{:else if jsonType === 'boolean'}
	<span class="type-boolean">{json}</span>
	<span class="syntax">,</span>
{:else if jsonType === 'null'}
	<span class="type-null">null</span>
	<span class="syntax">,</span>
{:else if jsonType === 'array'}
	<span class="syntax">[</span>
	{#each json as item}
		<svelte:self json={item} />
	{/each}
	<span class="syntax">],</span>
{:else}
	<span class="syntax">{'{'}</span>
	{#each Object.keys(json) as key}
		<div class="indented">
			<span>
				{key}
				<span class="syntax">:</span>
			</span>
			<svelte:self json={json[key]} />
		</div>
	{/each}
	<span class="syntax">{'}'},</span>
{/if}

<style>
	.syntax {
		color: gray;
	}
	.indented {
		padding-left: 10px;
	}
	.type-number {
		color: yellow;
	}
	.type-string {
		color: green;
	}
	.type-boolean {
		color: blue;
	}
	.type-null {
		color: gray;
	}
</style>
