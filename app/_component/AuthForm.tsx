'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { logInschema, signUpschema } from 'hooks/validationYup'
import { signIn } from 'next-auth/react'
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
        console.log('AuthForm', data)
        await signIn('Authcredentials', {
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

    const onSubmit = (data: IsignUp) => {
        console.log(data)
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="border-solid border px-8 py-12"
            >
                <div>
                    <div className="flexRBetween mb-5">
                        <label htmlFor="name" className="basis-1/3">
                            Nickname
                        </label>
                        <SignInput
                            type="text"
                            id="name"
                            {...register('name')}
                        />
                    </div>
                    {errors.name && <div>{errors.name?.message}</div>}
                </div>
                <div>
                    <div className="flexRBetween">
                        <label htmlFor="email" className="basis-1/3">
                            email
                        </label>
                        <SignInput
                            type="text"
                            id="email"
                            {...register('email')}
                        />
                    </div>
                    {errors.email && <div>{errors.email?.message}</div>}
                </div>

                <div className="flexRBetween">
                    <label htmlFor="password" className="basis-1/3">
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

                <div>
                    <div className="flexRBetween">
                        <label htmlFor="password" className="basis-1/3">
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
                <div>
                    <div className="flexRBetween">
                        <label htmlFor="gender" className="basis-1/3">
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
                <div>
                    <div className="flexRBetween">
                        <label htmlFor="address" className="basis-1/3">
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
                        <label htmlFor="birthday" className="basis-1/3">
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
                <button type="submit" className="orangeBtnL">
                    SignUp
                </button>
            </form>
        </div>
    )
}
export { LoginForm, SignUpForm }
