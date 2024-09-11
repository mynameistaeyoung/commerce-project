import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import useUserStore from "@/zustand/bearsStore";


const Register = () => {

  const { setUser } = useUserStore()

  const navigate = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [number, setNumber] = useState("")
  const [seller, setSeller] = useState(false)

  const onChange = (event: any) => {
    const {
      target: { id, value },
    } = event;
    if (id === "user_create_email") {
      setEmail(value)
    }
    if (id === "user_create_password") {
      setPassword(value)
    }
    if (id === "user_create_name") {
      setName(value)
    }
    if (id === "user_create_date") {
      setDate(value)
    }
    if (id === "user_create_number") {
      setNumber(value)
    }
  }

  const signUp = async (event: any) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'user', user.uid), {
        date: date,
        email: email,
        name: name,
        number: number,
        uid: user.uid,
        seller: seller,
      });
      setUser({
        date: date,
        email: email,
        name: name,
        number: number,
        uid: user.uid,
        seller: seller,
      })
      console.log("Document written with ID: ");
      navigate("/login");
    } catch (error: any) {
      console.log("에러 발생", error.message, error.code);
      switch (error.code) {
        case 'auth/invalid-email':
          alert('이메일을 바르게 입력해주세요.')
          break
        case 'auth/weak-password':
          alert('비밀번호가 너무 쉬워요.')
          break
        case 'auth/email-already-in-use':
          alert('등록된 이메일 입니다.')
          break
        default:
          alert('회원가입 실패')
          break
      };
    }
  };

  return (
    <form onSubmit={signUp} className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-8">회원가입</h1>
      <div className="w-full max-w-2xl mx-auto">
        {/* 이메일 */}
        <div className="mb-4">
          <Label htmlFor="user_create_email">
            이메일
          </Label>
          <Input
            id="user_create_email"
            type="email"
            placeholder="이메일을 입력해주세요!"
            value={email}
            onChange={onChange}
          />
        </div>

        {/* 비밀번호 */}
        <div className="mb-4">
          <Label htmlFor="user_create_password">
            비밀번호
          </Label>
          <Input
            id="user_create_password"
            type="password"
            placeholder="사용하실 비밀번호 입력해주세요!"
            value={password}
            onChange={onChange}
          />
        </div>

        {/* 이름 */}
        <div className="mb-4">
          <Label htmlFor="user_name">
            이름
          </Label>
          <Input
            id="user_create_name"
            type="text"
            placeholder="성함을 입력해주세요!"
            value={name}
            onChange={onChange}
          />
        </div>

        {/* 생년월일 */}
        <div className="mb-4">
          <Label htmlFor="user_create_date">
            생년월일
          </Label>
          <Input
            id="user_create_date"
            type="text"
            placeholder="생년월일을 입력해주세요!"
            value={date}
            onChange={onChange}
          />
        </div>

        {/* 전화번호 */}
        <div className="mb-8">
          <Label htmlFor="user_number">
            전화번호
          </Label>
          <Input
            id="user_create_number"
            type="text"
            placeholder="전화번호를 입력해주세요!"
            value={number}
            onChange={onChange}
          />
        </div>
        <div>
          <Checkbox
            id="seller"
            className="mb-5 mr-2"
            value={seller}
            onClick={() => { setSeller(!seller) }}
          />
          <Label htmlFor="seller">판매자입니까?</Label>
        </div>
        <Button
          className="bg-black w-full mb-5"
          type="submit">
          계정 생성하기
        </Button>

        <Button
          className="bg-black w-full"
          onClick={() => { navigate("/login") }}>
          로그인하러가기
        </Button>
      </div>
    </form>
  )
}

export default Register