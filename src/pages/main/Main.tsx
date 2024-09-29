import Header from "@/components/header/Header"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"
import { GoodsItem } from "@/zustand/bearsStore";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/zustand/bearsStore";
import Cart from "@/components/cart/Cart";

const Main = () => {
    const [product, setProduct] = useState<GoodsItem[]>([]);
    const [searchData, setSearchData] = useState<GoodsItem[]>([]);
    const { goods, setGoods, search } = useUserStore();

    const cartCss = "border border-gray-300 rounded-md bg-white text-black h-[25px] mt-[15px] w-full mb-[10px]"
    const cartImg = "/free-icon-add-cart-4175027.png"
    const cartMsg = "담기"
    const navigate = useNavigate();

    useEffect(() => {
        if (goods.length > 0) {
            setProduct(goods);
            return;
        }
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "goods"));
                const goodsArr: GoodsItem[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data() as GoodsItem;
                    goodsArr.push(data);
                    setGoods(data);
                });
                setProduct(goodsArr);
            } catch (error) {
                console.error("데이터를 가져오는 중 에러 발생:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setSearchData(search);
    }, [search]);

    const displayItems = searchData.length > 0 ? searchData : product;

    return (
        <>
            <Header />
            <ul className="w-[60%] mx-auto mt-[40px] grid grid-cols-4 gap-[30px]">
                {displayItems.map((item) => (
                    <li key={item.ProductUid} className="cursor-pointer">
                        <img src={item.ProductURL} className="aspect-1/1" onClick={() => { navigate(`/productDetail/${item.ProductUid}`) }} />
                        <Cart quantity={1} productAllPrice={item.ProductPrice} css={cartCss} cartMsg={cartMsg} cartImg={cartImg} productUid={item.ProductUid} />
                        <div onClick={() => { navigate(`/productDetail/${item.ProductUid}`) }}>
                            <p className="font-weight">{item.ProductName}</p>
                            <p className="font-bold">{item.ProductPrice}원</p>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Main;