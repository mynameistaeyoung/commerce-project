import BgChangButton from "@/components/ui/BgChangeButton"
import { useState } from "react";

const Collect = () => {
    const [activeMenu, setActiveMenu] = useState('내 정보');
    const menuItems = ['내 정보', '비밀번호 변경', '찜한항목', '장바구니'];
    return (
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
    )
}

export default Collect