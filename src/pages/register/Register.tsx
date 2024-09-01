import { Link } from "react-router-dom"

const Register = () => {
  return (
    <div>
        <div>Register</div>
        <Link to={"/login"}>로그인하러가기</Link>
    </div>
  )
}

export default Register