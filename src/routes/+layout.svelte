<script>
	import { navigating } from '$app/stores';
	import { Toaster } from '$lib/components';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import '../app.css';

	NProgress.configure({
		// Full list: https://github.com/rstacruz/nprogress#configuration
		minimum: 0.16,
		showSpinner: false
	});

	$effect(() => {
		if ($navigating) {
			NProgress.start();
		} else NProgress.done();
	});

	let { children } = $props();
</script>

<Toaster />

{@render children()}

<style>
	:global(#nprogress .bar) {
		height: 4px !important;
		background: linear-gradient(
			90deg,
			hsl(var(--primary)) 0%,
			hsl(var(--primary)) 50%,
			hsl(var(--primary)) 100%
		) !important;
	}
</style>
