import executeQuery from 'app/_lib/db'

// 이메일로 사용자 조회 함수
export async function findUserByEmail(email: string) {
    const sql = `
    SELECT * FROM bridge.user
    WHERE email = ?
  `
    const values = [email]

    try {
        const users = await executeQuery(sql, values)
        return users[0]
    } catch (error) {
        console.error('Error finding user by email:', error)
        return null
    }
}
