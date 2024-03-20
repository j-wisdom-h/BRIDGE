'use client'

import { useEffect, useState } from 'react'

import { IstudyAll } from '@/_interfaces/IStudy'
import { getMembers, getStudy } from '@/_lib/study'

import DeferredComponent from './DeferredComponent'
import IntroductionContent from './IntroductionContent'

const Skeleton = () => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="avatar-group -space-x-6 rtl:space-x-reverse overflow-visible">
                <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
                <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
                <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
                <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
            </div>
        </div>
    )
}

const fetchData = async (studyId: number) => {
    const [study, members] = await Promise.all([
        getStudy(studyId),
        getMembers(studyId),
    ])
    return [study, members] as IstudyAll
}

function IntroductionTab({ studyId }) {
    const [studyInfo, setStudyInfo] = useState<null | IstudyAll>(null)

    useEffect(() => {
        async function loadData() {
            try {
                const data = await fetchData(studyId)
                setStudyInfo(data)
            } catch (e) {
                console.error(e)
            }
        }
        loadData()
    }, [])

    if (!studyInfo) {
        return (
            <DeferredComponent>
                <Skeleton />
            </DeferredComponent>
        )
    }
    return <IntroductionContent studyInfo={studyInfo} />
}

export default IntroductionTab
