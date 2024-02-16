'use client'

import { useEffect, useRef, useState } from 'react'
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

export default function Comment({ depth, comment, comments, postId }) {
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
    }, [email])

    const toggleEditing = () => {
        setIsEditing(!isEditing)
    }

    const handleSave = async () => {
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
                            />
                        </li>
                    </ul>
                )}
                <CommentForm
                    postId={postId}
                    parentId={comment.parent_comment_id}
                    type="reply"
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
                                />
                            )),
                    )}
        </div>
    )
}
