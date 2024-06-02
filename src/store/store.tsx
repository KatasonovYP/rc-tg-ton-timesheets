import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface StoreValues {
    token: string;
    setToken: (token: string) => void;
}

export const useStore = create(
    persist<StoreValues>(
        (set) => ({
            token: '',
            setToken: (token) => set({ token }),
        }),
        {
            name: 'auth-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)