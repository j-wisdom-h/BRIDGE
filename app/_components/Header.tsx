'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

import SideBar from '@/_components/SideBar'

function Header() {
    const { data: session, status } = useSession()
    return (
        <header className="flex items-center justify-between relative bg-orange-500 h-12">
            <Link href="/" className="flex items-center h-full pl-4">
                <h1 className="text-4xl text-white text-center">BRIGE</h1>
            </Link>
            <nav className="flex items-center justify-end h-full">
                {status === 'authenticated' && (
                    <Link
                        className="w-20 text-white text-center border-white border-2 rounded-lg"
                        href="/post"
                    >
                        새 글쓰기
                    </Link>
                )}
                <SideBar session={session} status={status} />
            </nav>
        </header>
    )
}

export default Header
