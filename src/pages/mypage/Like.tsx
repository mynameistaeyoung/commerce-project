import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { ProductLike } from "@/zustand/bearsStore";
import useUserStore from "@/zustand/bearsStore";
import { collection, onSnapshot } from "firebase/firestore"; 
import { useNavigate } from "react-router-dom";

const Like = () => {
  const { setLike, goods } = useUserStore(); 
  const [productLike, setProductLike] = useState<ProductLike[]>([]);
  const [filteredGoods, setFilteredGoods] = useState<any[]>([]);
  const userUid = auth.currentUser?.uid;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikeData = () => {
      try {
        const unsubscribe = onSnapshot(collection(db, "likes"), (snapshot) => {
          const likesArr: ProductLike[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data() as ProductLike;
            likesArr.push(data);
            setLike(data);
          });
          setProductLike(likesArr);
        });
        return () => unsubscribe();
      } catch (error) {
        console.log("에러발생", error);
      }
    };
    fetchLikeData();
  }, [setLike]);

  useEffect(() => {
    const foundLike = productLike
      .filter((item) => item.like === true && item.userUid === userUid)
      .map((item) => item.ProductUid);

    const matchedGoods = goods.filter((item) => foundLike.includes(item.ProductUid));
    setFilteredGoods(matchedGoods);
  }, [productLike, goods, userUid]);

  return (
    <section>
      <h2 className="text-3xl mb-[30px] ml-[30px]">찜한항목</h2>
      <ul className="w-[60%] ml-[30px] mt-[40px] grid grid-cols-4 gap-[30px]">
        {filteredGoods.map((item) => (
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

export default Like;