import Header from "@/components/header/Header";
import useUserStore from "@/zustand/bearsStore";

const Payment = () => {
    const { user, selectedItems } = useUserStore();
    const FoundUser = user.length > 0 ? user[0] : null;

    const totalProductPrice = selectedItems.reduce((total, item) => {
        return total + (item.ProductPrice as number) * item.ProductQuantity;
    }, 0);

    const shippingFee = 3000;
    const totalPrice = totalProductPrice + shippingFee;

    return (
        <>
            <Header />
            <section className="checkout py-10 w-[60%] mx-auto pt-6">
                <div className="mx-auto bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-8">결제하기</h1>
                    <div className="space-y-8">
                        <div className="address-section">
                            <h2 className="text-xl font-semibold mb-4">배송지 정보</h2>
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <p className="mb-2"><strong>이름:</strong> {FoundUser?.name}</p>
                                <p className="mb-2"><strong>주소:</strong> 대구시 어딘가..</p> 
                            </div>
                        </div>

                        {/* 주문 상품 */}
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

                        {/* 결제 정보 */}
                        <div className="payment-section">
                            <h2 className="text-xl font-semibold mb-4">결제 정보</h2>
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <p className="mb-2"><strong>총 상품금액:</strong> {totalProductPrice.toLocaleString()}원</p>
                                <p className="mb-2"><strong>배송비:</strong> {shippingFee.toLocaleString()}원</p>
                                <p className="mb-2"><strong>총 결제금액:</strong> <span className="font-bold text-lg text-red-500">{totalPrice.toLocaleString()}원</span></p>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button className="bg-gray-700 text-white py-3 px-6 rounded-md hover:bg-gray-900">
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