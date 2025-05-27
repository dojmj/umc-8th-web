export type UserSigninInformation = {
    email: string;
    password: string;
};

function validateUser(values: UserSigninInformation) {
    const errors: Record<keyof UserSigninInformation, string> = {
        email: "",
        password: "",
    };

    if (!values.email) {
        errors.email = "이메일을 입력해주세요.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "유효한 이메일 주소를 입력해주세요.";
    }

    if (!values.password) {
        errors.password = "비밀번호를 입력해주세요.";
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = "비밀번호는 8-20자 사이로 입력해주세요.";
    }

    return errors;
}

//로그인 유효성 검사
function validateSignin(values: UserSigninInformation) {
    return validateUser(values);
}

export { validateSignin };
