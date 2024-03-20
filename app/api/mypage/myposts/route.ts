import { RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'
import { dateFormatting } from 'utils/date'

import executeQuery from '@/_lib/db'

export async function GET(req: NextRequest) {
    const userEmail = req.nextUrl.searchParams.get('email')
    const sql = `
    SELECT
        p.*
    FROM
        bridge.post AS p
    JOIN
        bridge.user AS u ON p.author_id = u.id
    WHERE
        u.email = ?
    `
    if (userEmail) {
        const posts = await executeQuery<RowDataPacket[]>(sql, [userEmail])
        const transformedPosts = dateFormatting(posts)
        return NextResponse.json(transformedPosts)
    } else {
        throw new Error('잘못된 이메일입니다.')
    }
}
