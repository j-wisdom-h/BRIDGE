'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { signUpschema } from 'hooks/validationYup'
import { useForm } from 'react-hook-form'

export type signUpSubmitForm = {
    name: string
    email: string
    password: string
    confirmPassword: string
    sex: string
    address: string
    alias?: string | undefined
    age?: number | undefined
}

export default function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<signUpSubmitForm>({
        resolver: yupResolver(signUpschema),
    })

    const onSubmit = (data: signUpSubmitForm) => {
        console.log(data)
    }
    return (
        <div className="w-1/2 my-auto mx-auto">
            <h2 className="text-center">LET’S START BRIDGE</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">name</label>
                    <input type="text" id="name" {...register('name')} />
                    {errors.name && <div>{errors.name?.message}</div>}
                </div>
                <div>
                    <label htmlFor="email">email</label>
                    <input type="email" id="email" {...register('email')} />
                    {errors.email && <div>{errors.email?.message}</div>}
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input
                        type="password"
                        id="password"
                        {...register('password')}
                    />
                    {errors.password && <div>{errors.password?.message}</div>}
                </div>
                <div>
                    <label htmlFor="password">password confirm</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        {...register('confirmPassword')}
                    ></input>
                    {errors.confirmPassword && (
                        <div>{errors.confirmPassword?.message}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="sex">sex</label>
                    <input type="radio" id="sex" {...register('sex')}></input>
                    {errors.sex && <div>{errors.sex?.message}</div>}
                </div>
                <div>
                    <label htmlFor="address">address</label>
                    <input
                        type="text"
                        id="address"
                        {...register('address')}
                    ></input>
                    {errors.address && <div>{errors.address?.message}</div>}
                </div>
                <div>
                    <label htmlFor="alias">alias</label>
                    <input
                        type="text"
                        id="alias"
                        {...register('alias')}
                    ></input>
                    {errors.alias && <div>{errors.alias?.message}</div>}
                </div>
                <div>
                    <label htmlFor="age">age</label>
                    <input type="number" id="age" {...register('age')}></input>
                    {errors.age && <div>{errors.age?.message}</div>}
                </div>
                <button type="submit">회원가입 하기</button>
            </form>
        </div>
    )
}
