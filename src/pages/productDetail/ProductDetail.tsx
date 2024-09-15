import Header from "@/components/header/Header";
import useUserStore from "@/zustand/bearsStore";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { doc, deleteDoc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db, storage, auth } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";
import { useEffect, useState } from "react";

const ProductDetail = () => {
    const { goods } = useUserStore();
    const { ProductUid } = useParams();
    const FoundGoods = goods.find(item => item.ProductUid === ProductUid);
    const userUid = auth.currentUser?.uid;
    const navigate = useNavigate();

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const checkLikeStatus = async () => {
            if (userUid && ProductUid) {
                const likeRef = doc(db, "likes", `${userUid}_${ProductUid}`);
                const likeDoc = await getDoc(likeRef);
                if (likeDoc.exists()) {
                    setClicked(likeDoc.data().like);
                }
            }
        };

        checkLikeStatus();
    }, [userUid, ProductUid]);


    const ProductDeleteButton = async (e: any) => {
        e.preventDefault();
        try {
            if (confirm("정말 삭제하시겠습니까?") === true) {
                await deleteDoc(doc(db, "goods", ProductUid!));
                const imageRef = ref(storage, FoundGoods?.ProductURL);
                await deleteObject(imageRef);
                navigate("/");
            } else {
                return;
            }
        } catch (error) {
            console.log("삭제를 실패하였습니다", error);
        }
    };

    const onClickLikeButton = async (e: any) => {
        e.preventDefault();
        if (!userUid || !ProductUid) {
            alert("로그인이 필요합니다.");
            return;
        }
        const likeRef = doc(db, "likes", `${userUid}_${ProductUid}`);
        try {
            const likeDoc = await getDoc(likeRef);
            if (likeDoc.exists()) {
                await updateDoc(likeRef, {
                    like: !clicked,
                });
            } else {
                await setDoc(likeRef, {
                    userUid,
                    ProductUid,
                    like: true,
                });
            }
            setClicked(!clicked);
        } catch (error) {
            console.log("좋아요 처리 중 오류 발생:", error);
        }
    };

    const onClickMyPockeyButton = async (e: any) => {
        e.preventDefault();
        const pocketRef = doc(db, "pocket", `${userUid}_${ProductUid}`);
        try {
            if (FoundGoods && FoundGoods.ProductName) {
                await setDoc(pocketRef, {
                    ProductName: FoundGoods.ProductName,
                    ProductUid: ProductUid,
                    ProductPrice:FoundGoods.ProductPrice
                });
                console.log("포켓에 저장되었습니다.");
                alert("장바구니 담기 완료!")
            } else {
                console.error("FoundGoods 또는 FoundGoods.ProductName이 유효하지 않습니다.");
            }
        } catch (error) {
            console.error("포켓에 저장 중 오류 발생:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="w-[60%] mx-auto mt-[40px]">
                {FoundGoods ? (
                    <div className="flex">
                        <img src={FoundGoods.ProductURL} className="aspect-1/1 w-[60%] mr-4" alt={FoundGoods.ProductName} />
                        <div className="mt-[60px]">
                            <div className="font-bold text-3xl mb-10">{FoundGoods.ProductName}</div>
                            <div className="font-bold text-3xl">{FoundGoods.ProductPrice}원</div>
                            <div className="font-bold text-3xl mb-10">{FoundGoods.ProductDescription}</div>
                            {FoundGoods.UserUid === userUid ? (
                                <div className="mb-3">
                                    <Button className="mr-3" onClick={() => navigate(`/retouchProduct/${ProductUid}`)}>수정하기</Button>
                                    <Button onClick={ProductDeleteButton}>삭제하기</Button>
                                </div>
                            ) : null}
                            <div className="flex">
                                <img
                                    src={clicked ? "/free-icon-hearts-138533.png" : "/free-icon-heart-1077035.png"}
                                    className="aspect-1/1 w-[40px] mr-3"
                                    onClick={onClickLikeButton}
                                    alt="찜하기 아이콘"
                                />
                                <Button className="mr-3">구매하기</Button>
                                <Button onClick={onClickMyPockeyButton}>장바구니</Button>
                            </div>
                        </div>
                    </div>
                ) : (alert("상품 정보를 불러올 수 없습니다"))}
            </div>
        </>
    );
};

export default ProductDetail;