import executeQuery from 'app/_lib/db'
import { RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } },
) {
    const id = params.id
    // console.log(request.nextUrl.searchParams)
    // const id = await request.nextUrl.searchParams.get('id')
    const sql = `SELECT * FROM bridge.post WHERE id = ?`
    const post = await executeQuery<RowDataPacket[]>(sql, [id!])
    return NextResponse.json(post)
}
