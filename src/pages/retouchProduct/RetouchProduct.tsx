import { Label } from "@radix-ui/react-label"
import Header from "@/components/header/Header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { doc, updateDoc } from "firebase/firestore";
import {db} from "../../firebase"

const RetouchProduct = () => {
  const [showImages, setShowImages] = useState<string | ArrayBuffer | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
              <label htmlFor="change-product-picture" className="flex justify-center items-center h-full w-full">
                {showImages ? (
                  <img src={showImages as string} className="w-[80%] aspect-[1/1]" alt="Uploaded Preview" />
                ) : (
                  <img src="/free-icon-addition-thick-symbol-20183.png" className="w-[30%]" alt="Placeholder" />
                )}
              </label>
              <input
                className="sr-only"
                id="change-product-picture"
                type="file"
                accept="image/*"
                onChange={handleImageChange} // 이미지 변경 핸들러
              />
            </div>
            {uploading && <p className="mt-2 text-black">이미지 업로드 중...</p>} {/* 업로드 상태 표시 */}
          </div>
          <div className="flex-1">
            <div>
              <Label htmlFor="change-product-name">상품명</Label>
              <Input
                className=" border-gray-400 mb-5"
                type="text"
                id="change-product-name"
              // onChange에서 직접 처리
              />
            </div>
            <div>
              <Label htmlFor="change-product-description">상품설명</Label>
              <div className="h-[282px] border border-gray-400 rounded-md">
                <input
                  className="border-0 focus:outline-none focus:ring-0 w-full"
                  type="text"
                  id="change-product-description"
                // onChange에서 직접 처리
                />
              </div>
            </div>
            <div>
              <Label htmlFor="change-product-price">가격</Label>
              <Input
                className=" border-gray-400 mb-5"
                type="number"
                id="change-product-price"
              // onChange에서 직접 처리
              />
            </div>
          </div>
        </div>
        <Button className="w-full h-[80px] bg-black">수정하기</Button>
      </div>
    </>
  )
}

export default RetouchProduct