import { RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'

import executeQuery from '@/_lib/db'

export async function GET(req: NextRequest) {
    const studyId = req.nextUrl.searchParams.get('studyId')
    const sql = `SELECT
    study.id as study_id,
    user.id as user_id,
    user.email,
    user.avatar
    FROM study
    JOIN study_member ON study.id = study_member.study_id
    JOIN member ON study_member.member_id = member.id
    JOIN user ON member.user_id = user.id
    WHERE study.id =?`

    const res = await executeQuery<RowDataPacket[]>(sql, [studyId])
    return NextResponse.json(res)
}
