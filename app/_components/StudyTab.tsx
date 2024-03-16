import { useState } from 'react'

import ChattingTab from './ChattingTab'
import IntroductionTab from './IntroductionTab'
import NoticeBoardTab from './NoticeBoardTab'
import ResourcesTab from './ResourcesTab'

export function StudyTabs({ activeTab, setActiveTab }) {
    const tabs = [
        { name: 'introduction', label: '소개' },
        { name: 'noticeboard', label: '공지방' },
        { name: 'resources', label: '자료실' },
        { name: 'chatting', label: '채팅방' },
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

export function StudyTabBoard({ studyId }: { studyId: number }) {
    const [activeTab, setActiveTab] = useState<string>('introduction')

    return (
        <div className="mb-5">
            <StudyTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="card bg-base-100 shadow-xl h-52 p-5">
                {activeTab === 'introduction' && (
                    <IntroductionTab studyId={studyId} />
                )}
                {activeTab === 'noticeboard' && <NoticeBoardTab />}
                {activeTab === 'chatting' && <ChattingTab />}
                {activeTab === 'resources' && <ResourcesTab />}
            </div>
        </div>
    )
}
