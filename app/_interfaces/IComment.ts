interface IComment {
    id: number
    post_id: number
    parent_comment_id: number
    author_id: number
    content: string
}
export type { IComment }
