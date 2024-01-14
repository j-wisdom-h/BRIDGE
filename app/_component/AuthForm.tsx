'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { logInschema, signUpschema } from 'hooks/validationYup'
import { signIn } from 'next-auth/react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { SignInput } from '@/_component/Input'
import { IsignUp, User } from '@/_interfaces/IAuth'

function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<User>({ resolver: yupResolver(logInschema) })

    const onSubmit = async (data: IsignUp) => {
        const { email, password } = data
        //console.log('AuthForm', data)
        await signIn('credentials', {
            username: email,
            password: password,
            redirect: true,
            callbackUrl: '/',
        })
    }

    return (
        <div>
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
        resolver: yupResolver(signUpschema),
    })

    // 이메일 전송 확인하는 상태
    const [sendSucess, setSendSucess] = useState(false)

    // 이메일 인증번호 확인하는 상태
    const [verifySucess, setVerifySucess] = useState(false)

    const onSubmit = async (data: IsignUp) => {
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

    const emailRef = watch('email')
    const verifyCodeRef = useRef<HTMLInputElement | null>(null)
    const [showVerifyInput, setShowVerifyInput] = useState(false)

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
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="min-w-[600px] w-full max-w-md bg-white rounded-2xl shadow-md pt-10 pr-10 pl-10 pb-4 border-8 border-orange text-black"
            >
                <div className="mb-2">
                    <div className="flexRBetween">
                        <label htmlFor="email" className="basis-1/3 font-black">
                            email
                        </label>
                        <SignInput
                            type="text"
                            id="email"
                            {...register('email')}
                        />
                        <button type="button" onClick={handleVerification}>
                            인증하기
                        </button>
                    </div>
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
                    {errors.email && <div>{errors.email?.message}</div>}
                </div>
                <div className="mb-2">
                    <div className="flexRBetween">
                        <label
                            htmlFor="password"
                            className="basis-1/3 font-black"
                        >
                            password
                        </label>
                        <div className="inputBorder basis-2/3">
                            <SignInput
                                type="password"
                                id="password"
                                className="w-full"
                                {...register('password')}
                            />
                            {errors.password && (
                                <div>{errors.password?.message}</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mb-2">
                    <div className="flexRBetween">
                        <label
                            htmlFor="password"
                            className="basis-1/3 font-black"
                        >
                            password confirm
                        </label>
                        <SignInput
                            type="password"
                            id="confirmPassword"
                            {...register('confirmPassword')}
                        />
                    </div>
                    {errors.confirmPassword && (
                        <div>{errors.confirmPassword?.message}</div>
                    )}
                </div>

                <button type="submit" className="orangeBtnL w-full mt-6">
                    SignUp
                </button>
            </form>
        </div>
    )
}
export { LoginForm, SignUpForm }
