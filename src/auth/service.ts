import { create } from 'zustand';
import { User } from '@/types/auction.types';
import { useWebSocketStore } from '@/websocket/service';
import { ROUTES } from '@/constants';

interface AuthStore {
    token: string | null;
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    signup: (email: string, password: string, name: string) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') as string) as User : null,
    loading: false,

    login: async (email: string, password: string) => {
        set({ loading: true });
        try {
            const response = await fetch(ROUTES.AUTH.LOGIN, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error('Login failed');

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            set({ token: data.token, user: data.user, loading: false });

            // Connect WebSocket after successful login
            useWebSocketStore.getState().connect(data.token);

        } catch (error) {
            set({ loading: false });
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ token: null, user: null });
        useWebSocketStore.getState().disconnect();
    },

    signup: async (email: string, password: string, name: string) => {
        set({ loading: true });
        try {
            const response = await fetch(ROUTES.AUTH.SIGNUP, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name }),
            });

            if (!response.ok) throw new Error('Signup failed');

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            set({ token: data.token, user: data.user, loading: false });

            useWebSocketStore.getState().connect(data.token);

        } catch (error) {
            set({ loading: false });
            throw error;
        }
    },
}));