import { redirect } from 'next/navigation'
import { getAccessToken, getUserMail } from 'utils/getUser'

async function getAllPosts() {
    const res = await fetch(`http://localhost:3000/api/posts`)
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
async function getMyPosts() {
    const email = await getUserMail()
    const res = await fetch(
        `http://localhost:3000/api/mypage/myposts?email=${email}`,
    )
    const posts = await res.json()
    return posts
}
async function getMyPost(postId: number) {
    const res = await fetch(
        `http://localhost:3000/api/mypage/myposts/${postId}`,
    )
    const posts = await res.json()
    console.log(posts)
    return posts[0]
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

async function searchPost(tagList: string[], location?: string, time?: string) {
    const url = new URL(`http://localhost:3000/api/search`)
    if (tagList.length > 0) {
        url.searchParams.set('keyword', JSON.stringify(tagList))
    }
    if (location && location !== '') {
        url.searchParams.set('location', location)
    }
    if (time && time !== '') {
        url.searchParams.set('time', time)
    }
    const res = await fetch(url.toString())
    const result = await res.json()
    return result
}

export { deletePost, getAllPosts, getMyPost, getMyPosts, getPost, searchPost }
