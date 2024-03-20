import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { RoleState } from '@/_lib/atom'
import { getMyRole, updateAllowChat } from '@/_lib/study'

function UserInfoForm({ memberId }: { memberId: number }) {
    const { data: session } = useSession()
    const [roleState, setRoleState] = useRecoilState(RoleState)
    const { role, allowChat } = roleState

    useEffect(() => {
        memberId &&
            session &&
            (async () => {
                try {
                    const res = await getMyRole(memberId)
                    const { role, allow_chat } = res
                    setRoleState({ role: role, allowChat: allow_chat })
                } catch (error) {
                    console.error(error)
                }
            })()
    }, [session, memberId, setRoleState])

    const handleEdit = (event) => {
        const updatedAllowChat = event.target.checked as boolean
        setRoleState({ ...roleState, allowChat: Number(!updatedAllowChat) })
        updateAllowChat(Number(updatedAllowChat), memberId)
    }

    const fields = [
        { fieldName: 'role', label: 'Role' },
        { fieldName: 'allowChat', label: 'Allow Chat' },
    ]

    return (
        <div className="card bg-base-100 shadow-xl p-5 mb-8">
            <form>
                <h3>내 정보 설정</h3>
                <ul>
                    <li>
                        {fields[0].label} : {role}
                    </li>
                    <li>
                        {fields[1].label} :
                        <input
                            type="checkbox"
                            className="toggle [--tglbg:yellow] bg-blue-500 hover:bg-blue-700 border-blue-500"
                            checked={Boolean(allowChat)}
                            onChange={handleEdit}
                        />
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default UserInfoForm
