<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Button from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { MessageCircle, Zap, Lock, Users, Smartphone, Shield } from 'lucide-svelte';

	const features = [
		{
			icon: MessageCircle,
			title: 'Realtime Messaging',
			description: 'Instant message delivery with real-time notifications'
		},
		{
			icon: Zap,
			title: 'Lightning Fast',
			description: 'Built with SvelteKit and Bun for peak performance'
		},
		{
			icon: Lock,
			title: 'Secure & Private',
			description: 'End-to-end encryption for all your conversations'
		},
		{
			icon: Users,
			title: 'Group Chats',
			description: 'Create groups and collaborate with teams seamlessly'
		},
		{
			icon: Smartphone,
			title: 'Cross-Device Sync',
			description: 'Access your chats from any device, any time'
		},
		{
			icon: Shield,
			title: 'Enterprise Auth',
			description: 'Secure authentication with OAuth and more'
		}
	];
</script>

<svelte:head>
	<title>WeYap - Modern Chat for the Modern Age</title>
	<meta name="description" content="Private conversations made simple. Fast, modern, realtime messaging." />
</svelte:head>

<div class="min-h-screen bg-background">
	<!-- Navigation -->
	<nav class="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center gap-2">
					<MessageCircle class="h-6 w-6 text-primary" />
					<span class="text-xl font-bold text-foreground">WeYap</span>
				</div>
				<div class="flex gap-2 sm:gap-4">
					<Button.Root variant="ghost" on:click={() => goto('/demo/better-auth/login')}>Sign In</Button.Root>
					<Button.Root on:click={() => goto('/demo/better-auth/register')}>Get Started</Button.Root>
				</div>
			</div>
		</div>
	</nav>

	<!-- Hero Section -->
	<section class="relative overflow-hidden px-4 py-16 sm:py-24 lg:py-32 animate-fade-in">
		<div class="mx-auto max-w-7xl">
			<div class="grid gap-8 lg:grid-cols-2 lg:gap-12">
				<!-- Left Column: Text Content -->
				<div class="flex flex-col justify-center animate-slide-in-up">
					<h1 class="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
						Private conversations made
						<span class="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
							simple
						</span>
					</h1>
					<p class="mt-6 text-lg text-muted-foreground sm:text-xl">
						Fast, modern, realtime messaging. Chat with anyone, anywhere. Secure by default.
					</p>
					<div class="mt-8 flex flex-col gap-4 sm:flex-row">
						<Button.Root size="lg" on:click={() => goto('/demo/better-auth/register')} class="hover-scale">
							Start Chatting Free
						</Button.Root>
						<Button.Root size="lg" variant="outline" on:click={() => goto('/demo/better-auth/login')} class="hover-scale">
							Sign In
						</Button.Root>
					</div>
				</div>

				<!-- Right Column: Chat Preview -->
				<div class="relative hidden lg:flex animate-slide-in-down">
					<div class="w-full rounded-lg border border-border bg-card p-4 shadow-lg hover-scale">
						<div class="space-y-4">
							<div class="flex items-center gap-3 border-b border-border pb-4">
								<div class="h-10 w-10 rounded-full bg-primary/20" />
								<div class="flex-1">
									<p class="text-sm font-medium">WeYap Team</p>
									<p class="text-xs text-muted-foreground">Online now</p>
								</div>
							</div>
							<div class="space-y-3">
								<div class="flex justify-start">
									<div class="max-w-xs rounded-lg bg-secondary px-4 py-2">
										<p class="text-sm">Hey! Welcome to WeYap 👋</p>
									</div>
								</div>
								<div class="flex justify-end">
									<div class="max-w-xs rounded-lg bg-primary px-4 py-2">
										<p class="text-sm text-primary-foreground">This looks amazing!</p>
									</div>
								</div>
								<div class="flex justify-start">
									<div class="max-w-xs rounded-lg bg-secondary px-4 py-2">
										<p class="text-sm">Start your first conversation now</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="border-y border-border bg-secondary/30 px-4 py-16 sm:py-24">
		<div class="mx-auto max-w-7xl">
			<div class="text-center">
				<h2 class="text-3xl font-bold text-foreground sm:text-4xl">Everything you need</h2>
				<p class="mt-4 text-lg text-muted-foreground">
					Powerful features designed for modern communication
				</p>
			</div>
			<div class="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{#each features as feature}
					<Card.Root class="border border-border bg-card p-6">
						<div class="flex items-start gap-4">
							<div class="rounded-lg bg-primary/10 p-3">
								<svelte:component this={feature.icon} class="h-6 w-6 text-primary" />
							</div>
							<div>
								<h3 class="font-semibold text-foreground">{feature.title}</h3>
								<p class="mt-2 text-sm text-muted-foreground">{feature.description}</p>
							</div>
						</div>
					</Card.Root>
				{/each}
			</div>
		</div>
	</section>

	<!-- Why WeYap Section -->
	<section class="px-4 py-16 sm:py-24 lg:py-32">
		<div class="mx-auto max-w-7xl">
			<div class="grid gap-12 lg:grid-cols-2">
				<div>
					<h2 class="text-3xl font-bold text-foreground sm:text-4xl">Why choose WeYap?</h2>
					<p class="mt-4 text-lg text-muted-foreground">
						We're built on modern technologies and designed with user experience at the forefront.
					</p>
					<div class="mt-8 space-y-6">
						<div>
							<h3 class="font-semibold text-foreground">Built for Speed</h3>
							<p class="mt-2 text-sm text-muted-foreground">
								Powered by Bun and SvelteKit for lightning-fast performance
							</p>
						</div>
						<div>
							<h3 class="font-semibold text-foreground">Always Secure</h3>
							<p class="mt-2 text-sm text-muted-foreground">
								Your conversations are encrypted and your data is yours alone
							</p>
						</div>
						<div>
							<h3 class="font-semibold text-foreground">Modern Design</h3>
							<p class="mt-2 text-sm text-muted-foreground">
								Beautiful, minimal interface that feels premium and responsive
							</p>
						</div>
					</div>
				</div>
				<div class="rounded-lg border border-border bg-secondary/50 p-8">
					<div class="space-y-4">
						<div class="h-12 w-full rounded bg-border/50" />
						<div class="h-8 w-3/4 rounded bg-border/50" />
						<div class="space-y-3">
							<div class="h-4 w-full rounded bg-border/30" />
							<div class="h-4 w-5/6 rounded bg-border/30" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="border-t border-border bg-card px-4 py-16 sm:py-24">
		<div class="mx-auto max-w-4xl text-center">
			<h2 class="text-3xl font-bold text-foreground sm:text-4xl">Ready to chat?</h2>
			<p class="mt-4 text-lg text-muted-foreground">
				Join thousands of users enjoying secure, fast messaging
			</p>
			<div class="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
				<Button.Root size="lg" on:click={() => goto('/demo/better-auth/register')}>
					Create Your Account
				</Button.Root>
				<Button.Root size="lg" variant="outline" on:click={() => goto('/demo/better-auth/login')}>
					Already have an account?
				</Button.Root>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="border-t border-border bg-secondary/50 px-4 py-12 sm:py-16">
		<div class="mx-auto max-w-7xl">
			<div class="grid gap-8 sm:grid-cols-4">
				<div>
					<h3 class="font-semibold text-foreground">WeYap</h3>
					<p class="mt-2 text-sm text-muted-foreground">Modern messaging for everyone</p>
				</div>
				<div>
					<h4 class="text-sm font-semibold text-foreground">Product</h4>
					<ul class="mt-4 space-y-2 text-sm text-muted-foreground">
						<li><a href="#" class="hover:text-foreground">Features</a></li>
						<li><a href="#" class="hover:text-foreground">Pricing</a></li>
						<li><a href="#" class="hover:text-foreground">Security</a></li>
					</ul>
				</div>
				<div>
					<h4 class="text-sm font-semibold text-foreground">Company</h4>
					<ul class="mt-4 space-y-2 text-sm text-muted-foreground">
						<li><a href="#" class="hover:text-foreground">About</a></li>
						<li><a href="#" class="hover:text-foreground">Blog</a></li>
						<li><a href="#" class="hover:text-foreground">Contact</a></li>
					</ul>
				</div>
				<div>
					<h4 class="text-sm font-semibold text-foreground">Legal</h4>
					<ul class="mt-4 space-y-2 text-sm text-muted-foreground">
						<li><a href="#" class="hover:text-foreground">Privacy</a></li>
						<li><a href="#" class="hover:text-foreground">Terms</a></li>
						<li><a href="#" class="hover:text-foreground">Status</a></li>
					</ul>
				</div>
			</div>
			<Separator class="my-8" />
			<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
				<p class="text-sm text-muted-foreground">&copy; 2026 WeYap. All rights reserved.</p>
				<div class="flex gap-6 text-sm text-muted-foreground">
					<a href="#" class="hover:text-foreground">Twitter</a>
					<a href="#" class="hover:text-foreground">GitHub</a>
					<a href="#" class="hover:text-foreground">Discord</a>
				</div>
			</div>
		</div>
	</footer>
</div>
