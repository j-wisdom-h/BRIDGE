'use client'

import Link from 'next/link'

import SideBar from '@/_components/SideBar'

function Header() {
    return (
        <header className="flex items-center justify-between relative bg-orange h-12">
            <Link href="/" className="flex items-center h-full pl-4">
                <h1 className="text-4xl text-white text-center">BRIGE</h1>
            </Link>
            <nav className="flex items-center justify-end h-full">
                {/* <Link href="/">
                    <Image
                        src="/image/logo.png"
                        alt="Picture of the logo"
                        width={40}
                        height={40}
                        className="ml-1.5"
                    />
                </Link>  */}
                <SideBar />
            </nav>
        </header>
    )
}

export default Header
