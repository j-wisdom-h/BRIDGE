import { getUserId } from 'utils/getUser'

async function getComments(postId: number) {
    const res = await fetch(
        `http://localhost:3000/api/comments?postId=${postId}`,
    )
    const comments = await res.json()
    return comments
}

async function createComment(
    postId: number,
    parentId: number,
    content: string,
) {
    const userId = await getUserId()
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, parentId, userId, content }),
    }
    try {
        const res = await fetch(
            `http://localhost:3000/api/comments`,
            requestOptions,
        )
        await res.json()
    } catch (err) {
        console.error(err)
    }
}

async function deleteComment(postId: number, commentId: number) {
    const res = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
        method: 'DELETE',
    })
    try {
        await res.json()
    } catch (err) {
        console.error(err)
    }
}

export { createComment, deleteComment, getComments }
