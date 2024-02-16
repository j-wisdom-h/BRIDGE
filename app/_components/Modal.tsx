'use client'

import { useEffect, useState } from 'react'

import { deleteComment } from '@/_lib/comment'
import { deletePost } from '@/_lib/post'

function Deletebutton({ postId, commentId, type }) {
    const [kind, setKind] = useState('')
    const [modalId, setModalId] = useState('')

    function openModal() {
        ;(
            document.getElementById(
                `${modalId}${commentId}`,
            ) as HTMLDialogElement
        ).showModal()
    }

    function isPost() {
        return type === 'post'
    }

    useEffect(() => {
        setKind(isPost() ? '게시글' : '댓글')
        setModalId(isPost() ? 'postModal' : 'commentModal')
    }, [])

    const buttonStyle = type === 'post' ? 'btn btn-warning' : 'underline'

    return (
        <>
            <button className={buttonStyle} onClick={openModal}>
                삭제하기
            </button>
            <dialog id={`${modalId}${commentId}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{kind} 삭제</h3>
                    <p className="py-4">해당 {kind}을 삭제하시겠습니까?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button
                                className="btn mr-2"
                                onClick={() =>
                                    type === 'post'
                                        ? deletePost(postId)
                                        : deleteComment(commentId)
                                }
                            >
                                확인
                            </button>
                            <button className="btn">닫기</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export { Deletebutton }
