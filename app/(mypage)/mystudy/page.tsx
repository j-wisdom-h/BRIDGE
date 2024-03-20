'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'

import { IstudyPost } from '@/_interfaces/IPost'
import { getMystudy } from '@/_lib/study'

export default function MyStudy() {
    const [mystudies, setMyStudies] = useState<IstudyPost[]>([])
    const [selectedPost, setSelectedPost] = useState<number>()
    const selectedPostTitleRef = useRef('')
    const { data: session } = useSession()
    const { data: session } = useSession()

    useEffect(() => {
        async function fetchPosts() {
            try {
                if (session) {
                    const studies = await getMystudy(session?.user.id)
                    setMyStudies(studies)
                }
            } catch (error) {
                console.error('Error fetching posts:', error)
            }
        }
        fetchPosts()
    }, [session])

    // 핸들러: 포스트 선택시 실행
    const handlePostChange = (event) => {
        setSelectedPost(event.target.value)
        selectedPostTitleRef.current =
            event.target.options[event.target.selectedIndex].text
    }

    return (
        <div className="h-full">
            <div className="flex justify-center items-center">
                {mystudies && (
                    <select
                        className="select select-bordered w-full max-w-md"
                        value={selectedPost}
                        onChange={handlePostChange}
                    >
                        <option value="">===게시글 목록===</option>
                        {mystudies.map((mystudy) => (
                            <option key={mystudy.id} value={mystudy.id}>
                                {mystudy.title}
                            </option>
                        ))}
                    </select>
                )}
                <Link
                    href={{
                        pathname: `mystudy/${selectedPostTitleRef.current}`,
                        query: { id: selectedPost },
                    }}
                >
                    <button className="btn bg-orange-500 text-white hover:bg-orange-600">
                        스터디로 이동하기
                    </button>
                </Link>
            </div>
        </div>
    )
}
