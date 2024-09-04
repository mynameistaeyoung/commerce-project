import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChange = (event: any) => {
        const {
            target: { id, value },
        } = event;
        if (id === "user_email") {
            setEmail(value);
        }
        if (id === "user_password") {
            setPassword(value);
        }
    };

    const signIn = async (e: any) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("로그인 성공");
            navigate("/");
        } catch (error: any) {
            alert('아이디 혹은 비밀번호를 다시 확인해주세요')
            console.log("에러발생",error)
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log("user", user);
        });
    }, []);

return (
    <div className="w-[80%] min-h-screen flex justify-center items-center gap-10 max-w-screen-lg min-w-[1000px] mx-auto">
        <div className="flex-1">
            <h1 className="text-3xl font-bold mb-8">패션앱에 오신 것을 환영합니다!</h1>
        </div>

        <div className="w-full max-w-xl mx-auto flex-1">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_id">
                    아이디
                </label>
                <Input
                    id="user_email"
                    type="text"
                    placeholder="아이디를 입력해주세요!"
                    value={email}
                    onChange={onChange}
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_password">
                    비밀번호
                </label>
                <Input
                    id="user_password"
                    type="password"
                    placeholder="비밀번호를 입력해주세요!"
                    value={password}
                    onChange={onChange}
                />
            </div>

            <div className="items-center justify-between">
                <Button
                    className="bg-black w-full mb-3"
                    onClick={signIn}
                >
                    로그인
                </Button>
                <Link
                    className="font-bold"
                    to={"/register"}>회원가입</Link>
            </div>
        </div>
    </div>
);
}

export default Login;
