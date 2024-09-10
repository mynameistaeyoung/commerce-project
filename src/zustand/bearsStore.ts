import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';

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
    user: User[];  // 여러 사용자를 배열로 저장
    setUser: (userData: User) => void;
    goods: GoodsItem[];
    setGoods: (goodsData: GoodsItem) => void;
}

const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: [],
            goods: [],
            setUser: (userData: User) => set((state) => ({ user: [...state.user, userData] })),  // 새로운 유저 데이터를 배열에 추가
            setGoods: (goodsData: GoodsItem) => set((state) => ({ goods: [...state.goods, goodsData] }))  // 새로운 상품 데이터를 배열에 추가
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useUserStore;