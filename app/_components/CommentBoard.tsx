'use client'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { IComment } from '@/_interfaces/IComment'
import { getComments } from '@/_lib/comment'

import Comment from './Comment'
import CommentForm from './CommentForm'

export default function CommentBord({ author, postId }) {
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
                                author={author}
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
