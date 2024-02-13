import executeQuery from 'app/_lib/db'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('postId')
    const sql = `
        SELECT 
            parent.parent_comment_id AS parent_comment_id,
            parent.id AS id, 
            parent.content AS content,
            parent.author_id AS author_id,
            parent.post_id AS post_id,
            MAX(parent_u.email) AS author_email,
            MAX(parent_u.avatar) AS author_avatar,
            GROUP_CONCAT(child.id) AS child_ids
        FROM 
            bridge.comment AS parent
        LEFT JOIN 
            bridge.comment AS child ON child.parent_comment_id = parent.id
        JOIN 
            bridge.user AS parent_u ON parent.author_id = parent_u.id
        LEFT JOIN 
            bridge.user AS child_u ON child.author_id = child_u.id
        WHERE 
            parent.post_id = ?
        GROUP BY 
            parent.id;
    `
    const comments = await executeQuery<RowDataPacket[]>(sql, [id])
    // console.log(comments)
    return NextResponse.json(comments)
}

export async function PUT(request: NextRequest) {
    const body = await request.json()
    const { content } = body
    const id = request.nextUrl.searchParams.get('commentId')

    const sql = 'UPDATE bridge.comment SET content = ? WHERE id = ?'
    try {
        await executeQuery<ResultSetHeader>(sql, [content, id])
        return NextResponse.json('코멘트 수정완료')
    } catch (err) {
        throw Error('코멘트 수정 실패')
    }
}
