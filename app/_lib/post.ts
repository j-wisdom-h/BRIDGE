'use server'

import { authOptions } from 'app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

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

async function deletePost(postId: number) {
    const session = await getServerSession(authOptions)

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        Authorization: `${session?.user.accessToken}`,
    }

    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${postId}`, {
        method: 'DELETE',
        headers: headers,
    })
    const post = await res.json()
    console.log('delete Result', post)
    redirect('/')
}

export { deletePost, getAllPosts, getPost }
