import executeQuery from 'app/_lib/db'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'
import { dateFormatting } from 'utils/date'

export async function GET(
    request: NextRequest,
    { params }: { params: { id: number } },
) {
    const id = params.id
    const sql = `SELECT * FROM bridge.post JOIN bridge.user ON bridge.user.id = bridge.post.author_id WHERE bridge.post.id = ?`
    const post = await executeQuery<RowDataPacket[]>(sql, [id!])
    const transformedPost = dateFormatting(post)
    return NextResponse.json(transformedPost)
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: number } },
) {
    const id = params.id
    const sql = 'DELETE FROM bridge.post WHERE id = ?'
    try {
        const post = await executeQuery<ResultSetHeader>(sql, [id!])
        console.log('server delete', post)
        return NextResponse.json({
            success: true,
            message: '삭제가 성공적으로 완료되었습니다.',
        })
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: '삭제 실패.',
        })
    }
}
