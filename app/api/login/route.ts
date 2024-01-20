import executeQuery from 'app/_lib/db'
import { signJwtAccessToken } from 'app/_lib/jwt'
import bcrypt from 'bcrypt'
import { RowDataPacket } from 'mysql2'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const body = await request.json()
    const sql = `select email, password from bridge.user where email = '${body.username}'`
    const users: RowDataPacket[] = await executeQuery(sql, [])
    const user = users[0]

    console.log('로그인 확인 user', user)

    if (user && (await bcrypt.compare(body.password, user.password))) {
        const { password, ...userWithoutPass } = user
        // console.log('회원임')
        return NextResponse.json(userWithoutPass)
    } else {
        throw new Error('No member information found')
    }
}
