import executeQuery from './_lib/db.tsx'

export default async function Home() {
    const sql = 'select * from bridge.user'
    const data = await executeQuery(sql, '')
    const getdata = JSON.parse(JSON.stringify(data))
    console.log(getdata)
    return (
        <div>
            {getdata.map((data, i) => {
                return (
                    <>
                        <p>
                            {data.id} {data.username}
                        </p>
                    </>
                )
            })}
        </div>
    )
}
