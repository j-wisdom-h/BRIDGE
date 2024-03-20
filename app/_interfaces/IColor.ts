interface IColoredTagItem {
    index: number
    tagItem: string
    deleteTagItem: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export type { IColoredTagItem }
