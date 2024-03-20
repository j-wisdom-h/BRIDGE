import PostForm from '@/_components/PostForm'

export default async function UpdatePost({
    params,
}: {
    params: { id: number }
}) {
    return <PostForm postId={params.id} />
}
