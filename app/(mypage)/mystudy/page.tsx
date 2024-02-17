'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { getMyPosts } from '@/_lib/post'
interface Post {
    id: number
    title: string
}

export default function MyStudy() {
    const [myposts, setMyposts] = useState<Post[]>([])
    const [selectedPost, setSelectedPost] = useState<number>()
    const selectedPostTitleRef = useRef('')

    useEffect(() => {
        async function fetchPosts() {
            try {
                const posts = await getMyPosts()
                setMyposts(posts)
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
                        <option key={post.id} value={post.id}>
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
