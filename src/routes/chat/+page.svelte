<script lang="ts">
	import { enhance } from '$app/forms';
	import { Alert, Button, Input, Tooltip } from '$lib/components';
	import { supabase } from '$lib/supabase/client';
	import { getReadableDateNow, getReadableTime } from '$lib/utils';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { BadgeAlert, Loader2, LogOut, Reply, Send, X } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	type Message = {
		username: string;
		message: string;
		repliedToUsername: string;
		repliedToMessage: string;
		createdAt: Date;
	};

	let { data } = $props();
	let messages = $state<Message[]>(data.messages);
	let isSending = $state(false);
	let message = $state('');
	let repliedToUsername = $state('');
	let repliedToMessage = $state('');
	let showReplyAlert = $state(false);

	// Show welcome message
	$effect(() => {
		if (data.user) {
			toast.success(`Welcome @${data.user.username}!`, {
				description: getReadableDateNow()
			});
		}
	});

	// Listen for new messages
	$effect(() => {
		const channel = supabase
			.channel('realtime chats')
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'chats'
				},
				(payload) => {
					const newMessage = {
						username: payload.new.username,
						message: payload.new.message,
						repliedToUsername: payload.new.replied_to_username,
						repliedToMessage: payload.new.replied_to_message,
						createdAt: payload.new.created_at
					};

					messages.push(newMessage);
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	});

	// Handles form submission
	const handleSubmit: SubmitFunction = () => {
		isSending = true;

		return ({ result }) => {
			if (result.type === 'failure') {
				message = '';
				toast.error(`${result.data?.message}`, {
					description: 'Error sending message. Please try again.'
				});
			} else if (result.type === 'success') {
				message = '';
				showReplyAlert = false;
				toast.success('Message sent successfully!', {
					description: getReadableDateNow()
				});
			}

			isSending = false;
		};
	};
</script>

<div class="flex h-screen w-full items-center justify-center bg-secondary">
	<div
		class="h-full w-full max-w-[576px] rounded-lg border bg-background p-4 shadow-md md:h-[70vh]"
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
									<p class="text-xs text-muted-foreground">
										Please be respectful to others and keep the conversation friendly.
									</p>
								</div>
							</Tooltip.Content>
						</Tooltip.Root>
					</div>
					<div class="flex items-center gap-3">
						<p class="text-sm text-muted-foreground">@{data.user.username}</p>

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
					class="h-[1px] w-full shrink-0 bg-secondary"
				></div>
			</div>

			<div class="-mr-2 flex-1 overflow-y-auto pr-2">
				<div class="flex flex-col justify-end gap-4">
					{#each messages as message}
						{#if message.username === data.user.username}
							<div class="flex items-start justify-end gap-3">
								<div class="flex-1 space-y-1">
									<div class="rounded-lg bg-primary p-3 text-primary-foreground">
										{#if message.repliedToUsername}
											<div>
												<p class="text-xs text-muted-foreground">
													Replied to <u class="text-primary-foreground"
														>@{message.repliedToUsername}</u
													>
													- {message.repliedToMessage}
												</p>
											</div>
										{/if}
										<p>
											{message.message}
										</p>
									</div>
									<div class="flex items-center justify-end gap-2 text-xs text-muted-foreground">
										<span>You</span>
										<span>{getReadableTime(message.createdAt)}</span>
										<Button
											size="icon"
											variant="ghost"
											on:click={() => {
												repliedToUsername = message.username;
												repliedToMessage = message.message;
												showReplyAlert = true;
											}}
										>
											<Reply class="h-5 w-5" />
										</Button>
									</div>
								</div>
							</div>
						{:else}
							<div class="flex items-start gap-3">
								<div class="flex-1 space-y-1">
									<div class="rounded-lg bg-secondary p-3">
										{#if message.repliedToUsername}
											<div>
												<p class="text-xs text-muted-foreground">
													Replied to <u class="text-foreground">@{message.repliedToUsername}</u>
													- {message.repliedToMessage}
												</p>
											</div>
										{/if}
										<p>
											{message.message}
										</p>
									</div>
									<div class="flex items-center gap-2 text-xs text-muted-foreground">
										<span>@{message.username}</span>
										<span>{getReadableTime(message.createdAt)}</span>
										<Button
											size="icon"
											variant="ghost"
											on:click={() => {
												repliedToUsername = message.username;
												repliedToMessage = message.message;
												showReplyAlert = true;
											}}
										>
											<Reply class="h-5 w-5" />
										</Button>
									</div>
								</div>
							</div>
						{/if}
					{/each}
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

			<form method="POST" class="flex items-center gap-2" use:enhance={handleSubmit}>
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
