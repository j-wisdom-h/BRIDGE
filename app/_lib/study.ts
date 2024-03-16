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

export { getMembers, getMystudy, getStudy }
