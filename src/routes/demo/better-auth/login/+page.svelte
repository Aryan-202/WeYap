<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Button from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Input from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import { Eye, EyeOff, CheckCircle2, Circle } from 'lucide-svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let activeTab = $state('login');
	let showPassword = $state(false);
	let showConfirmPassword = $state(false);
	let loginEmail = $state('');
	let loginPassword = $state('');
	let registerEmail = $state('');
	let registerName = $state('');
	let registerPassword = $state('');
	let confirmPassword = $state('');

	const passwordStrength = $derived.by(() => {
		let strength = 0;
		if (registerPassword.length >= 8) strength++;
		if (/[A-Z]/.test(registerPassword)) strength++;
		if (/[0-9]/.test(registerPassword)) strength++;
		if (/[^A-Za-z0-9]/.test(registerPassword)) strength++;
		return strength;
	});

	const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
	const strengthColors = ['bg-destructive', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-600'];
	const strengthLabel = $derived.by(() => {
		if (registerPassword.length === 0) return '';
		return strengthLabels[passwordStrength] || 'Very Strong';
	});

	const strengthColor = $derived.by(() => {
		if (registerPassword.length === 0) return '';
		return strengthColors[passwordStrength] || 'bg-green-600';
	});

	const passwordsMatch = $derived(registerPassword === confirmPassword && registerPassword.length > 0);
	const hasMinLength = $derived(registerPassword.length >= 8);
</script>

<svelte:head>
	<title>Sign In - WeYap</title>
</svelte:head>

<div class="min-h-screen bg-background flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
	<Card.Root class="w-full max-w-md border border-border bg-card">
		<Card.Header class="space-y-2">
			<Card.Title class="text-2xl font-bold">Welcome to WeYap</Card.Title>
			<Card.Description>
				Fast, secure messaging for everyone
			</Card.Description>
		</Card.Header>

		<Card.Content class="space-y-4">
			{#if form?.message}
				<div class="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
					{form.message}
				</div>
			{/if}

			<Tabs.Root value={activeTab} onValueChange={(val) => activeTab = val}>
				<Tabs.List class="grid w-full grid-cols-2">
					<Tabs.Trigger value="login">Sign In</Tabs.Trigger>
					<Tabs.Trigger value="register">Create Account</Tabs.Trigger>
				</Tabs.List>

				<!-- Login Tab -->
				<Tabs.Content value="login" class="space-y-4 mt-4">
					<form method="post" action="?/signInEmail" use:enhance class="space-y-4">
						<div class="space-y-2">
							<label for="loginEmail" class="text-sm font-medium text-foreground">
								Email
							</label>
							<Input.Root
								id="loginEmail"
								name="email"
								type="email"
								placeholder="you@example.com"
								bind:value={loginEmail}
								class="h-10"
								required
							/>
						</div>

						<div class="space-y-2">
							<div class="flex items-center justify-between">
								<label for="loginPassword" class="text-sm font-medium text-foreground">
									Password
								</label>
								<a href="#" class="text-xs text-primary hover:underline">
									Forgot password?
								</a>
							</div>
							<div class="relative">
								<Input.Root
									id="loginPassword"
									name="password"
									type={showPassword ? 'text' : 'password'}
									placeholder="Your password"
									bind:value={loginPassword}
									class="h-10 pr-10"
									required
								/>
								<button
									type="button"
									on:click={() => (showPassword = !showPassword)}
									class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
								>
									{#if showPassword}
										<EyeOff class="h-4 w-4" />
									{:else}
										<Eye class="h-4 w-4" />
									{/if}
								</button>
							</div>
						</div>

						<div class="flex items-center gap-2">
							<input
								type="checkbox"
								id="rememberMe"
								name="rememberMe"
								class="h-4 w-4 rounded border border-border"
							/>
							<label for="rememberMe" class="text-sm text-muted-foreground">
								Remember me
							</label>
						</div>

						<Button.Root type="submit" class="w-full h-10">
							Sign In
						</Button.Root>
					</form>
				</Tabs.Content>

				<!-- Register Tab -->
				<Tabs.Content value="register" class="space-y-4 mt-4">
					<form method="post" action="?/signUpEmail" use:enhance class="space-y-4">
						<div class="space-y-2">
							<label for="registerEmail" class="text-sm font-medium text-foreground">
								Email
							</label>
							<Input.Root
								id="registerEmail"
								name="email"
								type="email"
								placeholder="you@example.com"
								bind:value={registerEmail}
								class="h-10"
								required
							/>
						</div>

						<div class="space-y-2">
							<label for="registerName" class="text-sm font-medium text-foreground">
								Full Name
							</label>
							<Input.Root
								id="registerName"
								name="name"
								type="text"
								placeholder="Your name"
								bind:value={registerName}
								class="h-10"
								required
							/>
						</div>

						<div class="space-y-2">
							<label for="registerPassword" class="text-sm font-medium text-foreground">
								Password
							</label>
							<div class="relative">
								<Input.Root
									id="registerPassword"
									name="password"
									type={showPassword ? 'text' : 'password'}
									placeholder="Create a strong password"
									bind:value={registerPassword}
									class="h-10 pr-10"
									required
								/>
								<button
									type="button"
									on:click={() => (showPassword = !showPassword)}
									class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
								>
									{#if showPassword}
										<EyeOff class="h-4 w-4" />
									{:else}
										<Eye class="h-4 w-4" />
									{/if}
								</button>
							</div>

							{#if registerPassword.length > 0}
								<div class="space-y-2">
									<div class="h-2 w-full rounded-full bg-border overflow-hidden">
										<div
											class="h-full transition-all duration-300 {strengthColor}"
											style="width: {(passwordStrength + 1) * 20}%"
										/>
									</div>
									<div class="flex items-center justify-between text-xs">
										<span class="text-muted-foreground">Strength: {strengthLabel}</span>
									</div>
								</div>
							{/if}
						</div>

						<div class="space-y-2">
							<label for="confirmPassword" class="text-sm font-medium text-foreground">
								Confirm Password
							</label>
							<div class="relative">
								<Input.Root
									id="confirmPassword"
									type={showConfirmPassword ? 'text' : 'password'}
									placeholder="Confirm your password"
									bind:value={confirmPassword}
									class="h-10 pr-10"
									required
								/>
								<button
									type="button"
									on:click={() => (showConfirmPassword = !showConfirmPassword)}
									class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
								>
									{#if showConfirmPassword}
										<EyeOff class="h-4 w-4" />
									{:else}
										<Eye class="h-4 w-4" />
									{/if}
								</button>
							</div>

							{#if registerPassword.length > 0}
								<div class="flex items-center gap-2 text-xs">
									{#if passwordsMatch}
										<CheckCircle2 class="h-4 w-4 text-green-500" />
										<span class="text-green-600">Passwords match</span>
									{:else if confirmPassword.length > 0}
										<Circle class="h-4 w-4 text-destructive" />
										<span class="text-destructive">Passwords don't match</span>
									{/if}
								</div>
							{/if}
						</div>

						<div class="flex items-start gap-3">
							<input
								type="checkbox"
								id="terms"
								name="terms"
								class="h-4 w-4 rounded border border-border mt-1"
								required
							/>
							<label for="terms" class="text-sm text-muted-foreground">
								I agree to the <a href="#" class="text-primary hover:underline">Terms of Service</a> and
								<a href="#" class="text-primary hover:underline">Privacy Policy</a>
							</label>
						</div>

						<Button.Root type="submit" class="w-full h-10" disabled={!passwordsMatch || !hasMinLength}>
							Create Account
						</Button.Root>
					</form>
				</Tabs.Content>
			</Tabs.Root>

			<Separator />

			<!-- OAuth Section -->
			<div class="space-y-3">
				<p class="text-center text-xs text-muted-foreground">Or continue with</p>
				<form method="post" action="?/signInSocial" use:enhance>
					<input type="hidden" name="provider" value="github" />
					<input type="hidden" name="callbackURL" value="/" />
					<Button.Root type="submit" variant="outline" class="w-full h-10">
						GitHub
					</Button.Root>
				</form>
			</div>
		</Card.Content>
	</Card.Root>
</div>

