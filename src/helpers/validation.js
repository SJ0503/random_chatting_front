// helpers/validation.js
export const validatePassword = (password) => {
    const isValid = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*]).{8,15}$/.test(password);
    return {
        isValid,
        message: isValid ? "" : "영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15 자리",
    };
};

// 이메일 유효성 검사 함수
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
