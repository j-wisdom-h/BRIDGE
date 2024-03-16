'use client'
import { useSearchParams } from 'next/navigation'

import Calendar from '@/_components/Calendar'
import { StudyTabBoard } from '@/_components/StudyTab'
import UserInfoForm from '@/_components/UserInfoForm'

export default function ManageStudy({ params }: { params: { title: string } }) {
    const title = decodeURIComponent(params.title)

    const searchParams = useSearchParams()
    const studyIdStirng = searchParams.get('id')
    const studyId = studyIdStirng ? parseInt(studyIdStirng, 10) : 0

    return (
        <div className="mx-7 h-full">
            <h1 className="text-center text text-lg font-semibold my-4">
                {title}
            </h1>
            <StudyTabBoard studyId={studyId} />
            <Calendar />
            <UserInfoForm />
        </div>
    )
}
