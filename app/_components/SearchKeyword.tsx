'use client'

import { useCallback, useEffect, useState } from 'react'

import {
    BACKEND_LANGUAGES,
    CLOUD_PLATFORMS,
    DATABASE_TECHNOLOGIES,
    FRONTEND_LANGUAGES,
    MOBILE_LANGUAGES,
} from '@/_lib/searchKeyword'

const allKeywordsMap = {
    Frontend: FRONTEND_LANGUAGES,
    Backend: BACKEND_LANGUAGES,
    Database: DATABASE_TECHNOLOGIES,
    Mobile: MOBILE_LANGUAGES,
    Cloud: CLOUD_PLATFORMS,
}

const colorOptions: { [key: number]: string } = {
    0: 'bg-[#f7f37b]', // lightened lemon yellow
    1: 'bg-[#f5e591]', // lightened tangerine
    2: 'bg-[#87e7bb]', // lightened mint green
    3: 'bg-[#8de3f6]', // lightened sky blue
    4: 'bg-[#f2a990]', // lightened coral pink
    5: 'bg-[#f09783]', // lightened salmon pink
}
const getTagColor = (index: number) => {
    const colors = Object.values(colorOptions)
    const calculatedColorIndex = index % colors.length
    const tagColor = colorOptions[calculatedColorIndex]
    return tagColor
}
const colorTagStyles = (index: number) => {
    const tagColor = getTagColor(index)
    return `flex flex-row justify-between shrink-0 rounded-md ${tagColor} px-1.5 my-0.5 mr-1`
}

interface IColoredTagItem {
    index: number
    tagItem: string
    deleteTagItem: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function ColoredTagItem({
    tagItem,
    index,
    deleteTagItem,
}: IColoredTagItem) {
    return (
        <li key={index} className={colorTagStyles(index)}>
            <p className="whitespace-nowrap mr-2">{tagItem}</p>
            <button onClick={deleteTagItem} value={tagItem}>
                x
            </button>
        </li>
    )
}

export default function SearchKeyword() {
    const tabs = Object.keys(allKeywordsMap)
    const [tagItem, setTagItem] = useState<string>('')
    const [tagList, setTagList] = useState<string[]>([])
    const [field, setField] = useState<string>(tabs[0])
    const [allKeywords, setAllKeywords] = useState<string[]>([])

    // //field
    // const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.currentTarget.value.length !== 0 && e.key === 'Enter') {
    //         submitTagItem(tagItem)
    //     }
    // }

    const deleteTagItem = (e: React.MouseEvent<HTMLButtonElement>) => {
        const tagToRemove = e.currentTarget.value
        const filteredTagList = tagList.filter(
            (tagItem) => tagItem !== tagToRemove,
        )
        setTagList(filteredTagList)
    }

    const submitTagItem = (tagItem) => {
        if (tagList.includes(tagItem)) {
            alert('이미 등록된 키워드입니다.')
            return
        }
        setTagList([...tagList, tagItem])
        setTagItem('')
    }

    useEffect(() => {
        const values = Object.values(allKeywordsMap)
        const flattenedValues = new Set(
            values.reduce((acc, val) => acc.concat(val), []),
        )
        setAllKeywords(Array.from(flattenedValues))
    }, [])

    const filteredIndices = useCallback(() => {
        if (tagItem === '') return []
        return allKeywords.reduce((acc, value, index) => {
            if (value.toLowerCase().includes(tagItem.toLowerCase())) {
                return [...acc, index]
            }
            return acc
        }, [])
    }, [allKeywords, tagItem])

    const tagInputStyles = `
        flex-1 p-1 text-black border-b-2 border-black focus:outline-none
    `

    return (
        <div className="relative flex flex-col">
            <input
                type="text"
                placeholder="Press enter to add tags"
                className={tagInputStyles}
                tabIndex={2}
                onChange={(e) => setTagItem(e.target.value)}
                value={tagItem}
            />
            <div className="w-full">
                {filteredIndices().length > 0 && (
                    <div className="bg-white absolute border-2 boder-gray-500 max-h-16 overflow-y-scroll w-full">
                        {filteredIndices().map((index) => (
                            <p
                                key={index}
                                onClick={() =>
                                    submitTagItem(allKeywords[index])
                                }
                            >
                                {allKeywords[index]}
                            </p>
                        ))}
                    </div>
                )}
            </div>

            <div className="grow basis-14">
                <ul className="flex flex-wrap mt-2">
                    <span className="mr-2 align-middle">검색키워드</span>
                    {tagList.map((tagItem, index) => (
                        <ColoredTagItem
                            key={index}
                            index={index}
                            tagItem={tagItem}
                            deleteTagItem={deleteTagItem}
                        />
                    ))}
                </ul>

                <div className="py-9 px-1">
                    <ul className="grid grid-cols-5 gap-x-1.5 mb-5">
                        {tabs.map((tab) => (
                            <li
                                key={tab}
                                className={`border-b-4 p-0.5 hover:cursor-pointer ${
                                    field === tab
                                        ? 'border-orange-500'
                                        : 'border-gray'
                                }`}
                                onClick={() => setField(tab)}
                            >
                                {tab}
                            </li>
                        ))}
                    </ul>
                    <ul className="flex flex-wrap">
                        {allKeywordsMap[field].map((keyword, index) => (
                            <li
                                key={keyword}
                                className={`${colorTagStyles(
                                    index,
                                )} hover:cursor-pointer`}
                                onClick={() => submitTagItem(keyword)}
                            >
                                {keyword}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
