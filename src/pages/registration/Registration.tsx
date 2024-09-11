import Header from "@/components/header/Header"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore"
import { auth, db } from "../../firebase"
import uuid from 'react-uuid'
import useUserStore from "@/zustand/bearsStore"

const Registration = () => {

    const { setGoods } = useUserStore()

    const [productName, setProductName] = useState("")
    const [productDescription, setProductDescription] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [showImages, setShowImages] = useState<string | ArrayBuffer | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const navigate = useNavigate()

    const onClickRegistrationButtonHandler = async (e: any) => {
        e.preventDefault();

        if (!selectedFile) {
            console.log("이미지를 선택해주세요.");
            return;
        }

        const productUuid = uuid();
        const storageRef = ref(storage, `images/${uuid()}`);
        try {
            const snapshot = await uploadBytes(storageRef, selectedFile);
            console.log("업로드 성공:", snapshot);
            const uid = auth.currentUser?.uid
            const downloadURL = await getDownloadURL(snapshot.ref);
            await setDoc(doc(db, 'goods', productUuid), {
                ProductDescription: productDescription,
                ProductName: productName,
                ProductPrice: productPrice,
                ProductURL: downloadURL,
                UserUid: uid,
                ProductUid: productUuid
            });
            setGoods({
                ProductDescription: productDescription,
                ProductName: productName,
                ProductPrice: productPrice,
                ProductURL: downloadURL,
                UserUid: uid,
                ProductUid: productUuid
            })
            navigate("/");
        } catch (error) {
            console.log("업로드 중 에러 발생:", error);
        } finally {
            setUploading(false);
        }
    }

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setShowImages(reader.result);
            };
            reader.readAsDataURL(file);
            console.log("업로드성공!")
        }
    }

    return (
        <>
            <Header />
            <div className="w-[60%] mx-auto pt-6">
                <h1 className="text-bold text-3xl mb-10 flex justify-center">상품등록하기</h1>
                <div className="flex justify-between mb-10 gap-[30px]">
                    <div className="flex-1">
                        <Label>등록할 상품 사진</Label>
                        <div className="border border-gray-400 h-[450px] rounded-md flex justify-center items-center">
                            <label htmlFor="product-picture" className="flex justify-center items-center h-full w-full">
                                {showImages ? (
                                    <img src={showImages as string} className="w-[80%] aspect-[1/1]" alt="Uploaded Preview" />
                                ) : (
                                    <img src="/free-icon-addition-thick-symbol-20183.png" className="w-[30%]" alt="Placeholder" />
                                )}
                            </label>
                            <input
                                className="sr-only"
                                id="product-picture"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange} // 이미지 변경 핸들러
                            />
                        </div>
                        {uploading && <p className="mt-2 text-black">이미지 업로드 중...</p>} {/* 업로드 상태 표시 */}
                    </div>
                    <div className="flex-1">
                        <div>
                            <Label htmlFor="product-name">상품명</Label>
                            <Input
                                className=" border-gray-400 mb-5"
                                type="text"
                                id="product-name"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)} // onChange에서 직접 처리
                            />
                        </div>
                        <div>
                            <Label htmlFor="product-description">상품설명</Label>
                            <div className="h-[282px] border border-gray-400 rounded-md">
                                <input
                                    className="border-0 focus:outline-none focus:ring-0 w-full"
                                    type="text"
                                    id="product-description"
                                    value={productDescription}
                                    onChange={(e) => setProductDescription(e.target.value)} // onChange에서 직접 처리
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="product-price">가격</Label>
                            <Input
                                className=" border-gray-400 mb-5"
                                type="number"
                                id="product-price"
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)} // onChange에서 직접 처리
                            />
                        </div>
                    </div>
                </div>
                <Button onClick={onClickRegistrationButtonHandler} className="w-full h-[80px] bg-black">등록하기</Button>
            </div>
        </>
    )
}

export default Registration;