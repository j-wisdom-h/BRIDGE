'use client'

import { deletePost } from '@/_lib/post'

function Deletebutton({ postId }) {
    function openModal() {
        ;(
            document.getElementById('deleteModal') as HTMLDialogElement
        ).showModal()
    }

    return (
        <>
            <button className="btn btn-warning" onClick={openModal}>
                삭제하기
            </button>
            <dialog id="deleteModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">게시글 삭제</h3>
                    <p className="py-4">해당 게시물을 삭제하시겠습니까?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button
                                className="btn mr-2"
                                onClick={() => deletePost(postId)}
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
