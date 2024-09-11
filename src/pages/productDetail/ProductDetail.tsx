import Header from "@/components/header/Header"
import useUserStore from "@/zustand/bearsStore"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
    const { goods } = useUserStore()
    console.log(goods)
    const { ProductUid } = useParams();
    console.log(ProductUid)
    const FoundGoods = goods.find(item => item.ProductUid === ProductUid)

    const navigate = useNavigate()

    return (
        <>
            <Header />
            <div className="w-[60%] mx-auto mt-[40px]">
                {FoundGoods ? (<div className="flex">
                    <img src={FoundGoods?.ProductURL} className="aspect-1/1 w-[60%] mr-4" />
                    <div className="mt-[60px]">
                        <div className="font-bold text-3xl mb-10">{FoundGoods.ProductName}</div>
                        <div className="font-bold text-3xl">{FoundGoods.ProductPrice}</div>
                        <div className="font-bold text-3xl mb-10">{FoundGoods.ProductDescription}</div>
                        <Button className="mr-3" onClick={() => navigate("/retouchProduct")}>수정하기</Button><Button>삭제하기</Button>
                    </div>
                </div>) : (alert("이미지를 불러올수 없습니다"))}
            </div>
        </>
    )
}

export default ProductDetail