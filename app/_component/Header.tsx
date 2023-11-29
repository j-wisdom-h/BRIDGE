import Link from 'next/link'

const Header = () => {
    return (
        <header>
            <Link href="/signup">Signup</Link>
            <Link href="/login">Login</Link>
        </header>
    )
}
export default Header
