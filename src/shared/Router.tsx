import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../pages/login/Login"
import Register from "../pages/register/Register"
import Main from "@/pages/main/Main"
import Mypage from "@/pages/mypage/Mypage"
import Registration from "@/pages/registration/Registration"
import ProductDetail from "@/pages/productDetail/ProductDetail"
import RetouchProduct from "@/pages/retouchProduct/RetouchProduct"


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/productDetail/:ProductUid" element={<ProductDetail />} />
        <Route path="/retouchProduct/:ProductUid" element={<RetouchProduct />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router