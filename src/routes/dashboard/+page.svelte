<script lang="ts">
	// Dashboard logic
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { enhance } from '$app/forms';
	import type { Result } from '$lib/types/types';

	export let data: Result;

	const firstName = data.user.name;
</script>

<div class="flex flex-row flex-grow">
<div class="flex flex-col content-center w-1/5">
	<h1 class="text-4xl size-fit m-2">Dashboard</h1>
	<h2 class="m-2">Welcome, {firstName}</h2>

</div>

<div class="flex flex-col flex-grow">
<div class="flex flex-row bg-sky-900 items-center rounded-lg m-2">
	<svg class="rounded-lg p-px m-2 flex-grow" height="100" role="img">
		<g transform="translate(0, 15)">
			<rect width={data.auditSumUp / 5000} height="30" class="fill-current text-emerald-900" stroke="white" stroke-width="0.5"></rect>
			<text y="20" x="10" fill="white">Done</text>
			<text y="20" x="{data.auditSumUp / 5000 + 5}" fill="white">{Math.round(data.auditSumUp/10000)/100} MB</text>
		</g>
		<g transform="translate(0, 55)">
			<rect width={data.auditSumDown / 5000} height="30" class="fill-current text-rose-900" stroke="white" stroke-width="0.5"></rect>
			<text y="20" x="10" fill="white">Received</text>
			<text y="20" x="{data.auditSumDown / 5000 + 5}" fill="white">{Math.round(data.auditSumDown/10000)/100} MB</text>
			
		</g>
	</svg>
	<div class="w-1/2 flex flex-row items-center">
	<h2>Audits ratio:</h2>
	<h2 class="text-4xl ml-3 text-amber-500">{Math.round(data.user.auditRatio * 100)/100}</h2> 
	</div>
</div>

<h2 class="ml-2 text-2xl">Total XP earned: {Math.round(data.totalXP /1000)} kB</h2>
<svg class="bg-sky-900 m-2 rounded-lg pt-4 grow min-w-fit" height="540">
	{#each data.XP_Transfers as project, i}
		<g transform={`translate(0, ${i * 30})`} class="group">
			<rect
				width={project.amount / 200}
				height="20"
				class="fill-current text-amber-500 hover:text-amber-300 transition-all"
			></rect>
			<text x={project.amount / 200 + 5} y="15" class="group-hover:scale-0" fill="white">
				{project.object.name}
			</text>
			<text
				x={project.amount / 200 + 5}
				y="15"
				class="text-white scale-0 group-hover:scale-100 bg-black"
				fill="white"
			>
				{project.amount / 1000} kB
			</text>
		</g>
	{/each}
</svg>
</div>
</div>
