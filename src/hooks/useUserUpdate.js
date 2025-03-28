// hooks/useUserUpdate.js
import { useState } from "react";
import { updateUser, deleteUser } from "../utils/userAPI";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useUserUpdate = () => {
  const { user, setUser, handleLogout } = useAuth(); // 로그아웃도 가져옴
  const navigate = useNavigate();

  const [error] = useState(null);

  const handleUpdate = async ({ password, age, region }) => {
    try {
      const data = {
        user_password: password || undefined,
        user_age: parseInt(age),
        user_region: region,
      };

      await updateUser(data);

      const updated = {
        ...user,
        age,
        region,
      };

      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));

      alert("수정이 완료되었습니다!");
      navigate("/");
    } catch (err) {
      console.error("회원정보 수정 실패:", err);
      alert("수정 중 문제가 발생했습니다.");
    }
  };

  // ✅ 탈퇴 핸들러
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "탈퇴 시 24시간 동안 재가입이 불가능합니다.\n정말로 탈퇴하시겠습니까?"
    );

    if (!confirmed) return;

    try {
      await deleteUser(); // 🔥 백엔드에 탈퇴 요청 보내기
      handleLogout(); // ✅ 로컬에서도 로그아웃 처리
      alert("정상적으로 탈퇴되었습니다.");
      navigate("/");
    } catch (err) {
      console.error("탈퇴 실패:", err);
      alert("탈퇴 중 문제가 발생했습니다.");
    }
  };

  return { handleUpdate, handleDelete, error };
};
