async function getAllPosts() {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
        cache: 'no-store',
    })
    const posts = await res.json()
    return posts
}

async function getPost(params) {
    const res = await fetch(
        `${process.env.NEXTAUTH_URL}/api/posts/${params.id}`,
        { next: { revalidate: 10 } },
    )
    const post = await res.json()
    return post[0]
}

export { getAllPosts, getPost }
