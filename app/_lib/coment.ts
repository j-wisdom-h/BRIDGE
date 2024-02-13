async function getComments(postId: number): Promise<any[]> {
    const res = await fetch(
        `${process.env.NEXTAUTH_URL}/api/comments/${postId}`,
        {
            cache: 'no-store',
        },
    )
    console.log(res)
    const comments = await res.json()
    console.log(comments)
    // return comments
    return comments
}

export { getComments }
