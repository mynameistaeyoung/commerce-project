import Header from "@/components/header/Header"
import useUserStore from "@/zustand/bearsStore"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db, storage, auth } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";


const ProductDetail = () => {
    const { goods } = useUserStore()
    const { ProductUid } = useParams();
    const FoundGoods = goods.find(item => item.ProductUid === ProductUid)
    const userUid = auth.currentUser?.uid
    const navigate = useNavigate()

    const [clicked, setClicked] = useState(false)

    const ProductDeleteButton = async (e: any) => {
        e.preventDefault();
        try {
            if (confirm("정말 삭제하시겠습니까?") == true) {
                await deleteDoc(doc(db, "goods", ProductUid!))
                const imageRef = ref(storage, FoundGoods?.ProductURL);
                await deleteObject(imageRef);
                navigate("/")
            } else {
                return;
            }
        } catch (error) {
            console.log("삭제를 실패하였습니다", error)
        }
    }

    return (
        <>
            <Header />
            <div className="w-[60%] mx-auto mt-[40px]">
                {FoundGoods ? (<div className="flex">
                    <img src={FoundGoods.ProductURL} className="aspect-1/1 w-[60%] mr-4" />
                    <div className="mt-[60px]">
                        <div className="font-bold text-3xl mb-10">{FoundGoods.ProductName}</div>
                        <div className="font-bold text-3xl">{FoundGoods.ProductPrice}</div>
                        <div className="font-bold text-3xl mb-10">{FoundGoods.ProductDescription}</div>
                        {FoundGoods.UserUid === userUid ?
                            <div className="mb-3">
                                <Button className="mr-3" onClick={() => navigate(`/retouchProduct/${ProductUid}`)}>수정하기</Button>
                                <Button onClick={ProductDeleteButton}>삭제하기</Button>
                            </div> : null
                        }
                        <div className="flex">
                            <img src={clicked === true ?
                                "/free-icon-hearts-138533.png" :
                                "/free-icon-heart-1077035.png"
                            }
                                className="aspect-1/1 w-[40px] mr-3" onClick={() => { setClicked(!clicked) }} />
                            <Button className="mr-3">구매하기</Button>
                            <Button>장바구니</Button>
                        </div>
                    </div>
                </div>) : (alert("상품정보를 불러올수 없습니다"))}
            </div>
        </>
    )
}

export default ProductDetail