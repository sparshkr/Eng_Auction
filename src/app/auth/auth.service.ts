
// src/lib/auth/auth.service.ts
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
    user: null,
    loading: false,
  
    login: async (email: string, password: string) => {
      set({ loading: true });
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
  
        if (!response.ok) throw new Error('Login failed');
  
        const data = await response.json();
        localStorage.setItem('token', data.token);
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
      set({ token: null, user: null });
      useWebSocketStore.getState().disconnect();
    },
  
    signup: async (email: string, password: string, name: string) => {
      set({ loading: true });
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        });
  
        if (!response.ok) throw new Error('Signup failed');
  
        const data = await response.json();
        localStorage.setItem('token', data.token);
        set({ token: data.token, user: data.user, loading: false });
        
        // Connect WebSocket after successful signup
        useWebSocketStore.getState().connect(data.token);
        
      } catch (error) {
        set({ loading: false });
        throw error;
      }
    },
  }));