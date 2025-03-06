// helpers/validation.js
// 비밀번호 유효성 검사 함수
export const validatePassword = (password) => {
    const isValid = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*]).{8,15}$/.test(password);
    return {
        isValid,
        message: isValid ? "" : "영문, 숫자, 특수문자(~!@#$%^&*) 조합 8~15 자리",
    };
};
// 허용할 TLD 리스트 (국제적으로 많이 사용되는 확장자들)
const validTLDs = ["com", "net", "org", "edu", "gov", "co.kr", "io", "tech", "dev", "ai"];

// 이메일 유효성 검사 함수 (TLD 목록을 활용한 검증)
export const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(\w{2,4})$/;
    const match = email.match(emailRegex);

    if (!match) return false; // 기본 정규식 검사 실패 시 유효하지 않음

    const domainTLD = match[1]; // 매칭된 TLD 부분 추출
    return validTLDs.includes(domainTLD); // TLD가 허용된 리스트에 있는지 확인
};

