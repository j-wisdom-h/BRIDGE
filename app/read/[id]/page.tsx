import Image from 'next/image'
import Link from 'next/link'
import { getUserMail } from 'utils/getUser'
import { v4 as uuidv4 } from 'uuid'

import Comment from '@/_components/Comment'
import CommentForm from '@/_components/CommentForm'
import { Deletebutton } from '@/_components/Modal'
import { getComments } from '@/_lib/comment'
import { getPost } from '@/_lib/post'

export default async function Read({ params }: { params: { id: number } }) {
    const postId = params.id
    const post = await getPost(postId)
    const comments = await getComments(postId)
    const email = await getUserMail()

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
                    {post.email === email && (
                        <div className="grow flex justify-end items-end">
                            <Link
                                href={`/post/${params.id}`}
                                className="btn btn-warning first:mr-2"
                            >
                                수정하기
                            </Link>
                            <Deletebutton postId={params.id} type="post" />
                        </div>
                    )}
                </div>
                <div className="my-8">
                    <h3>댓글창</h3>
                    {comments.length === 0 ? (
                        <p className="py-2">작성된 댓글이 없습니다.</p>
                    ) : (
                        comments
                            .filter(
                                (comment) => comment.parent_comment_id === null,
                            )
                            .map((comment) => (
                                <Comment
                                    key={uuidv4()}
                                    comment={comment}
                                    depth={0}
                                    comments={comments}
                                    postId={postId}
                                />
                            ))
                    )}
                </div>
                <CommentForm postId={postId} parentId={null} type="comment" />
            </div>
        </>
    )
}
