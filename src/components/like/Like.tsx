import { db, auth } from "@/firebase";
import { updateDoc, setDoc, getDoc, doc } from "firebase/firestore";
import { useState } from "react";
import useUserStore from "@/zustand/bearsStore";
import { useEffect } from "react";

const Like = ({ ProductUid }: { ProductUid?: string }) => {
    const { goods } = useUserStore();
    const FoundGoods = goods.find((item) => item.ProductUid === ProductUid);

    const [clicked, setClicked] = useState(false);
    const userUid = auth.currentUser?.uid;


    const fetchLikeStatus = async () => {
        if (!userUid || !ProductUid || !FoundGoods) return;

        const likeRef = doc(db, "likes", userUid);
        try {
            const likeDoc = await getDoc(likeRef);
            if (likeDoc.exists()) {
                const likeProducts = likeDoc.data().ProductName || {};
                if (likeProducts[FoundGoods.ProductUid]) {
                    setClicked(true);
                }
            }
        } catch (error) {
            console.log("좋아요 상태 불러오기 중 오류 발생:", error);
        }
    };

    useEffect(() => {
        fetchLikeStatus();
    }, [ProductUid, userUid]);

    const onClickLikeButton = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();
        if (!userUid || !ProductUid || !FoundGoods) {
            alert("로그인이 필요합니다.");
            return;
        }
        const likeRef = doc(db, "likes", userUid);
        try {
            const likeDoc = await getDoc(likeRef);
            if (likeDoc.exists()) {
                const likeProducts = likeDoc.data().ProductName || {};
                if (likeProducts[FoundGoods.ProductUid]) {
                    delete likeProducts[FoundGoods.ProductUid];
                    await updateDoc(likeRef, { ProductName: likeProducts });
                } else {
                    likeProducts[FoundGoods.ProductUid] = {
                        ProductName: FoundGoods.ProductName,
                        ProductUid: FoundGoods.ProductUid,
                        userUid: userUid,
                    };
                    await updateDoc(likeRef, { ProductName: likeProducts });
                }
            } else {
                await setDoc(likeRef, {
                    ProductName: {
                        [FoundGoods.ProductUid]: {
                            ProductName: FoundGoods.ProductName,
                            ProductUid: FoundGoods.ProductUid,
                            userUid: userUid,
                        },
                    },
                });
            }
            setClicked(!clicked);
        } catch (error) {
            console.log("좋아요 처리 중 오류 발생:", error);
        }
    };

    return (
        <img
            src={clicked ? "/free-icon-hearts-138533.png" : "/free-icon-heart-1077035.png"}
            className="aspect-1/1 w-[40px] h-[40px] ml-[100px]"
            onClick={onClickLikeButton}
            alt="찜하기 아이콘"
        />
    );
};

export default Like;