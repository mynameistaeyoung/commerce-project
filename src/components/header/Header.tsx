import { Input } from "../ui/input"
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth, db } from "../../firebase"
import useUserStore from "@/zustand/bearsStore"
import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { GoodsItem } from "@/zustand/bearsStore"

const Header = () => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const userUid = auth.currentUser?.uid;
    const { user, setSearch, clearUser } = useUserStore();
    const FoundUser = user.length > 0 ? user[0] : null;

    const navigate = useNavigate();

    const logOut = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();
        await signOut(auth);
        clearUser();
        navigate("/login");
    };

    const registrationRoot = () => {
        navigate("/registration");
    };

    const privateMypage = () =>
        FoundUser ? navigate("/mypage") : alert("로그인이 필요한 서비스입니다.");

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
        const searchResults = resSnap.docs.map(doc => doc.data() as GoodsItem);
        setSearch(searchResults)
    };

    const resetSearch = () => {
        setSearch([]);
        navigate("/");
    };

    const onClickPocketButton = () => {
        if (FoundUser) {
            navigate('/mypage', { state: { activeMenu: '장바구니' } })
        } else {
            alert("로그인이 필요한 서비스입니다.")
            navigate("/login")
        }
    }

    const onClickLikeButton = () => {
        if (FoundUser) {
            navigate('/mypage', { state: { activeMenu: '찜한항목' } })
        } else {
            alert("로그인이 필요한 서비스입니다.")
            navigate("/login")
        }
    }

    return (
        <header className="w-[60%] mx-auto">
            <div className="flex justify-end">
                {FoundUser?.seller === true ? (
                    <div className="flex">
                        <button onClick={registrationRoot} className="mr-2">상품등록하기</button>
                        <div>|</div>
                        &nbsp;
                    </div>
                ) : null}
                {FoundUser ? (
                    <>
                        <button onClick={privateMypage} className="mr-2">마이페이지</button>
                        <div>|</div>
                        &nbsp;
                    </>
                ) : (
                    <>
                        <button className="text-blue-400" onClick={() => { navigate("/register") }}>회원가입</button>
                        &nbsp;
                        <div>|</div>
                    </>
                )}
                &nbsp;
                <button onClick={logOut} className="mr-2">{FoundUser ? "로그아웃" : "로그인"}</button>
            </div>

            <div className="flex items-center justify-between mt-4">
                <button
                    onClick={resetSearch}
                    className="text-3xl font-bold text-blue-400 flex-shrink-0 whitespace-nowrap"
                >
                    패션앱
                </button>

                <div className="relative w-full max-w-[400px] mx-4">
                    <div className="relative">
                        <Input
                            className="rounded-2xl border-blue-400 w-full h-10 text-[14px] pr-10 pl-4 focus:outline-none"
                            placeholder="원하시는 상품을 입력해주세요!"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <img
                            src="/Search.png"
                            alt="검색"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 cursor-pointer"
                            onClick={searchData}
                        />
                    </div>
                </div>

                <div className="flex space-x-4 flex-shrink-0">
                    <button onClick={onClickPocketButton}>
                        <img src="/free-icon-add-cart-4175027.png" alt="장바구니" className="w-6 h-6" />
                    </button>
                    <button onClick={onClickLikeButton}>
                        <img src="/free-icon-heart-1077035.png" alt="찜목록" className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </header>
    );

};

export default Header; 