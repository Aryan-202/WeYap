// Auth store - manages user authentication state
import { writable } from 'svelte/store';
import type { User } from 'better-auth';

interface AuthState {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
}

function createAuthStore() {
	const { subscribe, set, update } = writable<AuthState>({
		user: null,
		isLoading: true,
		isAuthenticated: false
	});

	return {
		subscribe,
		setUser: (user: User | null) => {
			update(state => ({
				...state,
				user,
				isAuthenticated: !!user,
				isLoading: false
			}));
		},
		setLoading: (isLoading: boolean) => {
			update(state => ({
				...state,
				isLoading
			}));
		},
		reset: () => {
			set({
				user: null,
				isLoading: false,
				isAuthenticated: false
			});
		}
	};
}

export const authStore = createAuthStore();
