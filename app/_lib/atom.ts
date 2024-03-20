import { atom } from 'recoil'

export enum Role {
    Admin = 'admin',
    Subadmin = 'subadmin',
    User = 'user',
    Init = '',
}

//recoil state 생성
export const RoleState = atom({
    key: 'RoleState',
    default: { role: Role.Init, allowChat: 1 },
})

export const MemberIdState = atom({ key: 'MemberIdState', default: 0 })
