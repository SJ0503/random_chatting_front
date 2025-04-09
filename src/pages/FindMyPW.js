import React, { useState, useEffect } from "react";
import InputField from "../components/Fields/InputField";
import { handleSendVerificationCode, handleVerifyCodeForFindPW } from "../handlers/registerHandlers";
import { useFindPW } from "../hooks/useFindPW"; // ✅ findPW 훅 사용
import { useNavigate } from "react-router-dom";

function FindMyPW() {
    const [email, setEmail] = useState("");
    const [isEmailDisabled, setIsEmailDisabled] = useState(false);
    const [timer, setTimer] = useState(0);
    const [code, setCode] = useState("");
    const [isCodeDisabled, setIsCodeDisabled] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const { sendVerificationCode, verifyCode } = useFindPW();
    const navigate = useNavigate();

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else if (!isVerified) {
            setIsEmailDisabled(false);
        }
    }, [timer, isVerified]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="w-full max-w-lg bg-white p-10 rounded-2xl border-2 border-black shadow">
                <h2 className="text-2xl font-bold my-5 text-center">비밀번호 찾기</h2>

                <small className="block mb-10 text-sm text-center text-gray-500">
                    가입된 이메일 인증 후 비밀번호 재설정 가능
                </small>

                <form className="space-y-6">
                    {/* 이메일 입력 */}
                    <div className="grid grid-cols-3 gap-4 items-center mb-4">
                        <div className="col-span-2">
                            <InputField
                                id="email"
                                type="email"
                                placeholder="이메일"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isEmailDisabled || isVerified}
                                className={`${isEmailDisabled || isVerified ? "cursor-not-allowed bg-gray-200" : ""}`}
                            />
                        </div>
                        {timer > 0 && !isVerified ? (
                            <div className="w-full h-12 flex items-center justify-center bg-gray-300 text-gray-700 px-4 py-2 rounded">
                                {Math.floor(timer / 60)}분 {timer % 60}초
                            </div>
                        ) : (
                            <button
                                type="button"
                                className={`w-full h-12 px-2 py-2 rounded ${isVerified ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"}`}
                                onClick={async () =>
                                    await handleSendVerificationCode(
                                        email,
                                        setIsEmailDisabled,
                                        setTimer,
                                        sendVerificationCode
                                    )
                                }
                                disabled={isVerified}
                            >
                                {isVerified ? "인증완료" : "인증번호 전송"}
                            </button>
                        )}
                    </div>

                    {/* 인증번호 입력 및 확인 */}
                    <div className="grid grid-cols-3 gap-4 items-center mb-4">
                        <div className="col-span-2">
                            <InputField
                                id="code"
                                type="text"
                                placeholder="인증번호"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                disabled={isCodeDisabled || isVerified}
                            />
                        </div>
                        <button
                            type="button"
                            className={`w-full h-12 px-4 py-2 rounded ${isCodeDisabled || isVerified ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"}`}
                            onClick={async () => {
                                const verified = await handleVerifyCodeForFindPW(
                                    email,
                                    code,
                                    verifyCode,
                                    setIsCodeDisabled,
                                    setIsVerified,
                                    setTimer,
                                    setIsEmailDisabled
                                );
                                if (verified) navigate("/resetPW", { state: { email } });
                            }}
                            disabled={isCodeDisabled || isVerified}
                        >
                            {isVerified ? "인증완료" : "확인"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FindMyPW;
