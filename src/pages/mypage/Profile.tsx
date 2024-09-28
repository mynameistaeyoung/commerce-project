import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '@/zustand/bearsStore';
import { Button } from '@/components/ui/button';
import KakaoMap from '@/components/map/KakaoMap';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';

import { auth, db } from '../../firebase';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';

interface InputFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id: string;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    value,
    onChange,
    id,
}) => (
    <div className="flex text-xl mb-5">
        <Label htmlFor={id} className="w-[100px] flex-shrink-0">
            {label}
        </Label>
        <Input type="text" id={id} value={value} onChange={onChange} />
    </div>
);

export const Profile = () => {
    const { user, updateUser } = useUserStore();
    const FoundUser = user.length > 0 ? user[0] : null;

    const [changeUserName, setChangeUserName] = useState(`${FoundUser?.name}`);
    const [changeUserDate, setChangeUserDate] = useState(`${FoundUser?.date}`);
    const [changeUserNumber, setChangeUserNumber] = useState(`${FoundUser?.number}`);
    const [changeUserEmail, setChangeUserEmail] = useState(`${FoundUser?.email}`);
    const [changeUserSeller, setChangeUserSeller] = useState(`${FoundUser?.seller}`);
    const [fullAddress, setFullAddress] = useState<string>('');
    const [address, setAddress] = useState<string>(FoundUser?.addresses || "");
    const userUid = auth.currentUser?.uid;

    const [addressList, setAddressList] = useState<string[]>([]);
    const [newAddress, setNewAddress] = useState<string>('');
    const [addNewAddress, setAddNewAddress] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAddresses = async () => {
            if (!userUid) return;

            try {
                const docRef = doc(db, 'user', userUid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setAddressList(userData.addresses || []);
                }
            } catch (error) {
                console.error("주소 목록을 불러오는 중 오류 발생:", error);
            }
        };

        fetchAddresses();
    }, [userUid]);

    const changeUserProfileButton = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!userUid) return;
            const changeUserRef = doc(db, 'user', userUid);
            await updateDoc(changeUserRef, {
                name: changeUserName,
                date: changeUserDate,
                number: changeUserNumber,
                seller: Boolean(changeUserSeller),
                email: changeUserEmail,
                addresses: arrayUnion(fullAddress),
            });
            updateUser({
                name: changeUserName,
                date: changeUserDate,
                number: changeUserNumber,
                seller: Boolean(changeUserSeller),
                uid: FoundUser?.uid,
                email: changeUserEmail,
                addresses: [...addressList, fullAddress],
            });
            alert('유저정보가 변경되었습니다.');
            navigate('/mypage');
        } catch (error) {
            console.log('정보를 바꾸는데 실패했습니다', error);
        }
    };

    const handleAddressChange = (selectedAddress: string) => {
        if (selectedAddress === 'new') {
            setAddNewAddress(true);
            setNewAddress("");
        } else {
            setAddNewAddress(false);
            setAddress(selectedAddress);
        }
    };

    return (
        <>
            <section className="pl-10">
                <h2 className="text-3xl mb-[30px]">내 정보</h2>

                <div className="flex text-xl mb-5">
                    <Label className="w-[100px]">이메일 : </Label>
                    <p>{FoundUser?.email}</p>
                </div>

                <InputField
                    label="이름 : "
                    value={changeUserName}
                    onChange={(e) => setChangeUserName(e.target.value)}
                    id="user-name"
                />

                <InputField
                    label="전화번호 : "
                    value={changeUserNumber}
                    onChange={(e) => setChangeUserNumber(e.target.value)}
                    id="user-number"
                />

                <InputField
                    label="생년월일 : "
                    value={changeUserDate}
                    onChange={(e) => setChangeUserDate(e.target.value)}
                    id="user-date"
                />

                <div className="flex text-xl mb-5">
                    <Label className="w-[100px] flex-shrink-0">주소지 :</Label>
                    <select
                        value={fullAddress}
                        onChange={(e) => setFullAddress(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="">주소를 선택하세요</option>
                        {addressList.map((address, idx) => (
                            <option key={idx} value={address}>
                                {address}
                            </option>
                        ))}
                        <option value="new">새로운 주소 추가</option>
                    </select>
                    {addNewAddress && (
                        <KakaoMap fullAddress={newAddress} setFullAddress={setNewAddress} userUid={FoundUser?.uid} />
                    )}
                </div>
                <div className="flex justify-end">
                    <Button onClick={changeUserProfileButton}>수정하기</Button>
                </div>
            </section>
        </>
    );
};

export default Profile;

