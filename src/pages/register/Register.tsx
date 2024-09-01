import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const navigate = useNavigate();

  const onClickCreateButton = () => {
    navigate("/login")
  }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-8">회원가입</h1>
      <div className="w-full max-w-2xl mx-auto">
        {/* 아이디 */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_create_id">
            아이디
          </label>
          <Input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-300"
            id="user_create_id"
            type="text"
            placeholder="사용하실 아이디를 입력해주세요!"
          />
        </div>

        {/* 비밀번호 */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_create_password">
            비밀번호
          </label>
          <Input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border-gray-300"
            id="user_create_password"
            type="password"
            placeholder="사용하실 비밀번호 입력해주세요!"
          />
        </div>

        {/* 이름 */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_name">
            이름
          </label>
          <Input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border-gray-300"
            id="user_name"
            type="text"
            placeholder="성함을 입력해주세요!"
          />
        </div>

        {/* 생년월일 */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_create_date">
            생년월일
          </label>
          <Input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border-gray-300"
            id="user_create_date"
            type="text"
            placeholder="생년월일을 입력해주세요!"
          />
        </div>

        {/* 전화번호 */}
        <div className="mb-8">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_number">
            전화번호
          </label>
          <Input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border-gray-300"
            id="user_number"
            type="text"
            placeholder="비밀번호를 입력해주세요!"
          />
        </div>
        <button
          className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          onClick={onClickCreateButton}>
          계정 생성하기
        </button>
      </div>
    </div>
  )
}

export default Register