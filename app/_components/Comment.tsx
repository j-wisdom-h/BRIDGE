'use client'

import { memo, useCallback, useEffect, useRef, useState } from 'react'
import React from 'react'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import React from 'react'
import { getUserMail } from 'utils/getUser'
import { v4 as uuidv4 } from 'uuid'

import CommentForm from './CommentForm'
import { Deletebutton } from './Modal'

const mlVariant = {
    0: 'ml-0',
    1: 'ml-5',
    2: 'ml-10',
    3: 'ml-15',
}

function Comment({ depth, comment, comments, postId, author, handleComment }) {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [email, setEmail] = useState<string | null>(null)
    const [content, setContent] = useState(comment.content)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const [isAuthor, setIsAuthor] = useState(false)

    useEffect(() => {
        ;(async () => {
            const res = await getUserMail()
            if (res) setEmail(res)
        })()
    }, [])

    useEffect(() => {
        setIsAuthor(email !== null && email === comment?.author_email)
    }, [comment?.author_email, email])

    const toggleEditing = useCallback(() => {
        setIsEditing((prevShowForm) => !prevShowForm)
    }, [])

    const handleSave = useCallback(async () => {
        const updateContent = textAreaRef?.current?.value
        try {
            await fetch(
                `http://localhost:3000/api/comments?commentId=${comment.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        content: updateContent,
                    }),
                },
            )
        } catch (err) {
            console.log(err)
        }
        setIsEditing(false)
        setContent(updateContent)
    }, [])

    async function inviteMember() {
        try {
            const res = await fetch(
                `http://localhost:3000/api/mypage/mystudy/invite`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        post_id: postId,
                        inviting_member_email: email,
                        invited_member_email: comment?.author_email,
                        status: 'pending',
                    }),
                },
            )
            if (res.status === 200) {
                const result = await res.json()
                alert(result.message)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className={mlVariant[depth]}>
            <div className={`border border-gray-200 rounded-lg p-2 mt-2`}>
                {isEditing ? (
                    <textarea defaultValue={content} ref={textAreaRef} />
                ) : (
                    <p>{content}</p>
                )}
                <p>{comment?.author_email}</p>
                {email &&
                    email === author &&
                    author !== comment?.author_email && (
                        <button
                            className="btn btn-outline btn-warning"
                            onClick={inviteMember}
                        >
                            초대하기
                        </button>
                    )}
                <p>{comment?.author_avatar}</p>
                {isAuthor && (
                    <ul className="flex">
                        <li className="mr-2">
                            {isEditing ? (
                                <button
                                    className="underline"
                                    onClick={handleSave}
                                >
                                    저장
                                </button>
                            ) : (
                                <button
                                    className="underline"
                                    onClick={toggleEditing}
                                >
                                    수정
                                </button>
                            )}
                        </li>
                        <li>
                            <Deletebutton
                                postId={postId}
                                commentId={comment.id}
                                type="comment"
                                onDelete={handleComment}
                            />
                        </li>
                    </ul>
                )}
                <CommentForm
                    postId={postId}
                    parentId={comment.id}
                    type="reply"
                    onCreate={handleComment}
                />
            </div>

            {comment.child_ids &&
                comment.child_ids
                    .split(',')
                    .map((childId) =>
                        comments
                            .filter((c) => parseInt(childId) === c.id)
                            .map((child) => (
                                <Comment
                                    key={uuidv4()}
                                    depth={depth + 1}
                                    comment={child}
                                    comments={comments}
                                    postId={postId}
                                    author={author}
                                    handleComment={handleComment}
                                />
                            )),
                    )}
        </div>
    )
}
export default memo(Comment)
