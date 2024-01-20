import Link from 'next/link'

import { LoginForm } from '@/_components/AuthForm'

function Signin() {
    return (
        <>
            <h2>LoginPage</h2>
            <LoginForm />
            <Link
                href="/signup"
                className="underline underline-offset-1 text-gray-400"
            >
                Sign up
            </Link>
        </>
    )
}

export default Signin
