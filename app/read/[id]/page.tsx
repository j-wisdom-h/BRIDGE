import { getPost } from '../../_lib/post'

export default async function Read({ params }: { params: { id: number } }) {
    const posts = await getPost(params)

    return (
        <>
            <h1>Read</h1>
            <p>{posts.title}</p>
        </>
    )
}
