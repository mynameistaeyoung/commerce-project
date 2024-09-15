import Header from "@/components/header/Header"
import useUserStore from "@/zustand/bearsStore"
import { auth, db } from "../../firebase"
import { act, useState } from "react"
import { Button } from "@/components/ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import BgChangButton from "@/components/ui/BgChangeButton";
import ChangeMyPassword from "./ChangeMyPassword";
import Like from "./Like"
import Pocket from "./Pocket";


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
    const [activeMenu, setActiveMenu] = useState('내 정보');

    const menuItems = ['내 정보', '비밀번호 변경', '찜한항목', '장바구니'];

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
                    <div className="border-r border-black max-w-[150px] h-[600px]">
                        <button
                            className="text-2xl mb-[30px] ">마이페이지</button>
                        {menuItems.map(item => (
                            <BgChangButton
                                key={item}
                                title={item}
                                activeMenu={activeMenu}
                                setActiveMenu={setActiveMenu}
                            />
                        ))}
                    </div>
                    <section>
                        {activeMenu === "내 정보" ?
                            <>
                                <h2 className="text-3xl mb-[30px] ml-[30px]">내 정보</h2>
                                <div>
                                    <h3 className="text-xl mb-[20px] ml-[30px]">이메일 : {FoundUser?.email}</h3>
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
                                <div className="flex justify-end">
                                    <Button onClick={changeUserProfileButton}>수정하기</Button>
                                </div>
                            </> :
                            activeMenu === "비밀번호 변경" ?
                                <ChangeMyPassword /> :
                                activeMenu === "찜한항목" ?
                                    <Like /> :
                                    activeMenu === "장바구니" ?
                                        <Pocket /> :
                                        null}
                    </section>
                </div>
            </div>
        </>
    )
}

export default Mypage