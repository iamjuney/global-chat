<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { getReadableDateNow } from '$lib/utils';
	import { BadgeAlert, LogOut, Reply, Send } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	let { data } = $props();

	$effect(() => {
		if (data.user) {
			toast.success(`Welcome @${data.user.username}!`, {
				description: getReadableDateNow()
			});
		}
	});
</script>

<div class="flex h-screen w-full items-center justify-center bg-gray-100">
	<div
		class="h-[70vh] w-full max-w-[576px] rounded-lg border border-gray-200 bg-white p-4 shadow-md"
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
			<div class="flex-1 overflow-y-auto pr-3">
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
								<Button size="icon" variant="ghost">
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
				</div>
			</div>
			<div class="flex items-center gap-2">
				<Input placeholder="Type a message..." class="flex-1" />
				<Button size="icon" variant="ghost">
					<Send class="size-6" />
				</Button>
			</div>
		</div>
	</div>
</div>
