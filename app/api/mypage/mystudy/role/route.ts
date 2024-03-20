import { RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'

import executeQuery from '@/_lib/db'

export async function GET(req: NextRequest) {
    const memberId = req.nextUrl.searchParams.get('memberId')
    const sql = `SELECT m.role, m.allow_chat FROM member AS m WHERE m.id = ?`
    const res = await executeQuery<RowDataPacket[]>(sql, [memberId])
    return NextResponse.json(res[0])
}
