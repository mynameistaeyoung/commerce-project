import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const Login = () => {
    return (
        <div className="flex flex-row items-center justify-center min-h-screen">
            <h1
                className="text-4xl font-bold font-GmarketSansMedium mb-8">
                패션앱에 오신것을 환영합니다!
            </h1>
            <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md ml-10">
                <div className="mb-4">
                    <label
                        htmlFor="user_id"
                        className="font-GmarketSansMedium flex mt-3" >아이디</label>
                    <input
                        type="text"
                        id="user_id"
                        className="rounded-custom border border-gray-300 w-full py-2" />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="user_password"
                        className="font-GmarketSansMedium flex mt-3"
                    >비밀번호</label>
                    <input
                        type="password"
                        id="user_password"
                        className="rounded-custom border border-gray-300 w-full py-2 " />
                </div>

                <div className="flex mt-5">
                    <Button
                        className="font-GmarketSansMedium rounded-custom border border-black bg-black text-white w-full py-2">
                        로그인
                    </Button>
                </div>
                <Link className="font-GmarketSansMedium mt-4 hover:underline"
                    to={"/register"}>회원가입</Link>
            </form>

        </div>
    )
}

export default Login
