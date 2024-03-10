async function getInvites(userId: string) {
    if (!userId) {
        console.error('Invalid user id')
        return []
    }
    try {
        const res = await fetch(
            `http://localhost:3000/api/mypage/mystudy/invite?invited_member_id=${userId}`,
        )
        const invitesData = await res.json()

        return invitesData
    } catch (err) {
        console.error(err.message)
    }
}

export { getInvites }
