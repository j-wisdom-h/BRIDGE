import Link from 'next/link'
import { getUserId } from 'utils/getUser'
import { v4 as uuidv4 } from 'uuid'

import InviteResponse from '@/_components/InviteResponse'
import { getInvites } from '@/_lib/invite'

export default async function Alarm() {
    const userId = await getUserId()
    const invites = userId && (await getInvites(userId))

    async function updateCheckedAlarm() {
        try {
            await fetch('http://localhost:3000/api/mypage', {
                method: 'PUT',
                body: JSON.stringify({
                    userId: userId,
                    totalCount: invites.length,
                }),
            })
        } catch (err) {
            console.error(err)
        }
    }

    await updateCheckedAlarm()

    return (
        <div>
            <h2 className="text-xl font-semibold my-5">알람</h2>
            {invites.length > 0 &&
                invites.map((invite) => {
                    const {
                        study_title,
                        post_id,
                        inviting_member_email,
                        study_id,
                        invite_id,
                        status,
                    } = invite

                    return (
                        <div
                            key={uuidv4()}
                            className="card bg-base-100 border border-gray-300 shadow-lg p-5"
                        >
                            <div className="mb-2">
                                <p>
                                    <Link
                                        href={`read/${post_id}`}
                                        className="underline"
                                    >
                                        {study_title}
                                    </Link>
                                    에 초대되셨습니다.
                                </p>
                                <p className="text-end text-slate-600 text-sm">
                                    초대자:
                                    {inviting_member_email}
                                </p>
                            </div>
                            <InviteResponse
                                userId={userId}
                                studyId={study_id}
                                inviteId={invite_id}
                                onResponseSent={status != 'pending'}
                            />
                        </div>
                    )
                })}
        </div>
    )
}
