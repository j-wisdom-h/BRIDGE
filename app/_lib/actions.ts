'use server'

import { ResultSetHeader } from 'mysql2'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getUserId } from 'utils/getUser'

import executeQuery from './db'

async function formDateValues(formdata: FormData) {
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
    values.push(Number(await getUserId()))
    return values
}

async function createPost(formdata: FormData) {
    const values = await formDateValues(formdata)
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

async function updatePost(postId, formdata: FormData) {
    const values = await formDateValues(formdata)
    values[values.length - 1] = postId
    const sql =
        'UPDATE bridge.post SET title = ?, content = ?, num = ?, location = ?, startDate = ?, atTime = ?, duration = ?, endDate = ? WHERE id = ?'
    try {
        await executeQuery<ResultSetHeader>(sql, [...values])
    } catch (err) {
        throw new Error('포스터 수정 실패')
    }
    revalidatePath(`/read/${postId}`)
    redirect(`/read/${postId}`)
}

async function createComment(postId, parentId, formdata: FormData) {
    const content = formdata.get('content')
    const userId = await getUserId()
    const sql =
        'INSERT INTO bridge.comment (post_id, parent_comment_id, author_id, content) VALUES (?, ?, ?, ?)'
    // console.log('postId', postId, 'parentId', parentId, 'userId', userId)
    const values = [postId, parentId, userId, content]

    try {
        await executeQuery<ResultSetHeader>(sql, [...values])
    } catch (err) {
        throw new Error('댓글 게시 실패')
    }
    redirect(`/read/${postId}`)
}

export { createComment, createPost, updatePost }
