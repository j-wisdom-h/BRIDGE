interface IMember {
    study_id: number
    user_id: number
    email: string
    avator: string
}
interface Istudy {
    title: string
    post_content: string
    post_location: string
    post_num: number
    post_atTime: string
}

interface IstudyAll {
    0: Istudy[]
    1: IMember[]
}

export type { IMember, Istudy, IstudyAll }
