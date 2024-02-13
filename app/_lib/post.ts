import { redirect } from 'next/navigation'
import { getAccessToken, getUserMail } from 'utils/getUser'

async function getAllPosts() {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
        cache: 'no-store',
    })
    const posts = await res.json()
    return posts
}

async function getPost(postId: number) {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${postId}`, {
        cache: 'no-store',
    })
    const post = await res.json()
    return post[0]
}

async function getMyPost() {
    const email = await getUserMail()
    const res = await fetch(
        `http://localhost:3000/api/mypage/myposts?email=${email}`,
    )
    const posts = await res.json()
    return posts
}

async function deletePost(postId: number) {
    const accessToken = await getAccessToken()

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        Authorization: `${accessToken}`,
    }

    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${postId}`, {
        method: 'DELETE',
        headers: headers,
    })
    const post = await res.json()
    console.log('delete Result', post)
    redirect('/')
}

export { deletePost, getAllPosts, getMyPost, getPost }
