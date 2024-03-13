import Image from 'next/image'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { getInvites } from '@/_lib/invite'

export default function SideBar({ session, status }) {
    const [invites, setInvites] = useState([])
    const [alarmcount, setAlarmCount] = useState(0)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev)
    }
    const closeDropdownWithDelay = () => {
        setIsDropdownOpen(false)
    }
    const getCheckedAlarm = async () => {
        const res = await fetch(
            `http://localhost:3000/api/mypage?userId=${session?.user?.id}`,
        )
        const result = await res.json()
        const { checked_count } = result
        setAlarmCount(invitesCount - checked_count)
    }

    const getInvitesAll = useCallback(async () => {
        try {
            if (session) {
                await getCheckedAlarm()
                return await getInvites(session?.user?.id)
            } else return []
        } catch (error) {
            console.error('Error while fetching invites:', error.message)
        }
    }, [session])

    useEffect(() => {
        async function fetchInvites() {
            const invitesData = await getInvitesAll()
            console.log()
            setInvites(invitesData)
        }
        fetchInvites()
    }, [getInvitesAll])

    // 초대 개수를 기억
    const invitesCount = useMemo(() => invites.length, [invites])

    return (
        <div className="navbar w-20 p-0">
            <div className="dropdown">
                <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost"
                    onClick={() => toggleDropdown()}
                >
                <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost"
                    onClick={() => toggleDropdown()}
                >
                    {status === 'authenticated' ? (
                        <Avatar user={session.user} />
                    ) : (
                        <Link href="/signin" className="text-white">
                            Sign in
                        </Link>
                    )}
                </div>
                {status === 'authenticated' && isDropdownOpen && (
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 right-0"
                    >
                        <li>
                            <Link
                                href="/profile"
                                onClick={() => closeDropdownWithDelay()}
                            >
                                회원정보
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/mypost"
                                onClick={() => closeDropdownWithDelay()}
                            >
                                내 게시글
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/mystudy"
                                onClick={() => closeDropdownWithDelay()}
                            >
                                내 스터디
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/alarm"
                                onClick={() => {
                                    closeDropdownWithDelay()
                                }}
                            >
                                알람
                                {alarmcount > 0 && (
                                    <span className="absolute top-0 right-0 inline-block bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                                        {alarmcount}
                                    </span>
                                )}
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() =>
                                    signOut({
                                        callbackUrl: '/',
                                        redirect: true,
                                    })
                                }
                            >
                                Sign out
                            </button>
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
