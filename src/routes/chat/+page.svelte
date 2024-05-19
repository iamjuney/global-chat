<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { BadgeAlert, LogOut } from 'lucide-svelte';
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
						<p class="text-sm text-gray-500">@mkdir_jun</p>

						<form method="post" use:enhance action="?/logout">
							<Button size="icon" variant="ghost">
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
								<button
									class="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="h-4 w-4"
									>
										<polyline points="9 17 4 12 9 7"></polyline>
										<path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
									</svg>
								</button>
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
								<button
									class="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="h-4 w-4"
									>
										<polyline points="9 17 4 12 9 7"></polyline>
										<path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
									</svg>
								</button>
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
								<button
									class="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="h-4 w-4"
									>
										<polyline points="9 17 4 12 9 7"></polyline>
										<path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
									</svg>
								</button>
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
								<button
									class="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="h-4 w-4"
									>
										<polyline points="9 17 4 12 9 7"></polyline>
										<path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
									</svg>
								</button>
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
								<button
									class="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="h-4 w-4"
									>
										<polyline points="9 17 4 12 9 7"></polyline>
										<path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="flex items-center gap-2">
				<input
					class="flex h-10 w-full flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					placeholder="Type your message..."
				/>
				<button
					class="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="h-5 w-5"
					>
						<path d="m22 2-7 20-4-9-9-4Z"></path>
						<path d="M22 2 11 13"></path>
					</svg>
				</button>
			</div>
		</div>
	</div>
</div>
