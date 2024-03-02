'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const colorOptions: { [key: number]: string } = {
    0: 'bg-[#f7f37b]', // lightened lemon yellow
    1: 'bg-[#f5e591]', // lightened tangerine
    2: 'bg-[#87e7bb]', // lightened mint green
    3: 'bg-[#8de3f6]', // lightened sky blue
    4: 'bg-[#f2a990]', // lightened coral pink
    5: 'bg-[#f09783]', // lightened salmon pink
}
const colorTagStyles = (index: number) => {
    const colors = Object.values(colorOptions)
    const calculatedColorIndex = index % colors.length
    const tagColor = colorOptions[calculatedColorIndex]
    return `flex flex-row justify-between shrink-0 basis-16 rounded-md ${tagColor} px-1.5 my-0.5 mr-1`
}
interface IColoredTagItem {
    index: number
    tagItem: string
    deleteTagItem: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function SearchBar() {
    const modalRef = useRef<HTMLDivElement>(null)
    const [isOpenModal, setIsModalOpen] = useState<boolean>(false)
    const [tagItem, setTagItem] = useState<string>('')
    const [tagList, setTagList] = useState<string[]>([])

    function handleModal() {
        setIsModalOpen(!isOpenModal)
    }

    const handleModalClick = useCallback(
        (e: MouseEvent) => {
            const outside =
                isOpenModal &&
                modalRef.current &&
                !modalRef.current.contains(e.target as Node)
            if (outside) setIsModalOpen(false)
        },
        [isOpenModal, modalRef],
    )

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length !== 0 && e.key === 'Enter') {
            submitTagItem()
        }
    }

    const submitTagItem = () => {
        setTagList([...tagList, tagItem])
        setTagItem('')
    }

    const deleteTagItem = (e: React.MouseEvent<HTMLButtonElement>) => {
        const tagToRemove = e.currentTarget.value
        const filteredTagList = tagList.filter(
            (tagItem) => tagItem !== tagToRemove,
        )
        console.log(filteredTagList)
        setTagList(filteredTagList)
    }

    useEffect(() => {
        window.addEventListener('mousedown', handleModalClick)
        return () => window.removeEventListener('mousedown', handleModalClick)
    }, [handleModalClick])

    const searchBarStyles = `
        h-12 min-h-12 w-full md:w-auto mx-[10%] mt-10 border-transparent shadow-md
        text-black focus:outline-none hover:shadow-lg rounded-3xl
    `

    const modalStyles = `
        flex flex-col grow absolute z-10 mt-2 p-5 rounded-lg mx-[5%] w-[90%]
        shadow-md bg-white text-black bg-orange-200
    `

    const tagInputStyles = `
        flex-1 rounded-lg p-1 text-black focus:outline-gray-200
    `
    return (
        <div ref={modalRef}>
            <div className="relative" onClick={handleModal}>
                <div className={searchBarStyles}>
                    <p className="flex items-center h-full pl-4 rounded-3xl border-t-2 border-gray">
                        관심있는 스터디를 검색해보세요
                    </p>
                </div>
                <button className="h-12 min-h-12 absolute top-0 right-[10.5%] bg-transparent border-none p-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
            {isOpenModal && (
                <div className={modalStyles}>
                    <input
                        type="text"
                        placeholder="Press enter to add tags"
                        className={tagInputStyles}
                        tabIndex={2}
                        onChange={(e) => setTagItem(e.target.value)}
                        value={tagItem}
                        onKeyDown={onKeyPress}
                    />
                    <div className="grow basis-14">
                        <ul className="flex flex-wrap mt-2">
                            <span className="mr-2 align-middle">
                                검색키워드
                            </span>
                            {tagList.map((tagItem, index) => (
                                <ColoredTagItem
                                    key={index}
                                    index={index}
                                    tagItem={tagItem}
                                    deleteTagItem={deleteTagItem}
                                />
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-row grow">
                        <div className="flex-1 mr-2 min-h-10 bg-white rounded-lg">
                            시간
                        </div>
                        <div className="flex-1 min-h-10 bg-white rounded-lg">
                            장소
                        </div>
                    </div>
                    <input
                        type="submit"
                        value="Search"
                        className="px-1 mt-2.5 text-white border-black border-4 w-20 rounded-lg bg-orange-500 self-end"
                    />
                </div>
            )}
        </div>
    )
}

export function ColoredTagItem({
    tagItem,
    index,
    deleteTagItem,
}: IColoredTagItem) {
    return (
        <li key={index} className={colorTagStyles(index)}>
            <p className="whitespace-nowrap">{tagItem}</p>
            <button onClick={deleteTagItem} value={tagItem}>
                x
            </button>
        </li>
    )
}

export default SearchBar
