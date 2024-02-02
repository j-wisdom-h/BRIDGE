import executeQuery from 'app/_lib/db'
import { RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: number } },
) {
    const sql = `SELECT c.*, u.email, u.avatar FROM bridge.comment c JOIN bridge.user u ON c.author_id = u.id WHERE c.post_id = ?`
    const comments = await executeQuery<RowDataPacket[]>(sql, [params.id])
    return NextResponse.json(comments)
}
