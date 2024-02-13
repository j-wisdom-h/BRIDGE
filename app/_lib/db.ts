import { createPool, Pool, PoolConnection, PoolOptions } from 'mysql2'

//DB pool options
const access: PoolOptions = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || '',
    port: 3306,
}

// DB pool create
const pool: Pool = createPool(access)

// executeQuery 함수
export default function executeQuery<T>(
    query: string,
    arrParams: (string | number | '' | null)[],
): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        pool.getConnection((err: Error, conn: PoolConnection) => {
            if (err) {
                console.error('Error connecting to db:', err.message)
            } else {
                conn.query(query, arrParams, (err, rows) => {
                    conn.release()
                    if (err) {
                        console.error(
                            'Error in executing the query:',
                            err.message,
                        )
                        reject(err)
                    } else {
                        console.log('Query executed successfully')
                        resolve(rows as T)
                    }
                })
            }
        })
    })
}
