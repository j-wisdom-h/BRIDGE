import { RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'

import executeQuery from '@/_lib/db'

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get('userId')
    const studyId = req.nextUrl.searchParams.get('studyId')
    let params, sql
    if (userId) {
        params = userId
        sql = `
            SELECT
            s.id,
            s.title
            FROM study s
            INNER JOIN study_member sm ON s.id = sm.study_id
            INNER JOIN member m ON sm.member_id = m.id
            WHERE m.user_id = ?`
    }
    if (studyId) {
        params = studyId
        sql = `SELECT
        study.id,
        post.id AS post_id,
        post.title,
        post.content AS post_content,
        post.created_at AS post_created_at,
        post.updated_at AS post_updated_at,
        post.keywords,
        post.location AS post_location,
        post.num AS post_num,
        post.atTime AS post_atTime
        FROM study
        LEFT JOIN post ON study.post_id = post.id
        WHERE study.id = ?`
    }
    const res = await executeQuery<RowDataPacket[]>(sql, [params])
    return NextResponse.json(res)
}
