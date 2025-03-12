import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FindMyID from "./pages/FindMyID"
import FindMyPW from "./pages/FindMyPW"
import KaKaoRegister from "./pages/KakaoRegister";
import KakaoCallback from "./pages/KakaoCallback";


function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/kakaoRegister" element={<KaKaoRegister />} />
                    <Route path="/findMyID" element={<FindMyID />} />
                    <Route path="/findMyPW" element={<FindMyPW />} />
                    <Route path="/kakaoCallback" element={<KakaoCallback />} />

                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
