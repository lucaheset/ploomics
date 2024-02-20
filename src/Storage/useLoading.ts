import { create } from "zustand";

export interface LoadingProps {
    isLoading: boolean,
    setIsLoading: (isLoading: boolean) => void 
}

export const useLoading = create<LoadingProps>((set) => ({
    isLoading: true,
    setIsLoading: (isLoading: boolean) => set({isLoading}),
}))