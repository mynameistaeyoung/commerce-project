import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { ProductLike } from "@/zustand/bearsStore";
import useUserStore from "@/zustand/bearsStore";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Like from "@/components/like/Like";

const UserLike = () => {
  const { setLike, goods,user } = useUserStore();
  const [productLike, setProductLike] = useState<ProductLike[]>([]);
  const [filteredGoods, setFilteredGoods] = useState<any[]>([]);
  const userUid = user.length > 0 ? user[0].uid : null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikeData = async () => {
      try {
        const LikeRef = doc(db, "likes", userUid!)
        const LikeSnap = await getDoc(LikeRef)
        if (LikeSnap.exists()) {
          const likeData = LikeSnap.data().ProductName || {}
          setProductLike(Object.values(likeData))
        }
      } catch (error) {
        console.log("에러발생", error);
      }
    };
    fetchLikeData();
  }, [setLike,userUid]);

  useEffect(() => {
    const FoundGoods = goods.filter((item) =>
      productLike.some((LikeItem) => LikeItem.ProductUid === item.ProductUid)
    );
    setFilteredGoods(FoundGoods);
  }, [productLike, goods]);
  
  return (
    <section>
      <h2 className="text-3xl mb-[30px] ml-[30px]">찜한항목</h2>
      <ul className=" ml-[30px] mt-[40px]">
        {filteredGoods.map((item) => (
          <div className="flex justify-between items-center mb-4">
            <li
              key={item.ProductUid}
              className="font-bold cursor-pointer flex items-center"
              onClick={() => { navigate(`/productDetail/${item.ProductUid}`); }}
            >
              <img src={item.ProductURL} className="w-[100px] h-[100px] mr-4" />
              <div className="flex-1">
                <p className="text-lg">{item.ProductName}</p>
                <p className="text-md">{item.ProductPrice}원</p>
              </div>
            </li>
            <Like ProductUid={item.ProductUid}/>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default UserLike;