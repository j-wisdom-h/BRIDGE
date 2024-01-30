import executeQuery from 'app/_lib/db'
import bcrypt from 'bcrypt'
import { RowDataPacket } from 'mysql2'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const body = await request.json()
    const sql = `select id, email, password from bridge.user where email = '${body.username}'`
    const users: RowDataPacket[] = await executeQuery(sql, [])
    const user = users[0]

    if (user && (await bcrypt.compare(body.password, user.password))) {
        // console.log(user)
        const { password, ...userWithoutPass } = user
        return NextResponse.json(userWithoutPass)
    } else {
        throw new Error('No member information found')
    }
}
