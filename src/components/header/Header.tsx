import { Input } from "../ui/input"
import { Link, useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase"

const Header = () => {
    const navigate = useNavigate();
    const logOut = async (e: any) => {
        e.preventDefault();
        await signOut(auth)
        navigate("/login")
    }

    return (
        <div>
            <div className="flex justify-end">
                <Link to={"/login"} onClick={logOut}>로그아웃</Link>|
            </div>
            <div className="flex items-center">
                <h1 className="text-3xl font-bold">패션앱</h1>
                <div className="relative flex-1">
                    <Input className="rounded-2xl border-gray-300 flex-1 h-12"></Input>
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2  text-white rounded-full px-4 py-2">
                        <img src="/Search.png" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header