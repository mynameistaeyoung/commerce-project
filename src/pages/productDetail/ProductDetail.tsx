import Header from "@/components/header/Header";
import useUserStore from "@/zustand/bearsStore";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { doc, deleteDoc} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import Like from "@/components/like/Like";
import Cart from "@/components/cart/Cart";

const ProductDetail = () => {
    const { goods, user } = useUserStore();
    const { ProductUid } = useParams();
    const FoundGoods = goods.find(item => item.ProductUid === ProductUid);
    const userUid = user.length > 0 ? user[0].uid : null;
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    const [productAllPrice, setProductAllPrice] = useState<number | string>(FoundGoods?.ProductPrice || 0);
    const ProductDeleteButton = async (e: React.MouseEvent<HTMLElement,MouseEvent>) => {
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

    useEffect(() => {
        if(FoundGoods){
            setProductAllPrice(quantity * +(FoundGoods.ProductPrice || 0))
        }
    }, [quantity, FoundGoods])

    return (
        <>
            <Header />
            <div className="w-[60%] mx-auto mt-[40px]">
                {FoundGoods ? (
                    <>
                    <div className="flex">
                        <img src={FoundGoods.ProductURL} className="aspect-1/1 w-[60%] mr-4" alt={FoundGoods.ProductName} />
                        <div className="mt-[60px]">
                            <div className="flex">
                                <div className="font-bold text-3xl mb-10">{FoundGoods.ProductName}</div>
                                <Like ProductUid={ProductUid} />
                            </div>
                            <div className="mb-10">
                                <div className="font-bold text-3xl">{productAllPrice.toLocaleString()}원</div>
                                <div className="font-bold text-3xl">{FoundGoods.ProductDescription}</div>
                                {FoundGoods.ProductQuantity < 10 ?
                                    <div className="text-red-500">현재 남은 수량:{FoundGoods.ProductQuantity}개</div>
                                    : null}
                            </div>
                            {FoundGoods.UserUid === userUid ? (
                                <div className="mb-3">
                                    <Button className="mr-3" onClick={() => navigate(`/retouchProduct/${ProductUid}`)}>수정하기</Button>
                                    <Button onClick={ProductDeleteButton}>삭제하기</Button>
                                </div>
                            ) : null}
                            <div className="flex">
                                <div className="flex items-center border border-black mr-3">
                                    <input
                                        type="number"
                                        value={quantity}
                                        className="w-[60px] text-center border-black"
                                    />
                                    <div>
                                        <button
                                            className="px-2 bg-gray-200 hover:bg-gray-300"
                                            onClick={() => { setQuantity(prev => prev + 1) }}
                                        >
                                            +1
                                        </button>
                                        <button
                                            className={`${quantity === 1 ? "px-[10px] bg-gray-200 pointer-events-none text-gray-400" : "px-[10px] bg-gray-200 hover:bg-gray-300"}`}
                                            onClick={() => { setQuantity(prev => prev - 1) }}
                                        >
                                            -1
                                        </button>
                                    </div>
                                </div>
                                <Button className="mr-3">구매하기</Button>
                                <Cart quantity={quantity} productAllPrice={productAllPrice} css={""} cartMsg={"장바구니"} cartImg="" productUid={FoundGoods.ProductUid}/>
                            </div>
                        </div>
                    </div>
                    </>
                ) : ("상품 정보를 불러올 수 없습니다")}
            </div>
        </>
    );
};

export default ProductDetail;