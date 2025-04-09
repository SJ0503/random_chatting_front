import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FindMyPW from "./pages/FindMyPW";
import KaKaoRegister from "./pages/KakaoRegister";
import KakaoCallback from "./pages/KakaoCallback";
import { AuthProvider } from "./context/AuthContext.js"; // ✅ 전역 인증 상태 관리
import UserInfo from "./pages/UserInfo.js";
import ResetPW from "./pages/ResetPW.js";
import RandomChatRoom from "./pages/RandomChatRoom.js";
import OpenChatRoom from "./pages/OpenChatRoom.js";

function App() {
  return (
    <Router>
      <AuthProvider> {/* ✅ 전역 상태 관리 적용 */}

        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/kakaoRegister" element={<KaKaoRegister />} />
            <Route path="/userInfo" element={<UserInfo />} />
            <Route path="/findMyPW" element={<FindMyPW />} />
            <Route path="/resetPW"   element={<ResetPW />}/>
            <Route path="/kakaoCallback" element={<KakaoCallback />} />
            <Route path="/openChat" element={<OpenChatRoom />} />
            <Route path="/randomChat" element={<RandomChatRoom />} />
          </Routes>
        </Layout>
      </AuthProvider>

    </Router>
  );
}

export default App;
