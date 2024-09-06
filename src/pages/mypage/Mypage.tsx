import Header from "@/components/header/Header"
import useUserStore from "@/zustand/bearsStore"
import { auth } from "../../firebase"

const Mypage = () => {

    const userUid = auth.currentUser?.uid
    const { user } = useUserStore();
    const FoundUser = user.filter(item=>item.uid===userUid)

    return (
        <div className="w-full max-w-[1000px] mx-auto">
            <Header />
            <div className="flex">
                <div className="border-r border-black max-w-[150px] h-[600px]">
                    <button
                        className="text-2xl mb-[30px] ">마이페이지</button>
                    <button
                        className="text-xl mb-[10px] hover:bg-gray-300 active:bg-gray-300 w-[148px] text-left">내 정보</button>
                    <button
                        className="text-xl mb-[10px] hover:bg-gray-300 active:bg-gray-300 w-[148px] text-left">비밀번호 변경</button>
                    <button
                        className="text-xl mb-[10px] hover:bg-gray-300 active:bg-gray-300 w-[148px] text-left">찜한항목</button>
                    <button
                        className="text-xl mb-[10px] hover:bg-gray-300 active:bg-gray-300 w-[148px] text-left">장바구니</button>
                </div>

                <div>
                    <h1 className="text-3xl mb-[30px] ml-[30px]">내 정보 </h1>
                    <div className="text-xl mb-[20px] ml-[30px]">이메일 : {FoundUser[0]?.email}</div>
                    <div className="text-xl mb-[20px] ml-[30px]">이름 : {FoundUser[0]?.name}</div>
                    <div className="text-xl mb-[20px] ml-[30px]">전화번호 : {FoundUser[0]?.number}</div>
                    <div className="text-xl mb-[20px] ml-[30px]">생년월일 : {FoundUser[0]?.date}</div>
                </div>
            </div>
        </div>
    )
}

export default Mypage