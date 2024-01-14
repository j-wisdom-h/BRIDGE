import * as yup from 'yup'

// yup schema 설정
export const signUpschema = yup.object().shape({
    email: yup
        .string()
        .email('이메일 형식을 맞춰서 입력해주세요.')
        .required('이메일을 필수로 입력해주세요.'),
    password: yup
        .string()
        .min(3, '비밀번호를 3~16글자로 입력해주세요.')
        .max(16, '비밀번호를 3~16글자로 입력해주세요.')
        .matches(
            /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W))/,
            '비밀번호에 영문, 숫자, 특수문자를 포함해주세요.',
        )
        .required('비밀번호를 필수로 입력해주세요.'),
    confirmPassword: yup
        .string()
        .oneOf(
            [yup.ref('password'), undefined],
            '비밀번호가 일치하지 않습니다.',
        )
        .required('비밀번호를 필수로 입력해주세요.'),
})

export const logInschema = yup.object().shape({
    email: yup
        .string()
        .email('이메일 형식을 맞춰서 입력해주세요.')
        .required('이메일을 필수로 입력해주세요.'),
    password: yup
        .string()
        .min(3, '비밀번호를 3~16글자로 입력해주세요.')
        .max(16, '비밀번호를 3~16글자로 입력해주세요.')
        .matches(
            /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W))/,
            '비밀번호에 영문, 숫자, 특수문자를 포함해주세요.',
        )
        .required('비밀번호를 필수로 입력해주세요.'),
})
