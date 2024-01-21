import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

export default function SideBar() {
    const { data: session, status } = useSession()
    const router = useRouter()

    const handleSignOut = async () => {
        try {
            await signOut()
            toast.success('로그아웃 완료', {
                duration: 2000,
            })
        } catch (error) {
            toast.error('로그아웃 실패'),
                {
                    duration: 2000,
                }
        }
    }
    return (
        <div className="navbar">
            <div className="navbar-end w-full">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                        <LoginCheckedNav session={session} status={status} />
                    </div>
                    {status === 'authenticated' && (
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 right-0"
                        >
                            <li>
                                <button onClick={handleSignOut}>
                                    Sign out
                                </button>
                            </li>
                            <li>
                                <a>Portfolio</a>
                            </li>
                            <li>
                                <a>About</a>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export function LoginCheckedNav({ session, status }) {
    const userImageURL = session?.user?.image || 'image/logo.png'

    return (
        <>
            {status === 'authenticated' ? (
                <ul className="flex items-center text-white flex-end">
                    <li>
                        <span>{session?.user?.email}</span>
                    </li>
                    <li>
                        <div className="avatar">
                            <div className="w-10 rounded-full">
                                <img src={userImageURL} alt="avatar" />
                            </div>
                        </div>
                    </li>
                </ul>
            ) : (
                <Link href="/signin" className="text-white">
                    Sign in
                </Link>
            )}
        </>
    )
}
