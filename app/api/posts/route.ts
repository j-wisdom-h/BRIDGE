import executeQuery from 'app/_lib/db'
import { RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'
import { dateFormatting } from 'utils/date'

export async function GET(request: NextRequest) {
    const limit = 16
    const sql = `SELECT *
                    FROM bridge.user
                    JOIN bridge.post ON bridge.user.id = bridge.post.author_id ORDER BY created_at DESC LIMIT ${limit}`
    const posts = await executeQuery<RowDataPacket[]>(sql, [])
    const transformedPosts = dateFormatting(posts)
    return NextResponse.json(transformedPosts)
}
