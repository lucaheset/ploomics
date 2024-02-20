import { create } from "zustand";

export interface AuthProps {
    isAuthenticated: boolean,
    setIsAuthenticated: (isAuthenticated: boolean) => void
}

export const useAuth = create<AuthProps>((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated })
}))