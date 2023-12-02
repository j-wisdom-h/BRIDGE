import * as yup from 'yup'

// yup schema 설정
export const signUpschema = yup.object().shape({
    name: yup
        .string()
        .min(3, '닉네임을 3글자 이상으로 입력해주세요.')
        .required('닉네임을 필수로 입력해주세요.'),
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
    sex: yup.string().required('성별을 필수로 입력해주세요.'),
    address: yup.string().required('주소를 필수로 입력해주세요.'),
    alias: yup.string().max(16, '별명을 16자이하로 입력해주세요.'),
    age: yup.number(),
})
