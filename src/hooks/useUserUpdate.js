// hooks/useUserUpdate.js
import { useState } from "react";
import { updateUser } from "../utils/userAPI";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



export const useUserUpdate = () => {
const { user, setUser } = useAuth(); // 현재 로그인한 사용자 정보 가져오기
const navigate = useNavigate();

  const [error] = useState(null);

  const handleUpdate = async ({ password, age, region }) => {
    try {
      const data = {
        user_password: password || undefined,
        user_age: parseInt(age),
        user_region: region,
      };
  
      await updateUser(data); // 백엔드에 요청만 보내고 응답은 무시
  
      // ✅ 기존 유저 정보 유지 + 변경된 항목만 덮어쓰기
      const updated = {
        ...user,
        age,
        region,
      };
  
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
  
      alert("수정이 완료되었습니다!");
      navigate('/')

    } catch (err) {
      console.error("회원정보 수정 실패:", err);
      alert("수정 중 문제가 발생했습니다.");
    }
  };

  return { handleUpdate, error };
};