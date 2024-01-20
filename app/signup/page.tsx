import Link from 'next/link'

import { SignUpForm } from '@/_components/AuthForm'

export default function Signup() {
    return (
        <div className="grow flex justify-center flex-col h-full">
            <h2 className="text-2xl text-center orange mb-3.5 font-semibold">
                LET’S START BRIDGE!
            </h2>
            <SignUpForm />
            <Link
                href="/signin"
                className="underline underline -offset-1 text-gray-400"
            >
                Sign in
            </Link>
        </div>
    )
}
