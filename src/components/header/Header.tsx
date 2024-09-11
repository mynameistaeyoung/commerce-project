import { Input } from "../ui/input"
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase"
import useUserStore from "@/zustand/bearsStore"
import { useEffect } from "react"

const Header = () => {

    const userUid = auth.currentUser?.uid
    const { user } = useUserStore();
    const FoundUser = user.filter(item => item.uid === userUid)
    console.log(FoundUser)

    const navigate = useNavigate();

    const logOut = async (e: any) => {
        e.preventDefault();
        await signOut(auth)
        navigate("/login")
    }

    const registrationRoot = () => {
        navigate("/registration")
    }

    const privateMypage = () =>
        FoundUser.length > 0 ? navigate("/mypage") : alert("로그인이 필요한 서비스입니다.")

    useEffect(() => {
        userUid === null ? navigate("/") : null
    }, [])

    return (
        <div className="w-[60%] mx-auto">
            <div className="flex justify-end">
                {FoundUser[0]?.seller === "true" ?
                    <div className="flex">
                        <button onClick={registrationRoot} className="mr-2">상품등록하기</button>
                        <div>|</div>
                        &nbsp;
                    </div> :
                    null}
                <button onClick={privateMypage} className="mr-2">마이페이지</button>
                <div>|</div>
                &nbsp;
                <button className="mr-2">장바구니</button>
                <div>|</div>
                &nbsp;
                <button onClick={logOut} className="mr-2">{FoundUser.length > 0 ? "로그아웃" : "로그인"}</button>
            </div>
            <div className="flex items-center">
                <button onClick={() => navigate("/")} className="text-3xl font-bold">패션앱</button>
                <div className="relative flex-1">
                    <Input
                        className="rounded-2xl border-gray-300 flex-1 h-12"
                        placeholder="원하시는 상품을 입력해주세요!"></Input>
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2  text-white rounded-full px-4 py-2">
                        <img src="/Search.png" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header