<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	async function signout() {
		const response = await fetch('?/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: JSON.stringify({
				action: 'logout'
			})
		});

		if (response.ok) {
			// Invalidate the data and reload the page to reflect the signout
			await invalidate('/dashboard');
			await goto('/');
			console.log('great succcesss');
		} else {
			console.error('Signout failed', response);
		}
	}

	onMount(() => {});
</script>

<div class="flex flex-row min-h-screen">
	<slot />
	<nav class="h-min m-2">
		<button
			on:click={signout}
			class="w-16 h-16 p-2 border mb-5 drop-shadow-md bg-gradient-to-l from-sky-900/80 to-sky-200/50 rounded-xl pointer text-white"
			>Sign Out</button
		>
	</nav>
</div>
