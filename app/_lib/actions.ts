'use server'
import { ResultSetHeader } from 'mysql2'
import { redirect } from 'next/navigation'

import executeQuery from './db'

async function createPost(userId, formdata: FormData) {
    const desiredKeyOrder = [
        'title',
        'content',
        'num',
        'location',
        'startDate',
        'atTime',
        'duration',
        'endDate',
    ]
    const values = desiredKeyOrder.map((key) => {
        const value = formdata.get(key)
        if (typeof value === 'string') {
            return isNaN(Number(value)) ? value : parseInt(value, 10)
        }
        return String(value)
    })
    values.push(Number(userId))

    const sql =
        'INSERT INTO bridge.post (title, content, num, location, startDate, atTime, duration, endDate, author_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    let postId: number | null = null
    try {
        const res = await executeQuery<ResultSetHeader>(sql, [...values])
        postId = res.insertId
    } catch (err) {
        throw new Error('포스터 게시 실패')
    }
    redirect(`/read/${postId}`)
}
export { createPost }
