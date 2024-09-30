import { Label } from "@radix-ui/react-label"
import Header from "@/components/header/Header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Storage 관련 함수 추가
import { db, storage } from "../../firebase"
import { useParams } from "react-router-dom"
import useUserStore from "@/zustand/bearsStore"
import { useNavigate } from "react-router-dom"

const RetouchProduct = () => {

  const { goods, updateGoods } = useUserStore()
  const { ProductUid } = useParams() as { ProductUid: string };
  const FoundGoods = goods.find(item => item.ProductUid === ProductUid)

  const [showImages, setShowImages] = useState<string | ArrayBuffer | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [changeProductName, setChangeProductName] = useState(`${FoundGoods?.ProductName}`)
  const [changeProductURL, setChangeProductURL] = useState(`${FoundGoods?.ProductURL}`)
  const [changeProductDescription, setChangeProductDescription] = useState(`${FoundGoods?.ProductDescription}`)
  const [changeProductPrice, setChangeProductPrice] = useState(`${FoundGoods?.ProductPrice}`)
  const [changeProductQuantity, setChangeProductQuantity] = useState(`${FoundGoods?.ProductQuantity}`)

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setShowImages(reader.result);
        setChangeProductURL(reader.result as string);
      };
      reader.readAsDataURL(file);
      console.log("업로드성공!")
    }
  }

  const navigate = useNavigate()

  const onClickUpdateProductButton = async (e: any) => {
    e.preventDefault();
    try {
      if (selectedFile) {
        const storageRef = ref(storage, `product/${ProductUid}`);
        await uploadBytes(storageRef, selectedFile);
        await getDownloadURL(storageRef);
      }
      const uid = ProductUid
      const ProductUpdateRef = doc(db, "goods", uid!)
      await updateDoc(ProductUpdateRef, {
        ProductURL: changeProductURL,
        ProductName: changeProductName,
        ProductDescription: changeProductDescription,
        ProductPrice: changeProductPrice
      })
      updateGoods({
        ProductUid: ProductUid,
        ProductURL: changeProductURL,
        ProductName: changeProductName,
        ProductDescription: changeProductDescription,
        ProductPrice: changeProductPrice,
        UserUid: FoundGoods?.UserUid,
        ProductQuantity: +changeProductQuantity
      })
      navigate("/")
    } catch (error) {
      alert("업데이트중 에러발생")
      console.log("업데이트중 에러발생", error)
    }
  }

  return (
    <>
      <Header />
      <div className="w-[60%] mx-auto pt-6">
        <h1 className="text-bold text-3xl mb-10 flex justify-center">상품정보 수정하기</h1>
        <div className="flex justify-between mb-10 gap-[30px]">
          <div className="flex-1">
            <Label>등록할 상품 사진</Label>
            <div className="border border-gray-400 h-[450px] rounded-md flex justify-center items-center">
              <label htmlFor="change-product-picture" className="flex justify-center items-center h-full w-full">
                {showImages ? (
                  <img src={showImages as string} className="w-[80%] aspect-[1/1]" alt="Uploaded Preview" />
                ) : (
                  <img src={changeProductURL} className="w-[80%] aspect-[1/1]" alt="Placeholder" />
                )}
              </label>
              <input
                className="sr-only"
                id="change-product-picture"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-5 h-[450px]">
            <div>
              <Label htmlFor="change-product-name">상품명</Label>
              <Input
                className=" border-gray-400 mb-5"
                type="text"
                id="change-product-name"
                value={changeProductName}
                onChange={(e) => { setChangeProductName(e.target.value) }}
              />
            </div>
            <div>
              <Label htmlFor="change-product-description">상품설명</Label>
              <div className="h-[150px] border border-gray-400 rounded-md">
                <input
                  className="border-0 focus:outline-none focus:ring-0 w-full h-full px-2 py-1"
                  type="text"
                  id="change-product-description"
                  value={changeProductDescription}
                  onChange={(e) => { setChangeProductDescription(e.target.value) }}
                />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex-1">
                <Label htmlFor="change-product-price">가격</Label>
                <Input
                  className=" border-gray-400 mb-5"
                  type="number"
                  id="change-product-price"
                  value={changeProductPrice}
                  onChange={(e) => setChangeProductPrice(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="product-quantity">상품수량</Label>
                <Input
                  className="border-gray-400 mb-5"
                  type="number"
                  id="product-quantity"
                  value={changeProductQuantity}
                  onChange={(e) => { setChangeProductQuantity(e.target.value) }}
                />
              </div>
            </div>
          </div>
        </div>
        <Button className="w-full h-[80px] bg-black" onClick={onClickUpdateProductButton}>수정하기</Button>
      </div>
    </>
  )
}

export default RetouchProduct