import { BrowserRouter,Routes,Route } from "react-router-dom"
import Login from "../pages/login/Login"
import Register from "../pages/register/Register"
import App from "../App"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router