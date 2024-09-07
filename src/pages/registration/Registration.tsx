import Header from "@/components/header/Header"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const Registration = () => {

    const navigate = useNavigate()
    const onClickRegistrationButtonHandler = () => { navigate("/") }

    return (
        <>
            <Header />
            <div className="w-[60%] mx-auto pt-6">
                <h1 className="text-bold text-3xl mb-10 flex justify-center">상품등록하기</h1>
                <div className="flex justify-between mb-10 gap-[30px]">
                    <div className="flex-1">
                        <Label>등록할 상품 사진</Label>
                        <div className="border border-gray-400 h-[450px] rounded-md flex justify-center items-center">
                            <label htmlFor="picture">사진을 등록해주세요</label>
                            <input className="sr-only h-[450px]" id="picture" type="file" accept="image/*" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div>
                            <Label htmlFor="goods">상품명</Label>
                            <Input className=" border-gray-400 mb-5" id="goods" />
                        </div>
                        <div>
                            <Label>상품설명</Label>
                            <div className="h-[282px] border border-gray-400 rounded-md">
                                <input className="border-0 focus:outline-none focus:ring-0 w-full" />
                            </div>
                        </div>
                        <div>
                            <Label>가격</Label>
                            <Input className=" border-gray-400 mb-5" />
                        </div>
                    </div>
                </div>
                <Button onClick={onClickRegistrationButtonHandler} className="w-full h-[80px] bg-black">등록하기</Button>
            </div>
        </>
    )
}

export default Registration