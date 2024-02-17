'use client'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import Calendar from '@/_components/Calendar'
import IntroductionTab from '@/_components/IntroductionTab'
import NoticeBoardTab from '@/_components/NoticeBoardTab'
import ResourcesTab from '@/_components/ResourcesTab'
import UserInfoForm from '@/_components/UserInfoForm'
import { getMyPost } from '@/_lib/post'

function StudyTabs({ activeTab, setActiveTab }) {
    // 탭 정보 배열
    const tabs = [
        { name: 'introduction', label: '소개' },
        { name: 'noticeboard', label: '공지방' },
        { name: 'resources', label: '자료실' },
    ]

    // 탭 클릭 핸들러
    const handleTabClick = (tabName) => {
        setActiveTab(tabName)
    }

    return (
        <>
            <ul className="grid  grid-flow-col auto-cols-fr text-center ">
                {tabs.map((tab) => (
                    <li
                        key={tab.name}
                        className={
                            activeTab === tab.name
                                ? 'bg-orange-500 rounded-t-lg text-white'
                                : 'bg-gray-100 rounded-t-lg'
                        }
                        onClick={() => handleTabClick(tab.name)}
                    >
                        {tab.label}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default function ManageStudy({ params }: { params: { title: string } }) {
    const title = decodeURIComponent(params.title)

    const searchParams = useSearchParams()
    const postString = searchParams.get('postId')
    const postId = postString ? parseInt(postString, 10) : 0
    const [activeTab, setActiveTab] = useState<string>('introduction')
    const [userInfo, setUserInfo] = useState({})
    const [postInfo, setPostInfo] = useState({})

    const { data: session } = useSession()

    useEffect(() => {
        async function fetch() {
            const post = await getMyPost(postId)
            if (session) {
                setUserInfo(session.user)
            }
            setPostInfo(post)
        }
        fetch()
    }, [])

    return (
        <div className="mx-7 h-full">
            <>
                <h1 className="text-center text text-lg font-semibold my-4">
                    {title}
                </h1>
                <div className="mb-5">
                    <StudyTabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                    {activeTab === 'introduction' && (
                        <IntroductionTab postInfo={postInfo} />
                    )}
                    {activeTab === 'noticeboard' && <NoticeBoardTab />}
                    {activeTab === 'resources' && <ResourcesTab />}
                </div>
                <Calendar />
                <UserInfoForm
                    userInfo={userInfo}
                    onUpdateUserInfo={setUserInfo}
                />
            </>
        </div>
    )
}
