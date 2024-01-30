import Image from 'next/image'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

export default function SideBar({ session, status }) {
    return (
        <div className="navbar w-20 p-0">
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost">
                    {status === 'authenticated' ? (
                        <Avatar user={session.user} />
                    ) : (
                        <Link href="/signin" className="text-white">
                            Sign in
                        </Link>
                    )}
                </div>
                {status === 'authenticated' && (
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 right-0"
                    >
                        <li>
                            <a>Portfolio</a>
                        </li>
                        <li>
                            <a>About</a>
                        </li>
                        <li>
                            <button onClick={() => signOut()}>Sign out</button>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
}

export function Avatar({ user }) {
    const userImageURL = user?.image || '/image/logo.png'
    const imageStyle = { borderRadius: '50%' }
    return (
        <div className="avatar">
            <div className="w-10">
                <Image
                    src={userImageURL}
                    fill={true}
                    quality={100}
                    style={imageStyle}
                    alt="avatar"
                />
            </div>
        </div>
    )
}
