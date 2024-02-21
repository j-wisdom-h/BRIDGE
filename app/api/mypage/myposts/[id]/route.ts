import { RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'
import { dateFormatting } from 'utils/date'

import executeQuery from '@/_lib/db'

export async function GET(
    req: NextRequest,
    { params }: { params: { id: number } },
) {
    const postId = params.id
    console.log('postID', postId)
    const sql = `
    SELECT
        p.*
    FROM
        bridge.post AS p
    JOIN
        bridge.user AS u ON p.author_id = u.id
    WHERE
        p.id = ?
    `
    try {
        const posts = await executeQuery<RowDataPacket[]>(sql, [postId])
        const transformedPosts = dateFormatting(posts)
        return NextResponse.json(transformedPosts)
    } catch (e) {
        throw new Error('잘못된 이메일입니다.')
    }
}
