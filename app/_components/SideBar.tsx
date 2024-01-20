import { signIn, signOut, useSession } from 'next-auth/react'

export default function SideBar() {
    const { data: session, status } = useSession()
    console.log(session?.user)
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
                                <button onClick={() => signOut()}>
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
                <button onClick={() => signIn()} className="text-white">
                    Sign in
                </button>
            )}
        </>
    )
}
