interface defaultPost {
    id: number
    title: string
}

interface IstudyPost extends defaultPost {
    post_id?: number
}

interface Ipost extends defaultPost {
    content: string
    keywords: string
    num: number
    startDate: string
    endDate: string
    avator: string
    email: string
}

export type { defaultPost, Ipost, IstudyPost }
