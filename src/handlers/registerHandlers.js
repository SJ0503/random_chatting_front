
// 인증번호 전송 핸들러
export const handleSendVerificationCode = async (email, setIsEmailDisabled, setTimer, sendVerificationCode) => {
    try {
        const responseMessage = await sendVerificationCode(email); // 서버에서 반환된 메시지

        // 서버 메시지가 특정 조건일 때만 타이머와 입력 비활성화
        if (responseMessage === "인증번호가 이메일로 전송되었습니다") {
            setIsEmailDisabled(true); // 이메일 입력 비활성화
            setTimer(300); // 5분 타이머 시작
        } else {
            // console.warn("Unexpected response message:", responseMessage);
        }
    } catch (err) {
        console.error("인증 코드 전송 실패:", err.message);
        alert(err.message || "인증 코드 전송에 실패했습니다.");
    }
};

// 인증번호 검증 핸들러
export const handleVerifyCode = async (email, code, verifyCode, setIsCodeDisabled, setIsVerified, setTimer, setIsEmailDisabled) => {
    try {
        const message = await verifyCode(email, code); // 인증번호 검증
        if (message === "인증 성공") {
            setIsCodeDisabled(true); // 인증번호 입력 필드 비활성화
            setIsVerified(true); // 인증 완료 상태로 변경
            setTimer(0); // 타이머 중지
            setIsEmailDisabled(true); // 이메일 입력 필드 비활성화
        } else {
            console.warn("Unexpected response message:", message);
        }
    } catch (err) {
        console.error("인증 실패:", err.message);
        alert(err.message || "인증번호 확인 중 문제가 발생했습니다.");
    }
};

// 인증번호 검증 핸들러 비밀번호 찾기용용
export const handleVerifyCodeForFindPW = async (
    email,
    code,
    verifyCode,
    setIsCodeDisabled,
    setIsVerified,
    setTimer,
    setIsEmailDisabled,
    onSuccess // navigate 함수 대신 콜백 함수로 변경
) => {
    try {
        const message = await verifyCode(email, code);
        if (message === "인증 성공") {
            setIsCodeDisabled(true);
            setIsVerified(true);
            setTimer(0);
            setIsEmailDisabled(true);
            if (typeof onSuccess === "function") {
                onSuccess(); // 성공 시 콜백 호출
            }
            return true;
        } else {
            console.warn("Unexpected response message:", message);
            return false;
        }
    } catch (err) {
        console.error("인증 실패:", err.message);
        alert(err.message || "인증번호 확인 중 문제가 발생했습니다.");
        return false;
    }
};


// 닉네임 중복 확인 핸들러
export const handleCheckNickname = async (nickname, checkNickname) => {
    try {
        await checkNickname(nickname);
        console.log("닉네임 중복 확인 성공");
    } catch (err) {
        console.error("닉네임 중복 확인 실패:", err.message);
        alert(err.message || "닉네임 중복 확인 중 문제가 발생했습니다.");
    }
};

// 이메일 회원가입 폼 제출 핸들러
export const handleSubmitForm = async (e, formData, password, confirmPassword, register, navigate) => {
    e.preventDefault();

    // 비밀번호 확인 체크
    if (password !== confirmPassword) {
        alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        return;
    }

    console.log("폼 제출 데이터:", formData);

    try {
        await register(formData); // 회원가입 요청
        navigate("/", { replace: true }); // 홈 화면으로 이동
    } catch (err) {
        console.error("회원가입 실패:", err.message);
        alert(err.message || "회원가입 중 문제가 발생했습니다.");
    }
};

// 카카오 회원가입 폼 제출 핸들러
export const handleKakaoSubmitForm = async (e, formData, register, navigate) => {
    e.preventDefault();

    try {
        await register(formData); // 카카오 회원가입 요청
        navigate("/", { replace: true });
    } catch (err) {
        console.error("카카오 회원가입 실패:", err.message);
        alert(err.message || "카카오 회원가입 중 문제가 발생했습니다.");
    }
};
