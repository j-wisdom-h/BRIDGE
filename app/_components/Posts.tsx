import Image from 'next/image'
import Link from 'next/link'

import { colorTagStyles } from '@/_lib/colortag'

export default function Posts({ posts }) {
    return (
        <>
            {posts.length > 0 ? (
                <ul className="grid grid-cols-4 gap-4 auto-rows-fr p-8 sm:grid-cols-2 sm:px-4">
                    {posts.map((post) => {
                        return (
                            <li
                                key={post.id}
                                className="card bg-base-100 border border-gray-300 shadow-lg"
                            >
                                <Link
                                    href={`read/${post.id}`}
                                    className="card-body p-4"
                                >
                                    <h3 className="card-title text-lg">
                                        {post.title}
                                    </h3>
                                    <div className="grow text-xs">
                                        <div>
                                            <p className="text-ellipsis">
                                                {post.content}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap">
                                            키워드
                                            {JSON.parse(post.keywords).map(
                                                (keyword, index) => {
                                                    return (
                                                        <span
                                                            key={keyword}
                                                            className={colorTagStyles(
                                                                index,
                                                            )}
                                                        >
                                                            {keyword}
                                                        </span>
                                                    )
                                                },
                                            )}
                                        </div>
                                        <div>모집인원 : {post.num}</div>
                                        <div>
                                            <p>
                                                모집기간 :{post.startDate}~
                                                {post.endDate}
                                            </p>
                                        </div>
                                        <div>
                                            <span>작성자 : </span>
                                            <span>{post.email}</span>
                                            <Image
                                                width={45}
                                                height={45}
                                                src={
                                                    post.avator ||
                                                    '/image/logo.png'
                                                }
                                                quality={100}
                                                alt="avatar"
                                            />
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            ) : (
                <div className="col-span-4 text-center mt-32">
                    <p>게시된 게시글이 없습니다.</p>
                </div>
            )}
        </>
    )
}
