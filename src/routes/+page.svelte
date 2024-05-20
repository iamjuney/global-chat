<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { getReadableDateNow } from '$lib/utils';
	import { Github } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	let { form } = $props();

	$effect(() => {
		if (form?.logout) {
			toast.success('Successfully logout.', {
				description: getReadableDateNow()
			});
		}
	});
</script>

<div class="flex h-screen items-center justify-center bg-background">
	<div class="mx-auto max-w-md space-y-6">
		<div class="space-y-2 text-center">
			<h1 class="text-3xl font-bold">Sign In</h1>
			<p class="text-muted-foreground">Sign in to your account using GitHub.</p>
		</div>
		<Button href="/login/github" size="lg" class="w-full">
			<Github class="mr-2 h-6 w-6" />
			Sign in with GitHub
		</Button>
	</div>
</div>
