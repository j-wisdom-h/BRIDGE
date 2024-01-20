'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { logInschema, signUpschema } from 'hooks/validationYup'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { SignInput } from '@/_components/Input'
import { IsignUp, User } from '@/_interfaces/IAuth'

function LoginForm() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<User>({
        resolver: yupResolver(logInschema),
        //defaultValues: async () => fetch('/api-endpoint');
    })

    const onSubmit = async (data: IsignUp) => {
        const { email, password } = data

        const res = await signIn('credentials', {
            username: email,
            password: password,
            redirect: false,
            callbackUrl: '/',
        })
        // 에러 핸들링
        if (res?.status === 401) {
            alert('아이디 혹은 비밀번호가 일치하지 않습니다!')
        } else {
            router.push('/')
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="border-solid border px-8 py-12"
            >
                <div>
                    <div>
                        <label htmlFor="email">email</label>
                        <SignInput
                            type="text"
                            id="email"
                            {...register('email')}
                        />
                    </div>
                    {errors.email && <div>{errors.email?.message}</div>}
                </div>
                <div>
                    <div>
                        <label htmlFor="password">password</label>
                        <SignInput
                            type="password"
                            id="password"
                            {...register('password')}
                        />
                    </div>
                    {errors.password && <div>{errors.password?.message}</div>}
                </div>
                <button type="submit" className="orangeBtnL">
                    SignIn
                </button>
            </form>
            <button onClick={() => signIn('google', { callbackUrl: '/' })}>
                구글로그인
            </button>
        </>
    )
}

function SignUpForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<IsignUp>({
        mode: 'onChange',
        resolver: yupResolver(signUpschema),
    })

    // 이메일 전송 확인하는 상태
    const [sendSucess, setSendSucess] = useState(false)

    // 이메일 인증번호 확인하는 상태
    const [verifySucess, setVerifySucess] = useState(false)

    const emailRef = watch('email')
    const verifyCodeRef = useRef<HTMLInputElement | null>(null)
    const [showVerifyInput, setShowVerifyInput] = useState(false)

    const onSubmit: SubmitHandler<User> = async (data: IsignUp) => {
        const { confirmPassword, ...others } = data

        if (verifySucess) {
            alert('이메일인증을 해주세요')
            return
        }
        //console.log(data)
        const res = await fetch(`http://localhost:3000/api/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...others,
            }),
        })
        const body = await res.json()
        console.log(body)
    }

    const handleVerification = async () => {
        const email = emailRef
        //console.log('emailRef', email)
        const regExp =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i

        //console.log(email?.match(regExp))

        if (!email || !email.match(regExp)) {
            alert('올바른 이메일형식을 입력하세요')
            return
        }

        try {
            await fetch(`http://localhost:3000/api/mailcheck`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })
            console.log('인증하기 함수 호출됨')
            setShowVerifyInput(true)
        } catch (error) {
            console.error('인증하기 함수 에러:', error)
        }
    }

    const handleverifyCode = async () => {
        const email = emailRef
        const verifyCode = verifyCodeRef.current?.value
        console.log('verifyCode', verifyCode)
        try {
            const res = await fetch(
                `http://localhost:3000/api/mailcheck/verify`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, userCode: verifyCode }),
                },
            )
            if (res.status == 200) {
                alert('인증완료')
                setSendSucess(true)
            }
        } catch (error) {
            console.error('인증하기 함수 에러:', error)
        }
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="min-w-[400px] w-full max-w-md h-[500px] bg-white rounded-2xl shadow-md p-10 border-2 border-darkgray text-black [&>*:not(:last-child)]:mb flex justify-center flex-col"
        >
            <div className="mb-2">
                <label className="form-control w-full max-w-xs relative">
                    <div className="label pb-0">
                        <span className="label-text">email</span>
                    </div>
                    <input
                        type="text"
                        id="email"
                        placeholder="Email"
                        className="input input-bordered input-sm w-full max-w-xs"
                        {...register('email')}
                    />
                    <button
                        type="button"
                        className="absolute top-7 right-0 bg-orange text-white rounded-md w-16 text-xs h-8"
                        onClick={handleVerification}
                    >
                        메일인증
                    </button>
                    <div className="label h-4 pb-0">
                        <span className="label-text-alt">
                            {errors.email && errors.email?.message}
                        </span>
                    </div>
                </label>
                {showVerifyInput && (
                    <div>
                        <input
                            placeholder="인증번호"
                            ref={verifyCodeRef}
                            disabled={verifySucess ? true : false}
                        />
                        <button
                            type="button"
                            onClick={handleverifyCode}
                            className={
                                verifySucess
                                    ? 'pointer-events-none'
                                    : 'pointer-events-auto'
                            }
                        >
                            인증하기
                        </button>
                    </div>
                )}
            </div>
            <div className="mb-2">
                <label
                    htmlFor="password"
                    className="form-control w-full max-w-xs"
                >
                    <div className="label pb-0">
                        <span className="label-text">password</span>
                    </div>
                    <SignInput
                        type="password"
                        id="password"
                        className="input input-bordered input-sm w-full max-w-xs"
                        placeholder="Password"
                        {...register('password')}
                    />
                    <div className="label h-4 pb-0">
                        <span className="label-text-alt">
                            {errors.password && errors.password?.message}
                        </span>
                    </div>
                </label>
            </div>

            <div className="mb-2">
                <label
                    htmlFor="password"
                    className="form-control w-full max-w-xs"
                >
                    <div className="label pb-0">
                        <span className="label-text">password confirm</span>
                    </div>
                    <SignInput
                        id="confirmPassword"
                        type="password"
                        className="input input-bordered input-sm w-full max-w-xs"
                        placeholder="Password"
                        {...register('confirmPassword')}
                    />
                    <div className="label h-4 pb-0">
                        <span className="label-text-alt">
                            {errors.confirmPassword &&
                                errors.confirmPassword?.message}
                        </span>
                    </div>
                </label>
            </div>
            <button type="submit" className="orangeBtnL w-full mt-12">
                SignUp
            </button>
        </form>
    )
}
export { LoginForm, SignUpForm }
