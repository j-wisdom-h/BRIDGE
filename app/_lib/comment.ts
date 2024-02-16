async function getComments(postId: number): Promise<any[]> {
    const res = await fetch(
        `${process.env.NEXTAUTH_URL}/api/comments?postId=${postId}`,
    )
    const comments = await res.json()
    return comments
}

async function deleteComment(commentId: number) {
    console.log(commentId)
    const res = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
        method: 'DELETE',
    })
    const comments = await res.json()
    console.log(comments)
}

export { deleteComment, getComments }
