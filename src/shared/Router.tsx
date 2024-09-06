import { BrowserRouter,Routes,Route } from "react-router-dom"
import Login from "../pages/login/Login"
import Register from "../pages/register/Register"
import Main from "@/pages/main/Main"
import Mypage from "@/pages/mypage/Mypage"
import Registration from "@/pages/registration/Registration"


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/mypage" element={<Mypage />}/>
        <Route path="/registration" element={<Registration />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router