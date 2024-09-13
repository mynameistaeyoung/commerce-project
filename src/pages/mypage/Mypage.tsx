import Header from "@/components/header/Header"
import useUserStore from "@/zustand/bearsStore"
import { auth, db } from "../../firebase"
import { useState } from "react"
import { Button } from "@/components/ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Collect from "./Collect";


const Mypage = () => {
    const userUid = auth.currentUser?.uid
    const { user, updateUser } = useUserStore();
    const FoundUser = user.find(item => item.uid === userUid)

    const [changeUserName, setChangeUserName] = useState(`${FoundUser?.name}`)
    const [changeUserDate, setChangeUserDate] = useState(`${FoundUser?.date}`)
    const [changeUserNumber, setChangeUserNumber] = useState(`${FoundUser?.number}`)
    const [changeUserEmail, setChangeUserEmail] = useState(`${FoundUser?.email}`)
    const [changeUserSeller, setChangeUserSeller] = useState(`${FoundUser?.seller}`)
    const [changeUserUid, setChangeUserUid] = useState(`${FoundUser?.uid}`)

    const navigate = useNavigate()

    const changeUserProfileButton = async (e: any) => {
        e.preventDefault();
        try {
            if (!userUid) return;
            const changeUserRef = doc(db, "user", userUid)
            await updateDoc(changeUserRef, {
                name: changeUserName,
                date: changeUserDate,
                number: changeUserNumber,
                uid: changeUserUid,
                seller: changeUserSeller,
                email: changeUserEmail
            })
            updateUser({
                name: changeUserName,
                date: changeUserDate,
                number: changeUserNumber,
                uid: changeUserUid,
                seller: Boolean(changeUserSeller),
                email: changeUserEmail
            })
            alert("유저정보가 변경되었습니다.")
            navigate("/mypage")
        } catch (error) {
            console.log("정보를 바꾸는데 실패했습니다", error)
        }
    };

    return (
        <>
            <Header />
            <div className="w-[60%] mx-auto pt-6">
                <div className="flex">
                    <Collect/>
                    <section>
                        <h2 className="text-3xl mb-[30px] ml-[30px]">내 정보</h2>
                        {FoundUser ? (
                            <div>
                                <h3 className="text-xl mb-[20px] ml-[30px]">이메일 : {FoundUser.email}</h3>
                                <div className="text-xl mb-[20px] ml-[30px]">
                                    <label htmlFor="user-name">이름 : </label>
                                    <input type="text" id="user-name"
                                        value={changeUserName} onChange={(e) => { setChangeUserName(e.target.value) }} />
                                </div>

                                <div className="text-xl mb-[20px] ml-[30px]">
                                    <label htmlFor="user-number">전화번호 : </label>
                                    <input
                                        type="text" id="user-number"
                                        value={changeUserNumber} onChange={(e) => { setChangeUserNumber(e.target.value) }} />
                                </div>

                                <div className="text-xl mb-[20px] ml-[30px]">
                                    <label htmlFor="user-date">생년월일 : </label>
                                    <input
                                        type="text" id="user-date"
                                        value={changeUserDate} onChange={(e) => { setChangeUserDate(e.target.value) }} />
                                </div>
                            </div>
                        ) : null}
                        <div className="flex justify-end">
                            <Button onClick={changeUserProfileButton}>수정하기</Button>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Mypage