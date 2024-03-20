async function getStudy(studyId: number) {
    const res = await fetch(
        `http://localhost:3000/api/mypage/mystudy?studyId=${studyId}`,
    )
    const result = await res.json()
    return result
}
async function getMystudy(userId: string) {
    const res = await fetch(
        `http://localhost:3000/api/mypage/mystudy?userId=${userId}`,
    )
    const result = await res.json()
    return result
}
async function getMembers(studyId: number) {
    const res = await fetch(
        `http://localhost:3000/api/mypage/mystudy/member?studyId=${studyId}`,
    )
    const result = await res.json()
    return result
}

async function getMemberId(studyId: number, userId: string) {
    const res = await fetch(
        `http://localhost:3000/api/mypage/mystudy/member?studyId=${studyId}&userId=${userId}`,
    )
    const result = await res.json()
    return result[0].id
}

async function getMyRole(memberId: number) {
    const res = await fetch(
        `http://localhost:3000/api/mypage/mystudy/role?memberId=${memberId}`,
    )
    const result = await res.json()
    return result
}

async function updateAllowChat(updateVal: number, memberId: number) {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateVal),
    }

    const res = await fetch(
        `http://localhost:3000/api/mypage/mystudy/member?memberId=${memberId}`,
        options,
    )
    const result = await res.json()

    return result
}

export {
    getMemberId,
    getMembers,
    getMyRole,
    getMystudy,
    getStudy,
    updateAllowChat,
}
