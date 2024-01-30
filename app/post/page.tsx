'use client'
import { createPost } from 'app/_lib/actions'
import { useSession } from 'next-auth/react'

export default function Post() {
    const { data: session } = useSession()
    const createPostWithId = createPost.bind(null, session?.user.id)

    return (
        <>
            <h2 className="text-2xl text-center orange mb-3.5 font-semibold">
                스터디 게시글 생성하기
            </h2>
            <div className="w-[650px] min-h-[500px] bg-white rounded-2xl shadow-md px-10 pt-10 pb-5 border-2 border-darkgray text-black flex justify-center">
                <form
                    className="flex flex-col w-full"
                    action={createPostWithId}
                >
                    <div className="flex items-center mb-4">
                        <label className="w-8 min-w-[90px] mr-2">제목</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            className="input input-bordered input-sm w-[92%]"
                        />
                    </div>

                    <div className="flex items-center mb-4">
                        <label className="w-8 min-w-[90px] mr-2">내용</label>
                        <textarea
                            className="textarea textarea-bordered resize-none min-w-[360px] max-h-[300px] w-full"
                            name="content"
                            placeholder="Content"
                            rows={10}
                            minLength={10}
                            maxLength={200}
                        ></textarea>
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="w-8 min-w-[90px] mr-2">인원</label>
                        <input
                            type="number"
                            name="num"
                            className="input input-bordered input-sm w-full"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="w-8 min-w-[90px] mr-2">장소</label>
                        <input
                            type="text"
                            name="location"
                            className="input input-bordered input-sm w-full"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="w-8 min-w-[90px] mr-2">
                            모집기간
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            className="input input-bordered input-sm w-[50%]"
                        />
                        <span>~</span>
                        <input
                            type="date"
                            name="endDate"
                            className="input input-bordered input-sm w-[50%]"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="w-8 min-w-[90px] mr-2">
                            스터디 시각
                        </label>
                        <input
                            type="time"
                            name="atTime"
                            className="input input-bordered input-sm w-full"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="w-8 min-w-[90px] mr-2">
                            스터디 시간
                        </label>
                        <input
                            type="number"
                            name="duration"
                            className="input input-bordered input-sm w-full"
                        />
                    </div>

                    <input
                        type="submit"
                        value="게시하기"
                        className="orangeBtnL"
                    />
                </form>
            </div>
        </>
    )
}
