'use server'
import { redirect } from 'next/navigation'
import { getAccessToken } from 'utils/getUser'

async function getComments(postId: number) {
    const res = await fetch(
        `${process.env.NEXTAUTH_URL}/api/comments?postId=${postId}`,
        { cache: 'no-store' },
    )
    const comments = await res.json()
    return comments
}

async function deleteComment(postId: number, commentId: number) {
    const accessToken = await getAccessToken()

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        Authorization: `${accessToken}`,
    }
    const res = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: headers,
    })
    try {
        const result = await res.json()
    } catch (err) {
        throw new Error('댓글 삭제 실패')
    }
    redirect(`/read/${postId}`)
}

export { deleteComment, getComments }
