import { ResultSetHeader } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'

import executeQuery from '@/_lib/db'

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: number } },
) {
    const id = params.id
    const sql = 'DELETE FROM bridge.comment WHERE id = ?'
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
