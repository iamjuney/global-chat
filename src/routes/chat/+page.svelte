<script lang="ts">
	import { enhance } from '$app/forms';
	import { Alert, Button, Input, Tooltip } from '$lib/components';
	import { supabase } from '$lib/supabase/client';
	import { cn, getReadableDateNow } from '$lib/utils';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { BadgeAlert, Loader2, LogOut, Reply, Send, X } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import Time from 'svelte-time';

	// This is a test function
	function hello() {
		console.log('hello');
	}

	// sample class
	class Sample {
		constructor() {
			console.log('Sample class');
		}
	}

	// Message type
	type Message = {
		username: string;
		message: string;
		repliedToUsername: string;
		repliedToMessage: string;
		createdAt: string;
	};

	let { data } = $props();
	let messages = $state<Message[]>(data.messages);
	let isSending = $state(false);
	let isLoadingMore = $state(false);
	let message = $state('');
	let repliedToUsername = $state('');
	let repliedToMessage = $state('');
	let showReplyAlert = $state(false);
	let chatWindow = $state<HTMLElement | null>(null);

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
		const handleNewMessage = (payload: any) => {
			const newMessage = {
				username: payload.new.username,
				message: payload.new.message,
				repliedToUsername: payload.new.replied_to_username,
				repliedToMessage: payload.new.replied_to_message,
				createdAt: payload.new.created_at
			};

			messages = [newMessage, ...messages];
			message = '';

			if (data.user.username === payload.new.username) {
				toast.success('Message sent successfully!', {
					description: getReadableDateNow()
				});

				if (showReplyAlert) {
					showReplyAlert = false;
				}
			}
		};

		const channel = supabase
			.channel('realtime chats')
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'chats'
				},
				handleNewMessage
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	});

	// Scroll to the bottom of the chatWindow
	$effect(() => {
		messages;
		showReplyAlert;

		if (chatWindow && chatWindow.clientHeight <= chatWindow.scrollTop + 130) {
			chatWindow.scrollTop = chatWindow.scrollHeight;
		}
	});

	onMount(() => {
		chatWindow?.scrollTo(0, chatWindow.scrollHeight);
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
			}

			isSending = false;
		};
	};

	// Load more messages
	const loadMoreMessages = async () => {
		let clientHeight = chatWindow?.scrollTop;

		if (clientHeight !== 0) return;

		isLoadingMore = true;

		const { data: newMessages, error } = await supabase
			.from('chats')
			.select('*')
			.order('id', { ascending: false })
			.range(messages.length, messages.length + 5);

		if (error) {
			toast.error('Error loading more messages. Please try again.', {
				description: error.message
			});
		}

		if (newMessages?.length === 0) {
			isLoadingMore = false;
			return;
		}

		if (newMessages) {
			messages = [...messages, ...newMessages];
			chatWindow?.scrollTo(0, clientHeight + 250);
		}

		isLoadingMore = false;
	};
</script>

<!-- Message Bubble Snippet -->
{#snippet messageBubble(message: Message)}
	<div
		class={cn('flex items-start gap-3', message.username === data.user.username && 'justify-end')}
	>
		<div
			class={cn(
				'flex flex-col space-y-1',
				message.username === data.user.username ? 'items-end justify-end' : 'justify-start'
			)}
		>
			<div
				class={cn(
					'text-pretty rounded-lg p-3',
					message.username === data.user.username
						? 'w-fit max-w-64 bg-primary text-primary-foreground '
						: 'w-fit max-w-64 bg-secondary text-foreground'
				)}
			>
				{#if message.repliedToUsername}
					<div>
						<p class="text-xs text-muted-foreground">
							Replied to
							<u
								class={cn(
									message.username === data.user.username
										? 'text-primary-foreground'
										: 'text-foreground'
								)}
								>@{message.repliedToUsername}
							</u>
							- {message.repliedToMessage}
						</p>
					</div>
				{/if}
				<p>
					{message.message}
				</p>
			</div>
			<div
				class={cn(
					'flex items-center gap-2 text-xs text-muted-foreground',
					message.username === data.user.username && 'justify-end'
				)}
			>
				{#if message.username === data.user.username}
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
					<span>You · <Time relative timestamp={message.createdAt} /></span>
				{:else}
					<span>@{message.username} · <Time relative timestamp={message.createdAt} /></span>
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
				{/if}
			</div>
		</div>
	</div>
{/snippet}

<div class="flex h-screen w-full items-center justify-center bg-secondary">
	<div
		class="h-full w-full max-w-[576px] rounded-lg border bg-background p-4 shadow-md md:h-[70vh]"
	>
		<div class="flex h-full flex-col justify-end gap-4">
			<!-- Header -->
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

			<!-- Chat Window -->
			<div
				bind:this={chatWindow}
				onscroll={loadMoreMessages}
				class={cn(
					'-mr-2 flex-1 overflow-y-auto pr-2',
					isLoadingMore && 'relative overflow-y-hidden'
				)}
			>
				{#if isLoadingMore}
					<div
						class="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-background bg-opacity-90"
					>
						<span class="animate-spin">
							<Loader2 class="size-10" />
						</span>
					</div>
				{/if}
				<div class="flex flex-col justify-end gap-4">
					{#each messages.toReversed() as message}
						{@render messageBubble(message)}
					{/each}
				</div>
			</div>

			{#if showReplyAlert}
				<!-- Reply Input -->
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

			<!-- Message Input -->
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
