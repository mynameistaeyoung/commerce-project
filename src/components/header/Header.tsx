import { Input } from "../ui/input"
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div>
            <div className="flex justify-end">
                <Link to={"/login"}>로그아웃</Link>|
            </div>
            <div className="flex items-center">
                <h1 className="text-3xl font-bold">패션앱</h1>
                <div className="relative flex-1">
                    <Input className="rounded-2xl border-gray-300 flex-1 h-12"></Input>
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full px-4 py-2">
                        검색
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header