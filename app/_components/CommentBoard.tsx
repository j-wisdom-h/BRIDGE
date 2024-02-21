'use client'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { getComments } from '@/_lib/comment'

import Comment from './Comment'
import CommentForm from './CommentForm'

interface IComment {
    id: number
    post_id: number
    parent_comment_id: number
    author_id: number
    content: string
}

export default function CommentBord({ postId }) {
    const [comments, setComments] = useState<IComment[]>([])

    useEffect(() => {
        handleComment()
    }, [])

    const handleComment = async () => {
        try {
            const res = await getComments(postId)
            setComments(res)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <div className="my-8">
                <h3>댓글창</h3>
                {!comments ? (
                    <p className="py-2">작성된 댓글이 없습니다.</p>
                ) : (
                    comments
                        .filter((comment) => comment.parent_comment_id === null)
                        .map((comment) => (
                            <Comment
                                key={uuidv4()}
                                comment={comment}
                                depth={0}
                                comments={comments}
                                postId={postId}
                                handleComment={handleComment}
                            />
                        ))
                )}
            </div>
            <CommentForm
                postId={postId}
                parentId={null}
                type="comment"
                onCreate={handleComment}
            />
        </>
    )
}