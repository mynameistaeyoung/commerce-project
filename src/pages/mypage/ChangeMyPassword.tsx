import { auth } from "../../firebase";
import { useState } from "react";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ChangeMyPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const user = auth.currentUser;
  const navigate = useNavigate()

  const reauthenticateAndChangePassword = async () => {
    if (!user || !currentPassword || !newPassword) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email!, currentPassword);

      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);
      alert("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/")
    } catch (error) {
      console.error("비밀번호 변경 중 오류 발생: ", error);
      alert("비밀번호 변경에 실패했습니다. 오류: ");
    }
  };

  return (
    <div >
      <h2 className="text-3xl mb-[30px] ml-[30px]">비밀번호 변경하기</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          reauthenticateAndChangePassword();
        }}
        className="flex flex-col ml-[30px] gap-[10px] w-full"
      >
        <label htmlFor="current-password" className="block mb-2">현재 비밀번호</label>
        <input
          type="password"
          id="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="border p-2 rounded-md w-full"
        />

        <label htmlFor="new-password" className="block mb-2 border-gray-300">새 비밀번호</label>
        <input
          type="password"
          id="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 rounded-md w-full border-gray-300"
        />
        <Button type="submit" className="mt-[10px] bg-black">
          비밀번호 변경
        </Button>
      </form>
    </div>
  );
};

export default ChangeMyPassword;