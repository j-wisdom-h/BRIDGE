'use client'
import { useEffect, useState } from 'react'

import { IColoredTagItem } from '@/_interfaces/IColor'
import { colorTagStyles } from '@/_lib/colortag'

import SearchKeyword from './SearchKeyword'

export function ColoredTagItem({
    index,
    tagItem,
    deleteTagItem,
}: IColoredTagItem) {
    return (
        <li key={index} className={colorTagStyles(index)}>
            <p className="whitespace-nowrap mr-2">{tagItem}</p>
            <button onClick={deleteTagItem} value={tagItem} type="button">
                x
            </button>
        </li>
    )
}

export default function FilterTab({ handleFilter, filters }) {
    const deleteTagItem = (e: React.MouseEvent<HTMLButtonElement>) => {
        const tagToRemove = e.currentTarget.value
        const filteredTagList = filters.filter(
            (tagItem) => tagItem !== tagToRemove,
        )
        handleFilter(filteredTagList)
    }

    return (
        <ul className="flex mx-[10%] my-4 h-8">
            {filters.length > 0 &&
                filters.map((tag, index) => (
                    <ColoredTagItem
                        key={index}
                        index={index}
                        tagItem={tag}
                        deleteTagItem={deleteTagItem}
                    />
                ))}
            {filters.length > 0 && (
                <li
                    onClick={() => handleFilter([])}
                    className="absolute right-[10%] pt-1"
                >
                    초기화하기
                </li>
            )}
        </ul>
    )
}

export function PostKeyword({ initKeyword }) {
    const [filters, setFilters] = useState<string[]>([])

    useEffect(() => {
        setFilters(initKeyword)
    }, [])

    return (
        <div className="flex mb-4">
            <label className="w-8 min-w-[90px] mr-2 pt-2">키워드</label>
            <SearchKeyword handleFilter={setFilters} filters={filters} />
        </div>
    )
}
