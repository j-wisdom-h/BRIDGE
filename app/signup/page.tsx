import Link from 'next/link'

import { SignUpForm } from '@/_components/AuthForm'

export default function Signup() {
    return (
        <div className="grow flex justify-center flex-col h-full">
            <h2 className="text-2xl text-center orange mb-3.5 font-semibold">
                LET’S START BRIDGE!
            </h2>
            <SignUpForm />
            <div className="min-w-[400px] text-sm text-center leading-[1.8] mt-2">
                <span className="text-gray-400 mr-1">로그인하러 가기</span>
                <Link href="/signin" className="link">
                    Sign in
                </Link>
            </div>
        </div>
    )
}
