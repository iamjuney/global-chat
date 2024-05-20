<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Alert from '$lib/components/ui/alert';
	import { getReadableDateNow } from '$lib/utils';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { BadgeAlert, LogOut, Reply, Send, Loader2, X } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	let { data } = $props();
	let isSending = $state(false);
	let message = $state('');
	let repliedToUsername = $state('');
	let repliedToMessage = $state('');
	let showReplyAlert = $state(false);

	$effect(() => {
		if (data.user) {
			toast.success(`Welcome @${data.user.username}!`, {
				description: getReadableDateNow()
			});
		}
	});

	const handleSubmit: SubmitFunction = () => {
		isSending = true;

		return ({ result }) => {
			// if the result is a failure, set the failedSearchData to the result data
			// else, set the interviews to the result data
			if (result.type === 'failure') {
				message = '';
				toast.error(`${result.data?.message}`, {
					description: 'Error sending message. Please try again.'
				});
			}
			// else if (result.type === 'success') interviews = result.data?.interviews;

			isSending = false;
		};
	};
</script>

<div class="flex h-screen w-full items-center justify-center bg-gray-100">
	<div
		class="h-full w-full max-w-[576px] rounded-lg border border-gray-200 bg-white p-4 shadow-md md:h-[70vh]"
	>
		<div class="flex h-full flex-col justify-end gap-4">
			<div class="flex flex-col gap-2">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-3">
						<h2 class="text-lg font-semibold">Global Chat</h2>
						<Tooltip.Root openDelay={300}>
							<Tooltip.Trigger>
								<BadgeAlert class="h-5 w-5" />
							</Tooltip.Trigger>
							<Tooltip.Content class="max-w-40">
								<div class="flex flex-col gap-2">
									<h3 class="text-sm font-semibold">Note:</h3>
									<p class="text-xs text-gray-500">
										Please be respectful to others and keep the conversation friendly.
									</p>
								</div>
							</Tooltip.Content>
						</Tooltip.Root>
					</div>
					<div class="flex items-center gap-3">
						<p class="text-sm text-gray-500">@{data.user.username}</p>

						<form method="post" use:enhance action="/?/logout">
							<Button type="submit" size="icon" variant="ghost">
								<LogOut class="h-5 w-5" />
							</Button>
						</form>
					</div>
				</div>
				<div
					data-orientation="horizontal"
					role="none"
					class="h-[1px] w-full shrink-0 bg-gray-100"
				></div>
			</div>
			<div class="-mr-2 flex-1 overflow-y-auto pr-2">
				<div class="flex flex-col justify-end gap-4">
					<div class="flex items-start gap-3">
						<div class="flex-1 space-y-1">
							<div class="rounded-lg bg-gray-100 p-3">
								<p>
									Hey everyone! Just wanted to say hi and let you know I'm excited to be part of
									this global chat app.
								</p>
							</div>
							<div class="flex items-center gap-2 text-xs text-gray-500">
								<span>@shadcn</span>
								<span>9:15 AM</span>
								<Button
									size="icon"
									variant="ghost"
									on:click={() => {
										repliedToUsername = 'shadcn';
										repliedToMessage =
											"Hey everyone! Just wanted to say hi and let you know I'm excited to be part of this global chat app.";
										showReplyAlert = true;
									}}
								>
									<Reply class="h-5 w-5" />
								</Button>
							</div>
						</div>
					</div>
					<div class="flex items-start justify-end gap-3">
						<div class="flex-1 space-y-1">
							<div class="rounded-lg bg-primary p-3 text-primary-foreground">
								<p>
									Awesome, I'm looking forward to chatting with everyone! Let me know if you have
									any questions.
								</p>
							</div>
							<div class="flex items-center justify-end gap-2 text-xs text-gray-500">
								<span>@jaredpalmer</span>
								<span>9:16 AM</span>
								<Button size="icon" variant="ghost">
									<Reply class="h-5 w-5" />
								</Button>
							</div>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<div class="flex-1 space-y-1">
							<div class="flex flex-col gap-3 rounded-lg bg-gray-100 p-3">
								<div>
									<p class="text-xs text-gray-500">
										Replied to <u class="text-foreground">@shadcn</u>
										- Awesome, I'm looking forward to chatting with everyone! Let me know if you have
										any questions.
									</p>
								</div>
								<p>
									I'm excited too! This is a great way to connect with people from all over the
									world.
								</p>
							</div>
							<div class="flex items-center gap-2 text-xs text-gray-500">
								<span>@shadcn</span>
								<span>9:17 AM</span>

								<Button size="icon" variant="ghost">
									<Reply class="h-5 w-5" />
								</Button>
							</div>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<div class="flex-1 space-y-1">
							<div class="rounded-lg bg-gray-100 p-3">
								<p>
									send I'm excited too! This is a great way to connect with people from all over the
									world.
								</p>
							</div>
							<div class="flex items-center gap-2 text-xs text-gray-500">
								<span>@shadcn</span>
								<span>9:17 AM</span>
								<Button size="icon" variant="ghost">
									<Reply class="h-5 w-5" />
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{#if showReplyAlert}
				<div class="flex items-center gap-2">
					<Alert.Root class="flex-1">
						<Reply class="size-5" />
						<Alert.Title>Reply to <u class="text-foreground">@{repliedToUsername}</u></Alert.Title>
						<Alert.Description>{repliedToMessage}</Alert.Description>
					</Alert.Root>
					<Button
						size="icon"
						variant="ghost"
						on:click={() => {
							showReplyAlert = false;
						}}
					>
						<X class="size-6" />
					</Button>
				</div>
			{/if}

			<form
				method="POST"
				action="?/send"
				class="flex items-center gap-2"
				use:enhance={handleSubmit}
			>
				<Input name="message" bind:value={message} placeholder="Type a message..." class="flex-1" />
				{#if showReplyAlert}
					<input type="hidden" name="replied_to_username" value={repliedToUsername} />
					<input type="hidden" name="replied_to_message" value={repliedToMessage} />
				{/if}
				<Button type="submit" size="icon" variant="ghost" disabled={isSending}>
					{#if isSending}
						<span class="animate-spin">
							<Loader2 class="size-6" />
						</span>
					{:else}
						<Send class="size-6" />
					{/if}
				</Button>
			</form>
		</div>
	</div>
</div>
