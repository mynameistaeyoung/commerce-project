import { BrowserRouter,Routes,Route } from "react-router-dom"
import Login from "../pages/login/Login"
import Register from "../pages/register/Register"
import Main from "@/pages/main/Main"


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router