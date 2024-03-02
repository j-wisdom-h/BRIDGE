'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import SearchKeyword from './SearchKeyword'

function SearchBar() {
    const modalRef = useRef<HTMLDivElement>(null)
    const [isOpenModal, setIsModalOpen] = useState<boolean>(false)

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
        shadow-md bg-white text-black border-4 border-orange-500
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
                    <SearchKeyword />
                    <div className="flex flex-row grow">
                        <div className="flex-1 mr-2 min-h-10 rounded-lg">
                            <p className="bg-orange-400 text-white">시간</p>
                        </div>
                        <div className="flex-1 min-h-1 rounded-lg ">
                            <p className="bg-orange-400 text-white">장소</p>
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

export default SearchBar
