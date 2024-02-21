'use server'
import { authOptions } from 'app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

async function getUserId() {
    const session = await getServerSession(authOptions)
    return session?.user?.id
}
async function getUserMail() {
    const session = await getServerSession(authOptions)
    return session?.user?.email
}
async function getAccessToken() {
    const session = await getServerSession(authOptions)
    return session?.user?.accessToken
}

export { getAccessToken, getUserId, getUserMail }
