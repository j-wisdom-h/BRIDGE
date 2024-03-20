'use client'
import { useSession } from 'next-auth/react'
import React, { memo, useCallback, useState } from 'react'

import { createComment } from '@/_lib/comment'

function CommentForm({ postId, parentId, type, onCreate }) {
    const { data: session } = useSession()
    const [showForm, setShowForm] = useState<boolean>(type === 'comment')

    const toggleForm = useCallback(() => {
        setShowForm((prevShowForm) => !prevShowForm)
    }, [])

    const handleCreateComment = async (event) => {
        event.preventDefault()
        const content = event.target.elements.content.value
        try {
            await createComment(postId, parentId, content)
            onCreate()
        } catch (error) {
            console.error('Error creating comment:', error)
        }
    }

    return (
        <>
            {session && <p onClick={toggleForm}>답글쓰기</p>}
            <form
                onSubmit={handleCreateComment}
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
                    type="submit"
                >
                    댓글작성
                </button>
            </form>
        </>
    )
}
export default memo(CommentForm)
