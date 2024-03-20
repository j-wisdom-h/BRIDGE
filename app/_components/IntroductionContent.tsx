import Image from 'next/image'
import Logo from 'public/image/logo.png'

import { IMember, IstudyAll } from '@/_interfaces/IStudy'

export function MemberList({
    displayedMembers,
}: {
    displayedMembers: IMember[]
}) {
    return (
        <>
            {displayedMembers.map((member: IMember) => (
                <div className="avatar" key={member.user_id}>
                    <div className="w-12">
                        <Image
                            src={member.avator || Logo}
                            width={12}
                            height={12}
                            alt="avatar"
                        />
                    </div>
                </div>
            ))}
        </>
    )
}
export default function IntroductionContent({
    studyInfo,
}: {
    studyInfo: IstudyAll
}) {
    const { 0: study, 1: members } = studyInfo
    const { title, post_content, post_location, post_num, post_atTime } =
        study[0]
    const MaxAvatars = 10
    const displayedMembers = members.slice(0, MaxAvatars)
    const extraCount =
        members.length > MaxAvatars ? members.length - MaxAvatars : 0

    return (
        <>
            <p>제목: {title}</p>
            <p>내용: {post_content}</p>
            <p>위치: {post_location}</p>
            <p>최대인원: {post_num}</p>
            <p>시간: {post_atTime}</p>
            <div className="avatar-group -space-x-6 rtl:space-x-reverse overflow-visible">
                <MemberList displayedMembers={displayedMembers} />
                <div className="avatar placeholder">
                    <div className="w-12 bg-neutral text-neutral-content">
                        <span className="cursor-default">+{extraCount}명</span>
                    </div>
                </div>
            </div>
            {/* 관리자 UI */}
            {/* <div>
                <Image src={}></Image>
            </div> */}
        </>
    )
}
