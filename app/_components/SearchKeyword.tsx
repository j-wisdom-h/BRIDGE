'use client'

import { useCallback, useEffect, useState } from 'react'

import { ColoredTagItem } from '@/_components/FilterTab'
import { colorTagStyles } from '@/_lib/colortag'
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

function SearchKeyword({ handleFilter, filters }) {
    const tabs = Object.keys(allKeywordsMap)
    const [tagItem, setTagItem] = useState<string>('')
    const [field, setField] = useState<string>(tabs[0])
    const [allKeywords, setAllKeywords] = useState<string[]>([])

    const deleteTagItem = (e: React.MouseEvent<HTMLButtonElement>) => {
        const tagToRemove = e.currentTarget.value
        const filteredTagList = filters.filter(
            (tagItem) => tagItem !== tagToRemove,
        )
        handleFilter(filteredTagList)
    }

    const submitTagItem = (tagItem) => {
        if (filters.includes(tagItem)) {
            alert('이미 등록된 키워드입니다.')
            return
        }
        handleFilter([...filters, tagItem])
        setTagItem('')
    }

    useEffect(() => {
        const values = Object.values(allKeywordsMap)
        const flattenedValues = new Set(
            values.reduce((acc, val) => acc.concat(val), []),
        )

        setAllKeywords(Array.from(flattenedValues))
        // if (keywords) {
        //     handleFilter(keywords)
        // }
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
            {/* 관련 태그 */}
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
                    <span className="mr-2 align-middle">키워드</span>
                    {filters.map((tagItem: string, index: number) => (
                        <ColoredTagItem
                            key={index}
                            index={index}
                            tagItem={tagItem}
                            deleteTagItem={deleteTagItem}
                        />
                    ))}
                </ul>

                <div className="py-9">
                    {/* 분야 탭 */}
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
                    {/* 각 분야에 해당하는 태크들 */}
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
            <input
                type="hidden"
                name="tagList"
                id="tagListInput"
                value={JSON.stringify(filters)}
            />
        </div>
    )
}

export default SearchKeyword
