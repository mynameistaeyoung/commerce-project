import useUserStore from "@/zustand/bearsStore";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Button } from "../ui/button";

interface CartProps {
    quantity: number
    productAllPrice: number | string | undefined
    css: string
    cartMsg: string
    cartImg: string
    productUid:string
}

const Cart = ({ quantity, productAllPrice, css, cartMsg, cartImg,productUid }: CartProps) => {
    const { goods, user } = useUserStore();
    const FoundGoods = goods.find(item => item.ProductUid === productUid);
    const userUid = user.length > 0 ? user[0].uid : null;

    const onClickMtPocketButton = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();
        if (!userUid || !FoundGoods) {
            alert("로그인이 필요한 서비스입니다")
            console.error("유저가 없거나 상품이 유효하지 않습니다.");
            return;
        }
        if (quantity > FoundGoods.ProductQuantity) {
            alert(`현재 재고(${FoundGoods.ProductQuantity}개)보다 많은 수량을 담을 수 없습니다.`);
            return;
        }
        const pocketRef = doc(db, "pocket", userUid);
        try {
            const pocketDoc = await getDoc(pocketRef);
            if (pocketDoc.exists()) {
                const existingProducts = pocketDoc.data().Products || {};
                existingProducts[FoundGoods.ProductUid] = {
                    ProductName: FoundGoods.ProductName,
                    ProductPrice: productAllPrice,
                    ProductUid: FoundGoods.ProductUid,
                    ProductQuantity: quantity,
                    userUid: userUid,
                };
                await updateDoc(pocketRef, {
                    Products: existingProducts,
                });
            } else {
                await setDoc(pocketRef, {
                    Products: {
                        [FoundGoods.ProductUid]: {
                            ProductName: FoundGoods.ProductName,
                            ProductPrice: productAllPrice,
                            ProductUid: FoundGoods.ProductUid,
                            ProductQuantity: quantity,
                            userUid: userUid,
                        },
                    },
                });
            }
            console.log("포켓에 저장되었습니다.");
            alert("장바구니 담기 완료!");
        } catch (error) {
            console.error("포켓에 저장 중 오류 발생:", error);
        }
    };
    return (
        <Button onClick={onClickMtPocketButton} className={css}>
            {cartMsg}
            {
                cartImg !== "" ?
                    <img src={cartImg} className="w-5" /> :
                    null
            }
        </Button>
    )
}

export default Cart


