import { useEffect, useState } from "react";
import Header from "@/components/header/Header";
import useUserStore from "@/zustand/bearsStore";
import Postcode from "@/components/map/KakaoMap";
import { addNewAddressToUser, fetchUserAddresses } from '@/components/utils/utils';
import { Button } from "@/components/ui/button";

const Payment = () => {
    const { user, selectedItems } = useUserStore();
    const FoundUser = user.length > 0 ? user[0] : null;
    const [address, setAddress] = useState<string>(FoundUser?.addresses || "");
    const [addressList, setAddressList] = useState<string[]>([]);
    const [addNewAddress, setAddNewAddress] = useState<boolean>(false);
    const [newAddress, setNewAddress] = useState<string>("");
    const userUid = FoundUser?.uid;

    const totalProductPrice = selectedItems.reduce((total, item) => {
        return total + (item.ProductPrice as number) * item.ProductQuantity;
    }, 0);

    const shippingFee = 3000;
    const totalPrice = totalProductPrice + shippingFee;

    useEffect(() => {
        const fetchAddresses = async () => {
            if (!userUid) return;

            const addresses = await fetchUserAddresses(userUid);
            setAddressList(addresses);

            if (addresses.length > 0) {
                setAddress(addresses[0]);
            }
        };

        fetchAddresses();
    }, [userUid]);

    const handleAddressChange = (selectedAddress: string) => {
        if (selectedAddress === 'new') {
            setAddNewAddress(true);
            setNewAddress("");
        } else {
            setAddNewAddress(false);
            setAddress(selectedAddress);
        }
    };

    const handlePayment = async () => {
        alert("결제가 완료되었습니다.");
    };

    const addressPlusButton = async () => {
        if (addNewAddress && newAddress) {
            const success = await addNewAddressToUser(userUid!, newAddress);
            if (success) {
                setAddressList(prev => [...prev, newAddress]);
                setAddress(newAddress);
                setAddNewAddress(false);
                alert("주소가 성공적으로 추가되었습니다.");
            } else {
                alert("주소 추가에 실패했습니다.");
            }
        }
    }

    return (
        <>
            <Header />
            <section className="checkout py-10 w-[60%] mx-auto pt-6">
                <div className="mx-auto bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-8">결제하기</h1>
                    <div className="space-y-8">
                        <div className="address-section">
                            <h2 className="text-xl font-semibold mb-4">배송지 정보</h2>
                            <div className="bg-gray-100 p-4 rounded-lg mb-3">
                                <p className="mb-2"><strong>이름:</strong> {FoundUser?.name}</p>
                                <p className="mb-2"><strong>선택한 주소:</strong> {address || "주소를 선택하세요"}</p>
                            </div>

                            <h3 className="text-lg font-semibold mb-2">기존 주소 선택</h3>
                            <select
                                className="w-full p-2 border rounded-md mb-4"
                                value={addNewAddress ? 'new' : address}
                                onChange={(e) => handleAddressChange(e.target.value)}
                            >
                                <option value="">주소를 선택하세요</option>
                                {addressList.map((addr, idx) => (
                                    <option key={idx} value={addr}>
                                        {addr}
                                    </option>
                                ))}
                                <option value="new">새로운 주소 추가</option>
                            </select>

                            {addNewAddress && (
                                <>
                                    <Postcode
                                        fullAddress={newAddress}
                                        setFullAddress={setNewAddress}
                                        userUid={FoundUser?.uid}
                                    />
                                    <Button
                                        onClick={addressPlusButton}
                                        className="mt-5 flex justify-end">
                                        주소 추가
                                    </Button>
                                </>
                            )}
                        </div>

                        <div className="order-items">
                            <h2 className="text-xl font-semibold mb-4">주문 상품</h2>
                            <ul className="space-y-4">
                                {selectedItems.map((item) => (
                                    <li
                                        key={item.ProductUid}
                                        className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
                                    >
                                        <div className="flex items-center">
                                            <img
                                                src={item.ProductURL}
                                                alt={item.ProductName}
                                                className="w-16 h-16 rounded-md mr-4"
                                            />
                                            <div>
                                                <p className="text-lg font-medium">{item.ProductName}</p>
                                                <p className="text-sm text-gray-500">{item.ProductPrice}원 x {item.ProductQuantity}</p>
                                            </div>
                                        </div>
                                        <div className="text-lg font-medium">
                                            {(item.ProductPrice as number) * item.ProductQuantity}원
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="payment-section">
                            <h2 className="text-xl font-semibold mb-4">결제 정보</h2>
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <p className="mb-2"><strong>총 상품금액:</strong> {totalProductPrice.toLocaleString()}원</p>
                                <p className="mb-2"><strong>배송비:</strong> {shippingFee.toLocaleString()}원</p>
                                <p className="mb-2"><strong>총 결제금액:</strong> <span className="font-bold text-lg text-red-500">{totalPrice.toLocaleString()}원</span></p>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={handlePayment}
                                    className="bg-gray-700 text-white py-3 px-6 rounded-md hover:bg-gray-900"
                                >
                                    결제하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Payment;






