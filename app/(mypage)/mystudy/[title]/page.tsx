'use client'

import { useState } from 'react'

import IntroductionTab from '@/_components/IntroductionTab'
import NoticeBoardTab from '@/_components/NoticeBoardTab'
import ResourcesTab from '@/_components/ResourcesTab'

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
            <ul className="grid  grid-flow-col auto-cols-fr">
                {tabs.map((tab) => (
                    <li
                        key={tab.name}
                        className={
                            activeTab === tab.name
                                ? 'bg-orange-500'
                                : 'bg-gray-100'
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
    const [activeTab, setActiveTab] = useState<string>('introduction')

    return (
        <div className="mx-7">
            <h1 className="text-center">{title}</h1>
            <StudyTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'introduction' && <IntroductionTab />}
            {activeTab === 'noticeboard' && <NoticeBoardTab />}
            {activeTab === 'resources' && <ResourcesTab />}
            {/* <Calendar /> */}
            {/* <UserInfo /> */}
        </div>
    )
}
