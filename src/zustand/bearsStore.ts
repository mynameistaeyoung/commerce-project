import { create } from "zustand";

interface User {
    date: string;
    email: string;
    name: string;
    number: string;
    uid: string;
    seller: boolean;
}

interface UserStore {
    user: User[]; // 수정된 부분
    setUser: (userData: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: [],
    setUser: (userData: User) => set((state) => ({ user: [...state.user, userData] })),
}));

export default useUserStore;