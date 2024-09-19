import { useEffect, useState } from 'react'
import { collection, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase"
import useUserStore from "@/zustand/bearsStore";
import { ProductPocket } from '@/zustand/bearsStore';
import { useNavigate } from 'react-router-dom';

const Pocket = () => {
  const navigate = useNavigate();
  const userUid = auth.currentUser?.uid;
  const [myPocket, setMyPocket] = useState<ProductPocket[]>([]);
  const [matchedGoods, setMatchedGoods] = useState<any[]>([]);
  const { goods } = useUserStore();

  useEffect(() => {
    const fetchPocketData = async () => {
      if (!userUid) {
        console.error("유저가 없습니다.");
        return;
      }

      try {
        const PocketRef = doc(db, "pocket", userUid);
        const PocketSnap = await getDoc(PocketRef);
        if (PocketSnap.exists()) {
          console.log(PocketSnap.data());
          console.log(PocketSnap.id)
          const products = PocketSnap.data().Products || {};
          setMyPocket(Object.values(products)); 
        }
      } catch (error) {
        console.log("에러발생", error);
      }
    };
    fetchPocketData();
  }, [userUid]);

  console.log(myPocket)
  useEffect(() => {
    const matched = goods.filter((item) =>
      myPocket.some((pocketItem) => pocketItem.ProductUid === item.ProductUid)
    );
    setMatchedGoods(matched);
  }, [myPocket, goods]);

  return (
    <section>
      <h2 className="text-3xl mb-[30px] ml-[30px]">장바구니</h2>
      <ul className="w-[60%] ml-[30px] mt-[40px] grid grid-cols-4 gap-[30px]">
        {matchedGoods.map((item) => (
          <li
            key={item.ProductUid}
            className="font-bold cursor-pointer"
            onClick={() => { navigate(`/productDetail/${item.ProductUid}`); }}
          >
            <img src={item.ProductURL} className="aspect-1/1" />
            <p>{item.ProductName}</p>
            <p>{item.ProductPrice}원</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Pocket;