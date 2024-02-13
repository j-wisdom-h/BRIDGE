'use client'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import { createComment } from '@/_lib/actions'

export default function CommentForm({ postId, parentId, type }) {
    const crateCommentwithId = createComment.bind(null, postId, parentId)

    const [showForm, setShowForm] = useState<boolean>(
        type === 'comment' ? true : false,
    )
    const { data: session } = useSession()

    const toggleForm = () => {
        setShowForm(!showForm)
    }

    return (
        <>
            {parentId && session && <p onClick={toggleForm}>답글쓰기</p>}
            <form
                action={crateCommentwithId}
                className={showForm ? 'block' : 'hidden'}
            >
                <textarea
                    className="w-full border border-gray-200 rounded-lg p-2 mt-2"
                    name="content"
                    rows={4}
                    placeholder="댓글을 입력하세요..."
                />
                <button
                    className="btn btn-outline btn-warning"
                    disabled={!session}
                >
                    댓글작성
                </button>
            </form>
        </>
    )
}
