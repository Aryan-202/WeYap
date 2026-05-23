<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Button from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { MessageCircle, LogOut, Settings, Plus } from 'lucide-svelte';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
	<title>Chat - WeYap</title>
</svelte:head>

<div class="min-h-screen bg-background flex">
	<!-- Sidebar -->
	<div class="w-64 border-r border-border bg-card flex flex-col">
		<!-- Header -->
		<div class="border-b border-border p-4">
			<div class="flex items-center gap-2 mb-4">
				<MessageCircle class="h-6 w-6 text-primary" />
				<span class="text-lg font-bold">WeYap</span>
			</div>
			<Button.Root class="w-full h-10" size="sm">
				<Plus class="h-4 w-4 mr-2" />
				New Chat
			</Button.Root>
		</div>

		<!-- Conversations List -->
		<div class="flex-1 overflow-auto p-4">
			<p class="text-sm text-muted-foreground">No conversations yet</p>
		</div>

		<!-- Footer -->
		<div class="border-t border-border p-4 space-y-2">
			<div class="p-3 rounded-lg bg-secondary">
				<p class="text-sm font-medium">{data.user.name}</p>
				<p class="text-xs text-muted-foreground">{data.user.email}</p>
			</div>
			<div class="flex gap-2">
				<Button.Root variant="outline" size="sm" class="flex-1 h-10">
					<Settings class="h-4 w-4" />
				</Button.Root>
				<form method="post" action="?/signOut" use:enhance class="flex-1">
					<Button.Root variant="outline" size="sm" class="w-full h-10" type="submit">
						<LogOut class="h-4 w-4" />
					</Button.Root>
				</form>
			</div>
		</div>
	</div>

	<!-- Main Chat Area -->
	<div class="flex-1 flex flex-col">
		<!-- Chat Header -->
		<div class="border-b border-border p-4 flex items-center justify-between">
			<h1 class="text-lg font-semibold">Welcome to WeYap</h1>
		</div>

		<!-- Messages Area -->
		<div class="flex-1 overflow-auto p-8 flex items-center justify-center">
			<Card.Root class="w-full max-w-md border border-border text-center p-8">
				<MessageCircle class="h-12 w-12 mx-auto mb-4 text-primary" />
				<Card.Title class="text-xl mb-2">Start a conversation</Card.Title>
				<Card.Description class="mb-4">
					Select a conversation or create a new one to get started
				</Card.Description>
				<Button.Root class="w-full">
					<Plus class="h-4 w-4 mr-2" />
					Start New Chat
				</Button.Root>
			</Card.Root>
		</div>

		<!-- Message Input -->
		<div class="border-t border-border p-4">
			<div class="flex gap-2">
				<input
					type="text"
					placeholder="Type a message..."
					class="flex-1 rounded-lg border border-border bg-card px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
					disabled
				/>
				<Button.Root disabled>Send</Button.Root>
			</div>
		</div>
	</div>
</div>

<svelte:head>
	<title>Chat - WeYap</title>
</svelte:head>

<div class="min-h-screen bg-background flex">
	<!-- Sidebar -->
	<div class="w-64 border-r border-border bg-card flex flex-col">
		<!-- Header -->
		<div class="border-b border-border p-4">
			<div class="flex items-center gap-2 mb-4">
				<MessageCircle class="h-6 w-6 text-primary" />
				<span class="text-lg font-bold">WeYap</span>
			</div>
			<Button.Root class="w-full h-10" size="sm">
				<Plus class="h-4 w-4 mr-2" />
				New Chat
			</Button.Root>
		</div>

		<!-- Conversations List -->
		<div class="flex-1 overflow-auto p-4">
			<p class="text-sm text-muted-foreground">No conversations yet</p>
		</div>

		<!-- Footer -->
		<div class="border-t border-border p-4 space-y-2">
			<div class="p-3 rounded-lg bg-secondary">
				<p class="text-sm font-medium">{data.user.name}</p>
				<p class="text-xs text-muted-foreground">{data.user.email}</p>
			</div>
			<div class="flex gap-2">
				<Button.Root variant="outline" size="sm" class="flex-1 h-10">
					<Settings class="h-4 w-4" />
				</Button.Root>
				<Button.Root variant="outline" size="sm" class="flex-1 h-10">
					<LogOut class="h-4 w-4" />
				</Button.Root>
			</div>
		</div>
	</div>

	<!-- Main Chat Area -->
	<div class="flex-1 flex flex-col">
		<!-- Chat Header -->
		<div class="border-b border-border p-4 flex items-center justify-between">
			<h1 class="text-lg font-semibold">Welcome to WeYap</h1>
		</div>

		<!-- Messages Area -->
		<div class="flex-1 overflow-auto p-8 flex items-center justify-center">
			<Card.Root class="w-full max-w-md border border-border text-center p-8">
				<MessageCircle class="h-12 w-12 mx-auto mb-4 text-primary" />
				<Card.Title class="text-xl mb-2">Start a conversation</Card.Title>
				<Card.Description class="mb-4">
					Select a conversation or create a new one to get started
				</Card.Description>
				<Button.Root class="w-full">
					<Plus class="h-4 w-4 mr-2" />
					Start New Chat
				</Button.Root>
			</Card.Root>
		</div>

		<!-- Message Input -->
		<div class="border-t border-border p-4">
			<div class="flex gap-2">
				<input
					type="text"
					placeholder="Type a message..."
					class="flex-1 rounded-lg border border-border bg-card px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
					disabled
				/>
				<Button.Root disabled>Send</Button.Root>
			</div>
		</div>
	</div>
</div>
