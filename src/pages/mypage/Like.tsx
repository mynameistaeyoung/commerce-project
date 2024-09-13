import Header from "@/components/header/Header"
import Collect from "./Collect"
import { useEffect } from "react"
import { db, auth } from "../../firebase"
import { doc, getDoc } from "firebase/firestore";
import { ProductLike } from "@/zustand/bearsStore";
import useUserStore from "@/zustand/bearsStore";

const Like = () => {
  const userUid = auth.currentUser?.uid
  const { like, setLike } = useUserStore()
  console.log(like)

  useEffect(() => {
    const fetchLikeDate = async () => {
      try {
        const docRef = doc(db, "likes", userUid!)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data() as ProductLike
          setLike(data)
        }
      } catch (error) {
        console.log("에러발생", error)
      }
    }
    fetchLikeDate()
  }, [])
  return (
    <>
      <Header />
      <div className="w-[60%] mx-auto pt-6">
        <div className="flex">
          <Collect />
          
        </div>
      </div>
    </>
  )
}

export default Like