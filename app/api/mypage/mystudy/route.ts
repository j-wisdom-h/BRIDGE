import { RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'

import executeQuery from '@/_lib/db'

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get('userId')
    const sql = `SELECT *
        FROM post
        JOIN study ON post.id = study.post_id
        JOIN study_member ON study.id = study_member.study_id
        JOIN member ON member.id = study_member.member_id
        WHERE member.user_id = ?    
    `
    const res = await executeQuery<RowDataPacket[]>(sql, [userId])
    return NextResponse.json(res)
}
