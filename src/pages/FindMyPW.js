import React from "react";

function FindMyPW() {

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white p-10 rounded-2xl border-2 border-black shadow">
                <h2 className="text-2xl font-bold mb-10 text-center">비밀번호 찾기</h2>

                <form className="space-y-6">

                    {/* 저장 버튼 */}
                    <div className="text-center pt-4">
                        <div className="flex justify-center gap-4">
                            {/* 이메일 입력 */}
                            <div className="grid grid-cols-3 gap-4 items-center mb-4">
                                <div className="col-span-2">
                                    <InputField
                                        id="email"
                                        type="email"
                                        placeholder="이메일"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isEmailDisabled || isVerified} // 인증 완료 시 비활성화
                                        className={`${isEmailDisabled || isVerified ? "cursor-not-allowed bg-gray-200" : ""}`}
                                    />
                                </div>

                                {timer > 0 && !isVerified ? ( // 인증 완료 전 타이머 표시
                                    <div className="w-full h-12 flex items-center justify-center bg-gray-300 text-gray-700 px-4 py-2 rounded">
                                        {Math.floor(timer / 60)}분 {timer % 60}초
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        className={`w-full h-12 px-4 py-2 rounded ${isVerified ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"
                                            }`}
                                        onClick={async () =>
                                            await handleSendVerificationCode(
                                                email,
                                                setIsEmailDisabled,
                                                setTimer,
                                                sendVerificationCode
                                            )
                                        }
                                        disabled={isVerified} // 인증 완료 시 버튼 비활성화
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
                                        disabled={isCodeDisabled || isVerified} // 인증 완료 시 비활성화
                                    // className={`${isVerified ? "cursor-not-allowed bg-gray-200" : ""}`}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className={`w-full h-12 px-4 py-2 rounded ${isCodeDisabled || isVerified ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"}`}
                                    onClick={async () =>
                                        await handleVerifyCode(
                                            email,
                                            code,
                                            verifyCode,
                                            setIsCodeDisabled,
                                            setIsVerified,
                                            setTimer,
                                            setIsEmailDisabled
                                        )
                                    }
                                    disabled={isCodeDisabled || isVerified} // 인증 완료 시 버튼 비활성화
                                >
                                    {isVerified ? "인증완료" : "확인"}
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
                            >
                                인증하기
                            </button>

                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default FindMyPW;
