'use client'

export default function InviteResponse({
    studyId,
    userId,
    inviteId,
    onResponseSent,
}) {
    async function handleResponse(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) {
        const response = e.currentTarget.value

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ response, studyId, userId, inviteId }),
        }
        const res = await fetch(
            'http://localhost:3000/api/mypage/mystudy/invite/response',
            requestOptions,
        )
        const result = await res.json()
    }

    return (
        <div className="flex justify-end">
            <button
                className="btn btn-outline btn-sm btn-warning mr-2"
                value="accepted"
                onClick={(e) => handleResponse(e)}
                disabled={onResponseSent}
            >
                수락
            </button>
            <button
                className="btn btn-outline btn-sm  btn-warning"
                value="rejected"
                onClick={(e) => handleResponse(e)}
                disabled={onResponseSent}
            >
                거절
            </button>
        </div>
    )
}
