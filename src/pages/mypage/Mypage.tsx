import Header from "@/components/header/Header"
import useUserStore from "@/zustand/bearsStore"
import { auth } from "../../firebase"
import { useState } from "react"
import BgChangButton from '../../components/ui/BgChangeButton';

const Mypage = () => {

    const userUid = auth.currentUser?.uid
    const { user } = useUserStore();
    const FoundUser = user.find(item => item.uid === userUid)

    const [activeMenu, setActiveMenu] = useState('내 정보');
    const menuItems = ['내 정보', '비밀번호 변경', '찜한항목', '장바구니'];
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
                        <h2 className="text-3xl mb-[30px] ml-[30px]">내 정보</h2>
                        {FoundUser ? (
                            <div>
                                <h3 className="text-xl mb-[20px] ml-[30px]">이메일 : {FoundUser.email}</h3>
                                <h3 className="text-xl mb-[20px] ml-[30px]">이름 : {FoundUser.name}</h3>
                                <h3 className="text-xl mb-[20px] ml-[30px]">전화번호 : {FoundUser.number}</h3>
                                <h3 className="text-xl mb-[20px] ml-[30px]">생년월일 : {FoundUser.date}</h3>
                            </div>
                        ) : null}
                    </section>
                </div>
            </div>
        </>
    )
}

export default Mypage