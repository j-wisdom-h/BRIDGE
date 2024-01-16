'use client'

import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

const Header = () => {
    const { data: session } = useSession()

    return (
        <header className="absolute top-0 right-0 left-0 bg-orange h-14 flex items-center justify-between">
            <div className="flex items-center ml-4">
                <Link href="/">
                    <Image
                        src="/image/logo.png"
                        alt="Picture of the logo"
                        width={40}
                        height={40}
                        className="ml-1.5"
                    />
                </Link>
            </div>
            <div className="flex mr-4">
                {session ? (
                    <button
                        onClick={() => signOut()}
                        className="text-white mr-4"
                    >
                        Sign out
                    </button>
                ) : (
                    <>
                        <Link
                            href="/signup"
                            className="largeBoldWhiteTxt mr-1.5"
                        >
                            Signup
                        </Link>
                        <Link href="/signin" className="largeBoldWhiteTxt">
                            Signin
                        </Link>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header
