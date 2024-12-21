const API_BASE_URL = "http://127.0.0.1:8000"; // FastAPI 서버 주소

export const checkNicknameDuplicate = async (nickname) => {
  try {
    const response = await fetch(`${API_BASE_URL}/check-nickname?nickname=${nickname}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "닉네임 확인 중 문제가 발생했습니다.");
    }
    const data = await response.json();
    return data.message; // "사용 가능한 닉네임입니다."
  } catch (error) {
    throw error;
  }
};
