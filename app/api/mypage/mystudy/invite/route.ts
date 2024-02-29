import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'

import executeQuery from '@/_lib/db'

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { post_id, inviting_member_email, invited_member_email, status } =
        body

    try {
        const studyResult = await executeQuery<RowDataPacket>(
            `SELECT
            s.id AS study_id,
            u1.id AS inviting_member_id,
            u2.id AS invited_member_id
        FROM
            bridge.study AS s
        INNER JOIN
            bridge.user AS u1 ON u1.email = ?
        INNER JOIN
            bridge.user AS u2 ON u2.email = ?
        WHERE
            s.post_id = ?`,
            [inviting_member_email, invited_member_email, post_id],
        )
        const { study_id, inviting_member_id, invited_member_id } =
            studyResult[0]

        if (!study_id || !inviting_member_id || !invited_member_id) {
            throw new Error('Study ID or inviting/invited member ID not found')
        }

        // 초대된 적이 있는지를 확인
        const existingRecord = await executeQuery<RowDataPacket>(
            'SELECT * FROM invite WHERE study_id = ? AND inviting_member_id = ? AND invited_member_id = ?',
            [study_id, inviting_member_id, invited_member_id],
        )

        if (existingRecord.length > 0) {
            return NextResponse.json(
                { message: 'Invite record already exists' },
                { status: 200 },
            )
        }

        // Insert into the invite table
        const postMemberSQL = `
            INSERT INTO invite (study_id, inviting_member_id, invited_member_id, status)
            VALUES (?, ?, ?, ?)
        `
        const values = [study_id, inviting_member_id, invited_member_id, status]
        await executeQuery<ResultSetHeader>(postMemberSQL, values)

        return NextResponse.json(
            { message: 'Invite record inserted successfully' },
            { status: 200 },
        )
    } catch (error) {
        console.error('Error while processing invite:', error.message)
        return NextResponse.json('Error while processing invite', {
            status: 500,
        })
    }
}

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get('invited_member_id')
    try {
        // 초대를 받은 사람의 ID(invited_member_id)를 기반으로 초대 목록을 가져옴
        const invites = await executeQuery<RowDataPacket>(
            `SELECT
                invite.id AS invite_id,
                invite.status,
                user_inviting.email AS inviting_member_email,
                study.title AS study_title,
                study.post_id,
                study.id AS study_id
            FROM
                invite
            INNER JOIN
                user AS user_inviting ON invite.inviting_member_id = user_inviting.id
            INNER JOIN
                user AS user_invited ON invite.invited_member_id = user_invited.id
            INNER JOIN
                study ON invite.study_id = study.id
            WHERE
                invite.invited_member_id = ?
            `,
            [userId],
        )
        // user_inviting.id AS inviting_member_id,
        // user_invited.email AS invited_member_email,
        return NextResponse.json(invites, { status: 200 })
    } catch (error) {
        console.error('Error while fetching invites:', error.message)
        return NextResponse.json('Failed to fetch invites', { status: 500 })
    }
}
