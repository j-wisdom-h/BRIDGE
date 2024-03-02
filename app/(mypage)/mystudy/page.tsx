'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'

import { getMyPosts } from '@/_lib/post'
interface Post {
    id: number
    title: string
    post_id?: number
}
async function getMystudy(userId) {
    const res = await fetch(
        `http://localhost:3000/api/mypage/mystudy?userId=${userId}`,
    )
    const result = await res.json()
    console.log(result)
    return result
}
export default function MyStudy() {
    const [myposts, setMyposts] = useState<Post[]>([])
    const [selectedPost, setSelectedPost] = useState<number>()
    const selectedPostTitleRef = useRef('')
    const { data: session } = useSession()

    useEffect(() => {
        async function fetchPosts() {
            try {
                if (session) {
                    const posts = await getMyPosts()
                    const studies = await getMystudy(session?.user.id)
                    setMyposts([...posts, ...studies])
                }
            } catch (error) {
                console.error('Error fetching posts:', error)
            }
        }
        fetchPosts()
    }, [])

    // 핸들러: 포스트 선택시 실행
    const handlePostChange = (event) => {
        setSelectedPost(event.target.value)
        selectedPostTitleRef.current =
            event.target.options[event.target.selectedIndex].text
    }

    return (
        <div className="flex">
            {myposts && (
                <select
                    className="select select-bordered w-full max-w-xs"
                    value={selectedPost}
                    onChange={handlePostChange}
                >
                    <option value="">===게시글 목록===</option>
                    {myposts.map((post) => (
                        <option
                            key={post.id}
                            value={post.post_id ? post.post_id : post.id}
                        >
                            {post.title}
                        </option>
                    ))}
                </select>
            )}
            <Link
                href={{
                    pathname: `mystudy/${selectedPostTitleRef.current}`,
                    query: { postId: selectedPost },
                }}
            >
                스터디로 이동하기
            </Link>
        </div>
    )
}
