import { useStore } from "@/store/store"

export function useAuthHeader() {
    const token = useStore(state => state.token);
    return {
        headers: { Authorization: `Token ${token}` },
    }
}