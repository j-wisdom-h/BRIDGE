import { getComments } from 'app/_lib/coment'
import { authOptions } from 'app/api/auth/[...nextauth]/route'
import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth'

import { Deletebutton } from '@/_components/Input'

import { getPost } from '../../_lib/post'

export default async function Read({ params }: { params: { id: number } }) {
    const post = await getPost(params.id)
    const comments = await getComments(params.id)
    const session = await getServerSession(authOptions)

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
                    {post.email === session?.user?.email && (
                        <div className="grow flex justify-end items-end">
                            <Link
                                href={`/post/${params.id}`}
                                className="btn btn-warning first:mr-2"
                            >
                                수정하기
                            </Link>
                            <Deletebutton postId={params.id} />
                        </div>
                    )}
                </div>
                <div className="my-8">
                    <h3>댓글창</h3>
                    {comments.length === 0 ? (
                        <p className="py-2">작성된 댓글이 없습니다.</p>
                    ) : (
                        comments.map((comment) => {
                            //comment.id
                            return (
                                <div
                                    key={comment.id}
                                    className="border border-gray-200 rounded-lg p-2 mt-2"
                                >
                                    <p>댓글작성자: {comment.email}</p>
                                    <div>{comment.avatar}</div>
                                    <div>{comment.content}</div>
                                    <button className="underline">수정</button>
                                    <button className="underline">삭제</button>
                                </div>
                            )
                        })
                    )}
                    <form>
                        <textarea
                            className="w-full"
                            rows={4}
                            placeholder="댓글을 입력하세요..."
                        />
                        <button className="btn btn-outline btn-warning">
                            댓글작성
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
