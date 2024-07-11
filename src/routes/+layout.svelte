<script>
	import "../app.css";
	  import { Toaster } from 'svelte-french-toast';
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
  
		// Function to check for the 'toast' cookie and display it
		function checkForToast() {
		  const cookies = document.cookie.split('; ');
		  const toastCookie = cookies.find(row => row.startsWith('toast='));
		  if (toastCookie) {
			  const message = decodeURIComponent(toastCookie.split('=')[1]);
			  toast(message, { duration: 7000 });
			  // Remove the toast cookie after displaying it
			  document.cookie = 'toast=; Max-Age=0; path=/';
		  }
	  }
  
	  onMount(() => {
		  checkForToast();
	  });
	</script>
	
	<Toaster />
  
	<div class="grid size-full bg-slate-950 text-white grid size-full font-mono">
	  <slot />
	</div>