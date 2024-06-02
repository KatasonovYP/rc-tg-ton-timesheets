import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface StoreValues {
    token: string;
    username?: string;
    email?: string;

    recordId?: string;
    startWorkTime?: number;
    
    setToken: (token: string) => void;
    setEmail: (email: string) => void;
    setUsername: (username: string) => void;
    setStartWorkTime: (startWorkTime?: number) => void;

    setRecordId: (workId?: string) => void;

    isStaff: () => boolean;
    isAuth: () => boolean;
    logout: () => void;
}

export const useStore = create(
    persist<StoreValues>(
        (set, get) => ({
            token: '',
            setToken: (token) => set({ token }),
            setUsername: (username) => set({ username }),
            setEmail: (email) => set({ email }),
            setRecordId: (recordId) => set({ recordId }),
            setStartWorkTime: (startWorkTime) => set({ startWorkTime }),

            isAuth: () => !!get().token,
            isStaff: () => get().email === 'admin@admin.com',
            logout: () => get().setToken(''),
        }),
        {
            name: 'auth-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)