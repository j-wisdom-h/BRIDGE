import Link from 'next/link'

import { LoginForm } from '@/_components/AuthForm'

function Signin() {
    return (
        <>
            <h2 className="text-2xl text-center orange mb-3.5 font-semibold">
                Welcom to Bridge
            </h2>
            <LoginForm />
            <div className="w-[380px] text-sm text-center leading-[1.8] mt-2">
                <span className="text-gray-400 mr-1">
                    아직 회원이 아니신가요?
                </span>
                <Link href="/signup" className="link mr-2 ">
                    Sign up
                </Link>
            </div>
        </>
    )
}

export default Signin
