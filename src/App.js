import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FindMyID from "./pages/FindMyID"
import FindMyPW from "./pages/FindMyPW"


function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/findMyID" element={<FindMyID />} />
                    <Route path="/findMyPW" element={<FindMyPW />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
