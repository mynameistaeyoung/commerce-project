import { Input } from "../ui/input"
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth, db } from "../../firebase"
import useUserStore from "@/zustand/bearsStore"
import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"

const Header = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const userUid = auth.currentUser?.uid;
    const { user,setSearch } = useUserStore();
    const FoundUser = user.filter(item => item.uid === userUid);

    const navigate = useNavigate();

    const logOut = async (e: any) => {
        e.preventDefault();
        await signOut(auth);
        navigate("/login");
    };

    const registrationRoot = () => {
        navigate("/registration");
    };

    const privateMypage = () =>
        FoundUser.length > 0 ? navigate("/mypage") : alert("로그인이 필요한 서비스입니다.");

    useEffect(() => {
        userUid === null ? navigate("/") : null;
    }, []);

    const searchData = async () => {
        if (searchKeyword.trim() === "") {
            alert("검색어를 입력해주세요.");
            return;
        }

        const q = query(
            collection(db, "goods"),
            where("ProductName", ">=", searchKeyword),
            where("ProductName", "<=", searchKeyword + "\uf8ff")
        );
        const resSnap = await getDocs(q);
        const searchResults = resSnap.docs.map(doc => doc.data());
        setSearch(searchResults)
    };

    const resetSearch = () => {
        setSearch([]); 
        navigate("/"); 
    };

    return (
        <header className="w-[60%] mx-auto">
            <div className="flex justify-end">
                {FoundUser[0]?.seller === true ?
                    <div className="flex">
                        <button onClick={registrationRoot} className="mr-2">상품등록하기</button>
                        <div>|</div>
                        &nbsp;
                    </div> :
                    null}
                <button onClick={privateMypage} className="mr-2">마이페이지</button>
                <div>|</div>
                &nbsp;
                <button 
                className="mr-2"
                onClick={()=>{navigate('/mypage', { state: { activeMenu: '장바구니' } })}}
                >장바구니</button>
                <div>|</div>
                &nbsp;
                <button onClick={logOut} className="mr-2">{FoundUser.length > 0 ? "로그아웃" : "로그인"}</button>
            </div>
            <div className="flex items-center">
                <button onClick={resetSearch} className="text-3xl font-bold">패션앱</button>
                <div className="relative flex-1">
                    <Input
                        className="rounded-2xl border-gray-300 flex-1 h-12"
                        placeholder="원하시는 상품을 입력해주세요!"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    <button
                        onClick={searchData} 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white rounded-full px-4 py-2"
                    >
                        <img src="/Search.png" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;