import Header from "@/components/header/Header"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"
import { GoodsItem } from "@/zustand/bearsStore";


const Main = () => {
    const [goods, setGoods] = useState<GoodsItem[]>([])
    const goodsArr: GoodsItem[] = []

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "goods"));
                querySnapshot.forEach((doc) => {
                    goodsArr.push(doc.data())
                    setGoods(goodsArr)
                });
            } catch (error) {
                console.log("데이터를 가져오는 중 에러 발생:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Header />
            <div className="w-[60%] mx-auto pt-6 flex">
                <div>
                    {goods.map((item) => (
                        <div key={item.ProductUid}>
                            <img src={item.ProductURL} />
                            <p>{item.ProductName}</p>
                            <p>{item.ProductPrice}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Main