import {
    createPool,
    Pool,
    PoolConnection,
    ResultSetHeader,
    RowDataPacket,
} from 'mysql2'

// DB 연결 및 풀 생성
const pool: Pool = createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || '',
    port: 3306,
})

// executeQuery 함수
export default function executeQuery(
    query: string,
    arrParams: (string | '')[],
): Promise<RowDataPacket[]> {
    return new Promise((resolve, reject) => {
        pool.getConnection((err: Error, conn: PoolConnection) => {
            if (err) {
                console.error('Error connecting to db:', err.message)
                reject(err)
            } else {
                conn.query(
                    query,
                    arrParams,
                    (
                        err: Error | null,
                        data: RowDataPacket[] | ResultSetHeader,
                    ) => {
                        conn.release()
                        if (err) {
                            console.error(
                                'Error in executing the query:',
                                err.message,
                            )
                            reject(err)
                        } else {
                            console.log('Query executed successfully')
                            resolve(data as RowDataPacket[])
                        }
                    },
                )
            }
        })
    })
}
