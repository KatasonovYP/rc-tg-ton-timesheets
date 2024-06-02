import { useStore } from "@/store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useGuard() {
    const navigate = useNavigate();
    const isAuth = useStore(state => state.isAuth);
    const token = useStore(state => state.token);
    useEffect(() => {
        if (!isAuth()) {
            navigate('/');
        }
    }, [token])
}