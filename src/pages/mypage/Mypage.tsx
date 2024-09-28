import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '@/components/header/Header';
import BgChangButton from '@/components/ui/BgChangeButton';

import ChangeMyPassword from './ChangeMyPassword';
import UserLike from './UserLike';
import Pocket from './Pocket';

import Profile from './Profile';

const Mypage = () => {
    const [activeMenu, setActiveMenu] = useState('내 정보');
    const menuItems = ['내 정보', '비밀번호 변경', '찜한항목', '장바구니'];

    const location = useLocation();
    useEffect(() => {
        if (location.state?.activeMenu) {
            setActiveMenu(location.state.activeMenu);
        }
    }, [location.state]);

    return (
        <>
            <Header />

            <div className="w-[60%] mx-auto pt-6 flex">
                <section className="border-r border-black max-w-[150px] h-[600px]">
                    <h2 className="text-2xl mb-[30px] ">마이페이지</h2>
                    {menuItems.map((item) => (
                        <BgChangButton
                            key={item}
                            title={item}
                            activeMenu={activeMenu}
                            setActiveMenu={setActiveMenu}
                        />
                    ))}
                </section>
                <section className="w-full">
                    {activeMenu === '내 정보' ? (
                        <Profile />
                    ) : activeMenu === '비밀번호 변경' ? (
                        <ChangeMyPassword />
                    ) : activeMenu === '찜한항목' ? (
                        <UserLike />
                    ) : activeMenu === '장바구니' ? (
                        <Pocket />
                    ) : null}
                </section>
            </div>
        </>
    );
};

export default Mypage;