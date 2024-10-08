import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';

export interface User {
    date: string;
    email: string;
    name: string;
    number: string;
    uid: string | undefined;
    seller: boolean
    addresses: any
}

export interface GoodsItem {
    ProductDescription: string;
    ProductName: string;
    ProductPrice: string | undefined;
    ProductURL: string;
    UserUid: string | undefined;
    ProductUid: string;
    ProductQuantity: number;
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
    ProductQuantity: number
    userUid: string
    ProductURL: string
}

interface UserStore {
    user: User[];
    goods: GoodsItem[];
    like: ProductLike[];
    search: GoodsItem[];
    selectedItems: ProductPocket[];
    setUser: (userData: User) => void;
    setGoods: (goodsData: GoodsItem[]) => void;
    setLike: (likeData: ProductLike) => void;
    clearUser: () => void,
    updateGoods: (updatedGoods: GoodsItem) => void;
    updateUser: (updatedUser: User) => void;
    setSearch: (searchData: GoodsItem[]) => void;
    setSelectedItems: (items: ProductPocket[]) => void
}

const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: [],
            goods: [],
            like: [],
            search: [],
            selectedItems: [],
            setUser: (userData: User) => set(() => ({ user: [userData] })),
            setGoods: (goodsData: GoodsItem[]) => set(() => ({
                goods: goodsData,
            })),
            updateGoods: (updatedGoods: GoodsItem) => set((state) => ({
                goods: state.goods.map((item) =>
                    item.ProductUid === updatedGoods.ProductUid ? updatedGoods : item
                ),
            })),
            clearUser: () => set(() => ({ user: [] })),
            updateUser: (updatedUser: User) => set((state) => ({
                user: state.user.map((item) =>
                    item.uid === updatedUser.uid ? updatedUser : item
                ),
            })),
            setLike: (likeData: ProductLike) => set((state) => ({
                like: [...state.like, likeData],
            })),
            setSearch: (searchData: GoodsItem[]) => set(() => ({
                search: searchData,
            })),
            setSelectedItems: (items) => set(() => ({
                selectedItems: items,
            })),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useUserStore;