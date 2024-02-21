import { createPost, updatePost } from '@/_lib/actions'
import { getPost } from '@/_lib/post'

export default async function PostForm({ postId }) {
    //  생성하기  === id = false, 수정하기  ===  id = true
    const update = !!postId
    const post = postId && (await getPost(postId))
    const updatePostWithId = updatePost.bind(null, postId)

    return (
        <div className="pt-28 mb-28">
            <h2 className="text-2xl text-center orange mb-3.5 font-semibold">
                {update ? '게시글 수정하기' : '스터디 게시글 생성하기'}
            </h2>
            <div className="w-[650px] min-h-[500px] bg-white rounded-2xl shadow-md px-10 pt-10 pb-5 border-2 border-darkgray text-black flex justify-center">
                <form
                    className="flex flex-col w-full"
                    action={update ? updatePostWithId : createPost}
                >
                    <div className="flex items-center mb-4">
                        <label className="w-8 min-w-[90px] mr-2">제목</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            className="input input-bordered input-sm w-[92%]"
                            defaultValue={update ? post.title : ''}
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
                            defaultValue={update ? post.content : ''}
                        ></textarea>
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="w-8 min-w-[90px] mr-2">인원</label>
                        <input
                            type="number"
                            name="num"
                            className="input input-bordered input-sm w-full"
                            defaultValue={update ? post.num : ''}
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="w-8 min-w-[90px] mr-2">장소</label>
                        <input
                            type="text"
                            name="location"
                            className="input input-bordered input-sm w-full"
                            defaultValue={update ? post.location : ''}
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
                            defaultValue={update ? post.startDate : ''}
                        />
                        <span>~</span>
                        <input
                            type="date"
                            name="endDate"
                            className="input input-bordered input-sm w-[50%]"
                            defaultValue={update ? post.endDate : ''}
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
                            defaultValue={update ? post.atTime : ''}
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
                            defaultValue={update ? post.duration : ''}
                        />
                    </div>

                    <input
                        type="submit"
                        value={update ? '수정하기' : '게시하기'}
                        className="orangeBtnL"
                    />
                </form>
            </div>
        </div>
    )
}
