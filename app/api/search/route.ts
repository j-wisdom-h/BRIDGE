import { RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'

import executeQuery from '@/_lib/db'

export async function GET(req: NextRequest) {
    const keyword = req.nextUrl.searchParams.get('keyword')
    const location = req.nextUrl.searchParams.get('location')
    const time = req.nextUrl.searchParams.get('time')

    let sql = `SELECT * 
        FROM bridge.user
        JOIN bridge.post ON bridge.user.id = bridge.post.author_id
        WHERE 1=1` // WHERE 절의 플레이스홀더
    const params: string[] = []

    if (keyword) {
        const keywordList = JSON.parse(keyword)
        const OR_conditions = keywordList
            .map(() => 'keywords LIKE ?')
            .join(' OR ')

        sql += ` AND (${OR_conditions})`
        params.push(...keywordList.map((keyword) => `%${keyword}%`))
    }

    if (location) {
        sql += ` AND location = ?`
        params.push(location)
    }

    if (time) {
        sql += ` AND startDate = ?`
        params.push(time)
    }

    try {
        const filteredPosts = await executeQuery<RowDataPacket[]>(sql, params)
        return NextResponse.json(filteredPosts)
    } catch (err) {
        console.error(err)
    }
}
