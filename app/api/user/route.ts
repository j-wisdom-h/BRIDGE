import executeQuery from 'app/_lib/db'
import bcrypt from 'bcrypt'
import { ResultSetHeader } from 'mysql2'
import { NextResponse } from 'next/server'
import { findUserByEmail } from 'utils/userQueries'

import { User } from '@/_interfaces/IAuth'

// 회원가입 처리 함수
export async function signUpUser(user: User) {
    const { email, password } = user
    const hashedPassword = await bcrypt.hash(password, 10)
    const sql = `
    INSERT INTO bridge.user (email, password)
    VALUES (?, ?)`

    const values = [email, hashedPassword]

    try {
        const existingUser = await findUserByEmail(email)
        if (existingUser) {
            return { success: false, message: 'Email is already registered' }
        }

        const result = await executeQuery<ResultSetHeader>(sql, values)
        const userId = result.insertId
        console.log('User registered:', result)
        return {
            userId: userId,
            success: true,
            message: 'User registered successfully',
        }
    } catch (error) {
        console.error('Error registering user:', error)
        return { success: false, message: 'Error registering user' }
    }
}

// 사용자 알람 테이블에 새로운 row를 생성하는 함수
export async function createAlarmRow(userId: number) {
    const sql = 'INSERT INTO alarm (user_id, checked_count) VALUES (?, ?)'
    await executeQuery<ResultSetHeader>(sql, [userId, 0]) // 처음에 확인한 개수는 0으로 초기화
}

// POST 요청 처리
export async function POST(request: Request) {
    const body = await request.json()
    const { email, password } = body
    const user: User = {
        email,
        password,
    }

    const result = await signUpUser(user)

    if (result.success && result.userId) {
        // 사용자 알람 테이블 row생성
        try {
            await createAlarmRow(result.userId) // 알람 테이블에 새로운 row 생성
        } catch (error) {
            console.error('Error creating alarm row for user:', error)
        }
    }

    return NextResponse.json(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' },
        status: result.success ? 200 : 400,
    })
}
