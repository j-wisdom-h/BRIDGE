import executeQuery from 'app/_lib/db'
import { signJwtAccessToken } from 'app/_lib/jwt'
import bcrypt from 'bcrypt'
import { RowDataPacket } from 'mysql2'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const body = await request.json()
    const sql = `select id, email, password from bridge.user where email = '${body.username}'`
    const users = await executeQuery<RowDataPacket[]>(sql, [])
    const user = users[0]

    if (user && (await bcrypt.compare(body.password, user.password))) {
        const { password, ...userWithoutPass } = user
        const accessToken = signJwtAccessToken(userWithoutPass)
        const result = { ...userWithoutPass, accessToken }
        return NextResponse.json(result)
    } else {
        throw new Error('No member information found')
    }
}
