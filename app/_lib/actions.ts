'use server'
import { authOptions } from 'app/api/auth/[...nextauth]/route'
import { ResultSetHeader } from 'mysql2'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import executeQuery from './db'

async function formDateValues(formdata: FormData) {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
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
    return values
}

async function createPost(formdata: FormData) {
    const values = await formDateValues(formdata)
    const sql =
        'INSERT INTO bridge.post (title, content, num, location, startDate, atTime, duration, endDate, author_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    let postId: number | null = null
    let studyId, memberId

    try {
        const res = await executeQuery<ResultSetHeader>(sql, [...values])
        postId = res.insertId
    } catch (err) {
        throw new Error('게시글 작성 실패: ' + err.message)
    }

    try {
        // 스터디 생성
        const studySql =
            'INSERT INTO bridge.study (post_id, manager_id, title, content) VALUES (?, ?, ?, ?)'
        const result = await executeQuery<ResultSetHeader>(studySql, [
            postId,
            values[8],
            values[0],
            values[1],
        ])
        studyId = result.insertId
    } catch (err) {
        throw new Error('스터디 생성 실패: ' + err.message)
    }

    // member테이블 row 생성
    try {
        const author_id = values[values.length - 1]
        const result = await executeQuery<ResultSetHeader>(
            'INSERT INTO member (user_id, role) VALUES (?, ?)',
            [author_id, 'admin'],
        )
        memberId = result.insertId // 새로운 맴버의 ID 반환
    } catch (e) {
        console.error('member테이블 row 생성 실패')
        return NextResponse.json({
            message: 'member테이블 row 생성 실패',
        })
    }

    // study_memer 테이블 row생성
    try {
        const addMemberToStudyQuery =
            'INSERT INTO study_member (study_id, member_id) VALUES (?, ?)'
        await executeQuery(addMemberToStudyQuery, [studyId, memberId])
        console.log('Invite accepted successfully')
    } catch (err) {
        console.error(err)
        return NextResponse.json(
            {
                message: 'Invite rejected failed',
            },
            { status: 200 },
        )
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
    redirect(`/read/${postId}`)
}

export { createPost, updatePost }
