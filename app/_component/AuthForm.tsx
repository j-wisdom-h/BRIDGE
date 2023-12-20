'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { logInschema, signUpschema } from 'hooks/validationYup'
import { signIn } from 'next-auth/react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'

import { SignInput } from '@/_component/Input'
import { IsignIn, IsignUp } from '@/_interfaces/IAuth'

function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IsignIn>({ resolver: yupResolver(logInschema) })

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
    } = useForm<IsignUp>({
        resolver: yupResolver(signUpschema),
    })

    const onSubmit = async (data: IsignUp) => {
        const { confirmPassword, ...others } = data
        //console.log(data)
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...others,
            }),
        })
        const body = await res.json()
        console.log(body.messsage)
    }

    const emailRef = useRef<HTMLInputElement | null>(null)
    const verifyCodeRef = useRef<HTMLInputElement | null>(null)

    const handleVerification = async () => {
        const email = emailRef.current?.value
        //console.log('emailRef', email)
        try {
            await fetch(`http://localhost:3000/api/mailcheck`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })
            console.log('인증하기 함수 호출됨')
        } catch (error) {
            console.error('인증하기 함수 에러:', error)
        }
    }

    const handleverifyCode = async () => {
        const email = emailRef.current?.value
        const verifyCode = verifyCodeRef.current?.value
        try {
            await fetch(`http://localhost:3000/api/mailcheck/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, userCode: verifyCode }),
            })
            console.log('인증하기 함수 호출됨')
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
                            ref={emailRef}
                        />
                        <button type="button" onClick={handleVerification}>
                            인증하기
                        </button>
                    </div>
                    <input placeholder="인증번호" ref={verifyCodeRef}></input>

                    <button type="button" onClick={handleverifyCode}>
                        인증하기
                    </button>
                    {errors.email && <div>{errors.email?.message}</div>}
                </div>
                <div className="mb-2">
                    <div className="flexRBetween mb-5">
                        <label htmlFor="name" className="basis-1/3 font-black">
                            nickname
                        </label>
                        <SignInput
                            type="text"
                            id="name"
                            {...register('name')}
                        />
                    </div>
                    {errors.name && <div>{errors.name?.message}</div>}
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
                <div className="mb-2">
                    <div className="flexRBetween">
                        <label
                            htmlFor="gender"
                            className="basis-1/3 font-black"
                        >
                            gender
                        </label>
                        <div className="flex">
                            <div>
                                <input
                                    type="radio"
                                    id="gender-max"
                                    value="남"
                                    {...register('gender')}
                                ></input>
                                남
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="gender-women"
                                    value="여"
                                    {...register('gender')}
                                ></input>
                                여
                            </div>
                        </div>
                    </div>
                    {errors.gender && <div>{errors.gender?.message}</div>}
                </div>
                <div className="mb-2">
                    <div className="flexRBetween">
                        <label
                            htmlFor="address"
                            className="basis-1/3 font-black"
                        >
                            address
                        </label>
                        <SignInput
                            type="text"
                            id="address"
                            {...register('address')}
                        />
                    </div>
                    {errors.address && <div>{errors.address?.message}</div>}
                </div>
                <div>
                    <div className="flexRBetween">
                        <label
                            htmlFor="birthday"
                            className="basis-1/3 font-black"
                        >
                            birthday
                        </label>
                        <SignInput
                            type="date"
                            id="birthday"
                            {...register('birthday')}
                        />
                    </div>
                    {errors.birthday && <div>{errors.birthday?.message} </div>}
                </div>
                <button type="submit" className="orangeBtnL w-full mt-6">
                    SignUp
                </button>
            </form>
        </div>
    )
}

export { LoginForm, SignUpForm }
