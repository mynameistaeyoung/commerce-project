import Header from "@/components/header/Header"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"
import { GoodsItem } from "@/zustand/bearsStore";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/zustand/bearsStore";

const Main = () => {
    const [product, setProduct] = useState<GoodsItem[]>([]);
    const [searchData, setSearchData] = useState<GoodsItem[]>([]);
    const { goods, setGoods, search } = useUserStore();

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
                    <li key={item.ProductUid} className="font-bold cursor-pointer" onClick={() => { navigate(`/productDetail/${item.ProductUid}`) }}>
                        <img src={item.ProductURL} className="aspect-1/1" />
                        <p>{item.ProductName}</p>
                        <p>{item.ProductPrice}원</p>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Main;