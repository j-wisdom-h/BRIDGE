'use client'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import Calendar from '@/_components/Calendar'
import { StudyTabBoard } from '@/_components/StudyTab'
import UserInfoForm from '@/_components/UserInfoForm'
import { MemberIdState } from '@/_lib/atom'
import { getMemberId } from '@/_lib/study'

export default function ManageStudy({ params }: { params: { title: string } }) {
    const title = decodeURIComponent(params.title)

    const searchParams = useSearchParams()
    const studyIdStirng = searchParams.get('id')
    const studyId = studyIdStirng ? parseInt(studyIdStirng, 10) : 0

    const { data: session } = useSession()
    const [memberId, setMemberId] = useRecoilState(MemberIdState)

    useEffect(() => {
        session &&
            (async () => {
                const MemberIdState = await getMemberId(
                    studyId,
                    session?.user.id,
                )
                setMemberId(MemberIdState)
            })()
    }, [session, studyId, setMemberId])

    return (
        <div className="mx-7 h-full">
            <h1 className="text-center text text-lg font-semibold my-4">
                {title}
            </h1>
            <StudyTabBoard studyId={studyId} />
            <Calendar />
            <UserInfoForm memberId={memberId} />
        </div>
    )
}
