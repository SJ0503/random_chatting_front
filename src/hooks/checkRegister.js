import { useState } from "react";
import { checkNicknameDuplicate } from "../utils/userAPI";

export const useCheckNickname = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const checkNickname = async (nickname) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const message = await checkNicknameDuplicate(nickname);
      setSuccessMessage(message); // "사용 가능한 닉네임입니다."  


    } catch (err) {
      setError(err.message || "닉네임 확인 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return { checkNickname, loading, error, successMessage };
};
