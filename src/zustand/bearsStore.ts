import { create } from "zustand";

interface User {
    date: string;
    email: string;
    name: string;
    number: string;
    uid: string;
    seller: boolean;
}

export interface GoodsItem {
    ProductDescription: string;
    ProductName: string;
    ProductPrice: string;
    ProductURL: string;
    UserUid: string | undefined;
    ProductUid: string | undefined;
}

interface UserStore {
    user: User[]; // 수정된 부분
    setUser: (userData: User) => void;
    goods: GoodsItem[];
    setGoods: (goodsData: GoodsItem) => void
}


const useUserStore = create<UserStore>((set) => ({
    user: [],
    goods: [],
    setUser: (userData: User) => set((state) => ({ user: [...state.user, userData] })),
    setGoods: (goodsData: GoodsItem) => set((state) => ({ goods: [...state.goods, goodsData] }))
}));

export default useUserStore;