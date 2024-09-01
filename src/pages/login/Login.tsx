import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const onClickMainButton = ()=>{
        navigate("/")
    }
    return (
        <div className="min-h-screen flex flex-row justify-center items-center gap-10 max-w-screen-lg min-w-[800px] mx-auto">
            <div>
                <h1 className="text-3xl font-bold mb-8">패션앱에 오신 것을 환영합니다!</h1>
            </div>

            <div className="w-full max-w-xl mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_id">
                        아이디
                    </label>
                    <Input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-300"
                        id="user_id"
                        type="text"
                        placeholder="아이디를 입력해주세요!"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_password">
                        비밀번호
                    </label>
                    <Input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border-gray-300"
                        id="user_password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요!"
                    />
                </div>

                <div className="items-center justify-between">
                    <button
                        className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-3"
                        onClick={onClickMainButton}
                        >
                        로그인
                    </button>
                    <Link
                    className="font-bold"
                        to={"/register"}>회원가입</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
