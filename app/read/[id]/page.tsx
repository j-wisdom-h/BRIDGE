import Image from 'next/image'

import CommentBoard from '@/_components/CommentBoard'
import SubButton from '@/_components/SubButton'
import { getPost } from '@/_lib/post'

export const dynamic = 'force-dynamic'

export default async function Read({ params }: { params: { id: number } }) {
    const postId = params.id
    const post = await getPost(postId)

    return (
        <>
            <div className="w-[50%] h-full pt-28 mb-28">
                <h3 className="font-semibold text-lg text-center mb-2">
                    {post.title}
                </h3>
                <div className="card min-h-[75%] p-8 bg-base-100 border border-gray-300 shadow-lg text-xs">
                    <div className="h-8 min-h-[10rem]">{post.content}</div>
                    <div className="h-8">키워드</div>
                    <div className="h-8">모집인원 : {post.num}</div>
                    <div className="h-8">
                        모집기간 : {post.startDate} ~ {post.endDate}
                    </div>
                    <div className="h-8">
                        <span>시각 : </span>
                        <span>{post.atTime}</span>
                    </div>
                    <div className="h-8">
                        <span>시간 : </span>
                        <span>{post.duration}</span>
                    </div>
                    <div className="h-8">
                        <span>장소 : </span>
                        <span>{post.location}</span>
                    </div>
                    <div className="h-8">
                        <span>작성자 : </span>
                        <span>{post.email}</span>
                        <Image
                            width={45}
                            height={45}
                            src={post.avator || '/image/logo.png'}
                            quality={100}
                            alt="avatar"
                        />
                    </div>
                    <SubButton postId={params.id} author={post.email} />
                </div>
                <CommentBoard author={post.email} postId={postId} />
            </div>
        </>
    )
}
