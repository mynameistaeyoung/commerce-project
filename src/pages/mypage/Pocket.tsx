import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import useUserStore from "@/zustand/bearsStore";
import { ProductPocket } from '@/zustand/bearsStore';
import { useNavigate } from 'react-router-dom';

const Pocket = () => {
  const navigate = useNavigate();
  const userUid = auth.currentUser?.uid;
  const [myPocket, setMyPocket] = useState<ProductPocket[]>([]);
  const [matchedGoods, setMatchedGoods] = useState<any[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
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
          const products = PocketSnap.data().Products || {};
          setMyPocket(Object.values(products));

          const initialQuantities: { [key: string]: number } = {};
          Object.values(products).forEach((product: any) => {
            initialQuantities[product.ProductUid] = product.ProductQuantity || 1;
          });
          setQuantities(initialQuantities);
        }
      } catch (error) {
        console.log("에러발생", error);
      }
    };
    fetchPocketData();
  }, [userUid]);

  useEffect(() => {
    const matched = goods.filter((item) =>
      myPocket.some((pocketItem) => pocketItem.ProductUid === item.ProductUid)
    );
    setMatchedGoods(matched);
  }, [myPocket, goods]);

  const onClickDeletePocketButton = async (productUid: string) => {
    const pocketRef = doc(db, "pocket", userUid!);
    try {
      const pocketSnap = await getDoc(pocketRef);
      if (pocketSnap.exists()) {
        const products = pocketSnap.data().Products || {};
        delete products[productUid];
        await updateDoc(pocketRef, {
          Products: products,
        });
        console.log("상품이 장바구니에서 삭제되었습니다.");
        setMyPocket((prev) => prev.filter(item => item.ProductUid !== productUid));
      } else {
        console.error("장바구니 문서가 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("장바구니에서 상품 삭제 중 오류 발생:", error);
    }
  };

  const updateQuantityAndPriceInDb = async (productUid: string, newQuantity: number, price: number) => {
    const pocketRef = doc(db, "pocket", userUid!);
    try {
      const pocketSnap = await getDoc(pocketRef);
      if (pocketSnap.exists()) {
        const products = pocketSnap.data().Products || {};
        products[productUid].ProductQuantity = newQuantity;
        products[productUid].ProductPrice = price * newQuantity;
        await updateDoc(pocketRef, { Products: products });
      }
    } catch (error) {
      console.error("수량 및 가격 업데이트 중 오류 발생:", error);
    }
  };

  const handleQuantityChange = (productUid: string, delta: number, price: number) => {
    setQuantities((prevQuantities) => {
      const newQuantity = Math.max(1, (prevQuantities[productUid] || 1) + delta); 
      updateQuantityAndPriceInDb(productUid, newQuantity, price);
      return {
        ...prevQuantities,
        [productUid]: newQuantity,
      };
    });
  };

  return (
    <section>
      <h2 className="text-3xl mb-[30px] ml-[30px]">장바구니</h2>
      <ul className="ml-[30px] mt-[40px]">
        {matchedGoods.map((item) => (
          <div
            key={item.ProductUid}
            className='flex justify-between items-center mb-4'>
            <li
              className="font-bold cursor-pointer flex items-center"
              onClick={() => { navigate(`/productDetail/${item.ProductUid}`); }}
            >
              <img src={item.ProductURL} className="w-[100px] h-[100px] mr-4" alt={item.ProductName} />
              <div className="flex-1">
                <p className="text-lg">{item.ProductName}</p>
                <p className="text-md">{item.ProductPrice* (quantities[item.ProductUid] || 1)}원</p>
              </div>
            </li>
            <div className='flex gap-3'>
              <div>
                <button
                  className="px-2 bg-gray-200 hover:bg-gray-300"
                  onClick={() => handleQuantityChange(item.ProductUid, -1, item.ProductPrice)}
                >
                  -1
                </button>
                <input
                  type="number"
                  value={quantities[item.ProductUid] || 1}
                  className="w-[50px] text-center border-black"
                  readOnly
                />
                <button
                  className="px-[10px] bg-gray-200 hover:bg-gray-300"
                  onClick={() => handleQuantityChange(item.ProductUid, 1, item.ProductPrice)} 
                >
                  +1
                </button>
              </div>
              <button
                className='w-[30px]'
                onClick={() => onClickDeletePocketButton(item.ProductUid)}
              >
                <img src='/free-icon-recycle-bin-7491835.png' alt="삭제 버튼" />
              </button>
            </div>
          </div>
        ))}
      </ul>    </section>
  );
};

export default Pocket;