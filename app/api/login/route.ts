import executeQuery from 'app/_lib/db'
import { RowDataPacket } from 'mysql2'

export async function POST(request: Request) {
    const body = await request.json()
    const sql = `select email, password from bridge.user where email = '${body.username}'`
    const users: RowDataPacket[] = await executeQuery(sql, [])
    const user = users[0]

    console.log('user', user)
    //if (user && (await bcrypt.compare(body.password, user.password))) {

    if (user) {
        const { password, ...userWithoutPass } = user
        return new Response(JSON.stringify(userWithoutPass))
    } else return new Response(JSON.stringify(null))
}
