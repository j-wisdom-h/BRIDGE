'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { logInschema, signUpschema } from 'hooks/validationYup'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import googleLogin from 'public/image/google.png'
import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { IsignUp, User } from '@/_interfaces/IAuth'

function LoginForm() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<User>({
        mode: 'onChange',
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
            toast.error('아이디 혹은 비밀번호가 일치하지 않습니다.')
        } else {
            toast.success('로그인 성공', {
                duration: 2000,
                style: {
                    minWidth: '250px',
                },
            })
            router.push('/')
        }
    }

    return (
        <div className="w-[380px] min-h-[250px] bg-white rounded-2xl shadow-md px-10 pt-10 pb-5 border-2 border-darkgray text-black flex justify-center flex-col">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label
                    htmlFor="email"
                    className="form-control w-full max-w-xs relative"
                >
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
                    <div className="label h-4 pb-0 ">
                        {errors.email && (
                            <span className="label-text-alt text-red-400">
                                {errors.email?.message}
                            </span>
                        )}
                    </div>
                </label>

                <label
                    htmlFor="password"
                    className="form-control w-full max-w-xs"
                >
                    <div className="label pb-0">
                        <span className="label-text">password</span>
                    </div>
                    <input
                        type="password"
                        id="password"
                        className="input input-bordered input-sm w-full max-w-xs"
                        placeholder="Password"
                        {...register('password')}
                    />
                    <div className="label h-4 pb-0">
                        <span className="label-text-alt">
                            {errors.password && (
                                <span className="label-text-alt text-red-400">
                                    {errors.password?.message}
                                </span>
                            )}
                        </span>
                    </div>
                </label>
                <button type="submit" className="orangeBtnL mt-4 mb-2">
                    Sign In
                </button>
            </form>
            <hr className="my-2" />
            <p className="text-gray-500 text-sm text-center mb-3">
                social login
            </p>
            <button onClick={() => signIn('google', { callbackUrl: '/' })}>
                <Image
                    src={googleLogin}
                    width={40}
                    alt="google login"
                    placeholder="blur"
                />
            </button>
        </div>
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
            className="min-w-[400px] w-full max-w-md bg-white rounded-2xl shadow-md p-10 border-2 border-darkgray text-black flex justify-center flex-col"
        >
            <label className="form-control w-full max-w-xs relative">
                <div className="label pb-0">
                    <span className="label-text">email</span>
                </div>
                <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    className="input input-bordered input-sm w-full max-w-xs text-xs"
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
                        {errors.email && (
                            <span className="label-text-alt text-red-400">
                                {errors.email?.message}
                            </span>
                        )}
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
            <label htmlFor="password" className="form-control w-full max-w-xs">
                <div className="label pb-0">
                    <span className="label-text">password</span>
                </div>
                <input
                    type="password"
                    id="password"
                    className="input input-bordered input-sm w-full max-w-xs text-xs"
                    placeholder="Password"
                    {...register('password')}
                />
                <div className="label h-4 pb-0">
                    <span className="label-text-alt">
                        {errors.password && (
                            <span className="label-text-alt text-red-400">
                                {errors.password?.message}
                            </span>
                        )}
                    </span>
                </div>
            </label>

            <label htmlFor="password" className="form-control w-full max-w-xs">
                <div className="label pb-0">
                    <span className="label-text">password confirm</span>
                </div>
                <input
                    id="confirmPassword"
                    type="password"
                    className="input input-bordered input-sm w-full max-w-xs"
                    placeholder="Password"
                    {...register('confirmPassword')}
                />
                <div className="label h-4 pb-0">
                    <span className="label-text-alt">
                        {errors.confirmPassword && (
                            <span className="label-text-alt text-red-400">
                                {errors.confirmPassword?.message}
                            </span>
                        )}
                    </span>
                </div>
            </label>

            <button type="submit" className="orangeBtnL mt-6">
                Sign up
            </button>
        </form>
    )
}
export { LoginForm, SignUpForm }
