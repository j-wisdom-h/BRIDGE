import Link from 'next/link'

import { getAllPosts } from './_lib/post'

export default async function Home() {
    const posts = await getAllPosts()

    return (
        <div className="pt-12">
            {posts.map((post) => {
                return (
                    <li key={post.id} className="block mb-5">
                        <Link href={`read/${post.id}`}>
                            <p>제목{post.title}</p>
                            <p>내용{post.content}</p>
                            <p>작성자{post.email}</p>
                        </Link>
                    </li>
                )
            })}
        </div>
    )
}
