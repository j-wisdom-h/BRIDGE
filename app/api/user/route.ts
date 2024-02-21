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
        console.log('User registered:', result)
        return { success: true, message: 'User registered successfully' }
    } catch (error) {
        console.error('Error registering user:', error)
        return { success: false, message: 'Error registering user' }
    }
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

    return NextResponse.json(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' },
        status: result.success ? 200 : 400,
    })
}
