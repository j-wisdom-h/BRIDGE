import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
    return (
        <header className="bg-orange h-14 flexRBetween">
            <div className="flex self-center">
                <Image
                    src="/image/logo.png"
                    width={40}
                    height={40}
                    alt="Picture of the logo"
                    className="ml-1.5"
                />
            </div>
            <div className="flex mr-1.5">
                <Link href="/signup" className="largeBoldWhiteTxt mr-1.5">
                    Signup
                </Link>
                <Link href="/login" className="largeBoldWhiteTxt">
                    Login
                </Link>
            </div>
        </header>
    )
}
export default Header
