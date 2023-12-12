'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { signUpschema } from 'hooks/validationYup'
import { useForm } from 'react-hook-form'

import { SignInput } from '@/_component/Input'

export interface signUpSubmitForm {
    name: string
    email: string
    password: string
    confirmPassword: string
    sex: string
    address: string
    alias?: string | undefined
    birthday: string
}

export function SignupForm() {
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
        <div className="">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="border-solid border px-8 py-12"
            >
                <div>
                    <div className="flexRBetween mb-5">
                        <label htmlFor="name" className="basis-1/3">
                            name
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
                        <label htmlFor="sex" className="basis-1/3">
                            sex
                        </label>
                        <div className="flex">
                            <div>
                                <input
                                    type="radio"
                                    id="sex-max"
                                    value="남"
                                    {...register('sex')}
                                ></input>
                                남
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="sex-women"
                                    value="여"
                                    {...register('sex')}
                                ></input>
                                여
                            </div>
                        </div>
                    </div>
                    {errors.sex && <div>{errors.sex?.message}</div>}
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
                        <label htmlFor="alias" className="basis-1/3">
                            alias
                        </label>
                        <SignInput
                            type="text"
                            id="alias"
                            {...register('alias')}
                        />
                    </div>
                    {errors.alias && <div>{errors.alias?.message}</div>}
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
