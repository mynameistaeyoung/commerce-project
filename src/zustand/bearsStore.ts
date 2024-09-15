import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';

export interface User {
    date: string;
    email: string;
    name: string;
    number: string;
    uid: string;
    seller: boolean | string;
}

export interface GoodsItem {
    ProductDescription: string;
    ProductName: string;
    ProductPrice: string;
    ProductURL: string;
    UserUid: string | undefined;
    ProductUid: string;
}

export interface ProductLike {
    ProductUid: string;
    like: boolean;
    userUid: string
}

export interface ProductPocket {
    ProductName: string;
    ProductUid: string;
    ProductPrice: string | number
}

interface UserStore {
    user: User[];  // 여러 사용자를 배열로 저장
    goods: GoodsItem[];
    like: ProductLike[]
    pocket: ProductPocket[]
    setUser: (userData: User) => void;
    setGoods: (goodsData: GoodsItem) => void;
    setLike: (likeData: ProductLike) => void
    updateGoods: (updatedGoods: GoodsItem) => void;
    updateUser: (updatedUser: User) => void;
    setPocket: (pocketData: ProductPocket) => void
}

const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: [],
            goods: [],
            like: [],
            pocket: [],
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
            setLike: (likeData: ProductLike) => set((state) =>
                ({ like: [...state.like, likeData] })),
            setPocket: (pocketData: ProductPocket) => set((state) =>
                ({ pocket: [...state.pocket, pocketData] })),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useUserStore;