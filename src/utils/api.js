// ✅ utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: true, // ✅ 쿠키 포함 요청 (refresh-token용)
});

// ✅ [요청 인터셉터] → 모든 요청에 accessToken 자동 첨부
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// ✅ [응답 인터셉터] → accessToken 만료 시 자동 재발급
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    // 🔐 401 에러 + accessToken 존재 + 재시도 안 했을 때만
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("accessToken")
    ) {
      originalRequest._retry = true;
      try {
        // 🔄 refresh-token으로 accessToken 재발급 요청
        const res = await axios.post(
          "http://127.0.0.1:8000/refresh-token",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // 🔁 실패한 요청 재시도
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("🔒 토큰 갱신 실패:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        window.location.href = "/login"; // 🔄 로그인 페이지로 이동
      }
    }

    return Promise.reject(error);
  }
);

export default api;
