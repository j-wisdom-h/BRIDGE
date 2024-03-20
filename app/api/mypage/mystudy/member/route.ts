import { RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'

import executeQuery from '@/_lib/db'

export async function GET(req: NextRequest) {
    const studyId = req.nextUrl.searchParams.get('studyId')
    const userId = req.nextUrl.searchParams.get('userId')
    let sql
    if (!userId) {
        // 스터디에 속한 모든 맴버
        sql = `SELECT
        study.id as study_id,
        user.id as user_id,
        user.email,
        user.avatar
        FROM study
        JOIN study_member ON study.id = study_member.study_id
        JOIN member ON study_member.member_id = member.id
        JOIN user ON member.user_id = user.id
        WHERE study.id =?`
    } else {
        // 스터디에서 현재 로그인된 사용자의 맴버 id
        sql = `SELECT m.id
                FROM member AS m
                INNER JOIN study_member sm ON sm.member_id = m.id
                WHERE sm.study_id = ? AND m.user_id = ?`
    }

    const values = userId ? [studyId, userId] : [studyId]

    const res = await executeQuery<RowDataPacket[]>(sql, values)
    return NextResponse.json(res)
}
export async function PUT(req: NextRequest) {
    const body = await req.json()
    const memberId = req.nextUrl.searchParams.get('memberId')
    const sql = `UPDATE member SET allow_chat = ? WHERE id = ?`
    const res = await executeQuery<RowDataPacket[]>(sql, [body, memberId])
    return NextResponse.json(res)
}
