import executeQuery from 'app/_lib/db'
import { RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const sql = `SELECT *
                FROM bridge.user
                JOIN bridge.post ON bridge.user.id = bridge.post.author_id`
    const posts = await executeQuery<RowDataPacket[]>(sql, [])
    return NextResponse.json(posts)
}
