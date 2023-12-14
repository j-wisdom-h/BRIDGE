import executeQuery from 'app/_lib/db'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
    if (request.method === 'POST') {
        const body = await request.json()
        const { email, name, password, gender, address, birthday } = body

        // 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(password, 10)

        // 회원가입을 위한 SQL 쿼리 - 파라미터화된 쿼리 사용
        const sql = `
        INSERT INTO bridge.user (email, name, password, gender, address, birthday)
        VALUES (?, ?, ?, ?, ?, ?)
    `
        const values = [email, name, hashedPassword, gender, address, birthday]

        try {
            // SQL 쿼리 실행 - 파라미터 값을 넣어 실행
            const result = await executeQuery(sql, values)
            console.log('User registered:', result)

            return new Response(
                JSON.stringify({ message: 'User registered successfully!' }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    status: 200,
                },
            )
        } catch (error) {
            console.error('Error registering user:', error)
            return new Response(
                JSON.stringify({ message: 'Error registering user!' }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    status: 500,
                },
            )
        }
    }
}
