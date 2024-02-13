import Image from 'next/image'
import Link from 'next/link'

import { getAllPosts } from './_lib/post'
export const dynamic = 'force-dynamic'

export default async function Home() {
    const posts = await getAllPosts()

    return (
        <div className="grid grid-cols-4 gap-4 auto-rows-fr p-16">
            {posts &&
                posts.map((post) => {
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
                                    <div>키워드</div>
                                    <div>모집인원 : {post.num}</div>
                                    <div>
                                        <p>
                                            모집기간 :
                                            <span> {post.startDate}</span>~
                                            <span>{post.endDate}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <span>작성자 : </span>
                                        <span>{post.email}</span>
                                        <Image
                                            width={45}
                                            height={45}
                                            src={
                                                post.avator || '/image/logo.png'
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
        </div>
    )
}
