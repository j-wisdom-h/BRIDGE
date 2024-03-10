import { ResultSetHeader } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'

import executeQuery from '@/_lib/db'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { response, studyId, userId, inviteId } = body

        // 초대테이블 상태 업데이트
        const updateInviteQuery = 'UPDATE invite SET status = ? WHERE id = ?'
        await executeQuery<ResultSetHeader>(updateInviteQuery, [
            response,
            inviteId,
        ])

        if (response === 'accepted') {
            let memberId
            // member테이블 row 생성
            try {
                const result = await executeQuery<ResultSetHeader>(
                    'INSERT INTO member (user_id, role) VALUES (?, ?)',
                    [userId, 'user'],
                )
                memberId = result.insertId // 새로운 맴버의 ID 반환
            } catch (e) {
                console.error('member테이블 row 생성 실패')
                return NextResponse.json({
                    message: 'member테이블 row 생성 실패',
                })
            }

            // study_memer 테이블 row생성
            try {
                const addMemberToStudyQuery =
                    'INSERT INTO study_member (study_id, member_id) VALUES (?, ?)'
                await executeQuery(addMemberToStudyQuery, [studyId, memberId])

                return NextResponse.json({
                    message: 'Invite accepted successfully',
                    status: 200,
                })
            } catch (err) {
                console.error(err)
                return NextResponse.json({
                    message: 'Invite rejected failed',
                    status: 200,
                })
            }
        }
        return NextResponse.json({
            message: 'Invite rejected successfully',
        })
    } catch (error) {
        console.error('Error while processing invite:', error.message)
        return NextResponse.json({
            message: 'Error while processing invite',
            status: 500,
        })
    }
}
