import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';

interface User {
    date: string;
    email: string;
    name: string;
    number: string;
    uid: string;
    seller: boolean |string;
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
    goods: GoodsItem[];
    setUser: (userData: User) => void;
    setGoods: (goodsData: GoodsItem) => void;
    updateGoods: (updatedGoods: GoodsItem) => void;
    updateUser: (updatedUser: User) => void;
}

const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: [],
            goods: [],
            setUser: (userData: User) => set((state) =>
                ({ user: [...state.user, userData] })),
            setGoods: (goodsData: GoodsItem) => set((state) =>
                ({ goods: [...state.goods, goodsData] })),
            updateGoods: (updatedGoods: GoodsItem) => set((state) => ({
                goods: state.goods.map((item) =>
                    item.ProductUid === updatedGoods.ProductUid ? updatedGoods : item
                ),
            })),
            updateUser: (updatedUser: User) => set((state) => ({
                user: state.user.map((item) =>
                    item.uid === updatedUser.uid ? updatedUser : item
                ),
            })),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useUserStore;