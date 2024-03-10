'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { logInschema, signUpschema } from 'hooks/validationYup'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import googleLogin from 'public/image/google.png'
import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IsignUp, User } from '@/_interfaces/IAuth'

function LoginForm() {
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
            redirect: true,
            callbackUrl: '/',
        })

        if (res?.status === 401) {
            alert('아이디 혹은 비밀번호가 일치하지 않습니다.')
        }
    }

    const formFields: {
        label: string
        type: string
        placeholder: string
        name: 'email' | 'password'
    }[] = [
        {
            label: 'email',
            type: 'text',
            placeholder: 'Email',
            name: 'email',
        },
        {
            label: 'password',
            type: 'password',
            placeholder: 'Password',
            name: 'password',
        },
    ]

    return (
        <div className="w-[380px] min-h-[250px] bg-white rounded-2xl shadow-md px-10 pt-10 pb-5 border-2 border-darkgray text-black flex justify-center flex-col">
            <form onSubmit={handleSubmit(onSubmit)}>
                {formFields.map((field) => (
                    <label
                        key={field.name}
                        htmlFor={field.name}
                        className="form-control w-full max-w-xs relative"
                    >
                        <div className="label pb-0">
                            <span className="label-text">{field.label}</span>
                        </div>
                        <input
                            type={field.type}
                            id={field.name}
                            placeholder={field.placeholder}
                            className="input input-bordered input-sm w-full max-w-xs"
                            {...register(field.name)}
                        />
                        <div className="label h-4 pb-0 ">
                            {errors[field.name] && (
                                <span className="label-text-alt text-red-400">
                                    {errors[field.name]?.message}
                                </span>
                            )}
                        </div>
                    </label>
                ))}
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

    const router = useRouter()

    // 이메일 인증번호 확인하는 상태
    const [verifySucess, setVerifySucess] = useState<boolean>(false)
    // 이메일 전송 확인 상태
    const [showVerifyInput, setShowVerifyInput] = useState<boolean>(false)

    const emailRef = watch('email')
    const verifyCodeRef = useRef<HTMLInputElement | null>(null)

    const onSubmit: SubmitHandler<User> = async (data: IsignUp) => {
        const { confirmPassword, ...others } = data

        if (!verifySucess) {
            alert('이메일인증을 해주세요')
            return
        }
        try {
            const res = await fetch(`http://localhost:3000/api/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...others,
                }),
            })
            await res.json()
            router.push('/signin')
        } catch (error) {
            console.error('회원가입 에러:', error)
        }
    }
    // 인증번호 전송
    const handleVerification = async () => {
        const email = emailRef

        const regExp =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i

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
    // 인증번호 인증완료
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
                setVerifySucess(true)
            }
        } catch (error) {
            console.error('인증하기 함수 에러:', error)
        }
    }

    const formFields = [
        { label: 'Email', type: 'text', name: 'email' },
        { label: 'Password', type: 'password', name: 'password' },
        { label: 'confirmPassword', type: 'password', name: 'confirmPassword' },
    ].map(
        ({ label, type, name }) =>
            ({
                label,
                type,
                id: name,
                placeholder: label,
                name: name as 'email' | 'password' | 'confirmPassword',
            }) as const,
    )

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="min-w-[400px] w-full max-w-md bg-white rounded-2xl shadow-md p-10 border-2 border-darkgray text-black flex justify-center flex-col"
        >
            {formFields.map((field) => (
                <div key={field.name} className="relative">
                    <label
                        htmlFor={field.id}
                        className="form-control w-full max-w-xs"
                    >
                        <div className="label pb-0">
                            <span className="label-text">{field.label}</span>
                        </div>
                        <input
                            type={field.type}
                            id={field.id}
                            placeholder={field.placeholder}
                            className="input input-bordered input-sm w-full max-w-xs text-xs"
                            {...register(field.name)}
                        />
                        {field.id === 'email' && (
                            <button
                                type="button"
                                className="absolute top-7 right-0 bg-orange-500 text-white rounded-md w-16 text-xs h-8"
                                onClick={handleVerification}
                            >
                                메일인증
                            </button>
                        )}
                        <div className="label h-4 pb-0">
                            <span className="label-text-alt">
                                {errors[field.name] && (
                                    <span className="label-text-alt text-red-400">
                                        {errors[field.name]?.message}
                                    </span>
                                )}
                            </span>
                        </div>
                    </label>
                    {field.id === 'email' && showVerifyInput && (
                        <div className="flex justify-between">
                            <input
                                placeholder="인증번호"
                                ref={verifyCodeRef}
                                disabled={verifySucess ? true : false}
                                className="focus:outline-none border-b-2 max-w-xs text-xs grow"
                            />
                            <button
                                type="button"
                                onClick={handleverifyCode}
                                className={`${
                                    verifySucess
                                        ? 'pointer-events-none'
                                        : 'pointer-events-auto'
                                } text-xs w-14 text-white bg-orange-500 hover:bg-orange-400 rounded-lg ml-2 h-6 grow-0`}
                            >
                                인증하기
                            </button>
                        </div>
                    )}
                </div>
            ))}
            <button type="submit" className="orangeBtnL mt-6">
                Sign up
            </button>
        </form>
    )
}
export { LoginForm, SignUpForm }
