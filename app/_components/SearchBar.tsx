'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import SearchKeyword from './SearchKeyword'

function SearchBar({ handleFilter, filters }) {
    const modalRef = useRef<HTMLDivElement>(null)
    const [isOpenModal, setIsModalOpen] = useState<boolean>(false)
    const [location, setLocation] = useState<string>('')
    const [time, setTime] = useState<string>('')
    const [isTransitioning, setIsTransitioning] = useState<boolean>(true)

    function handleModal() {
        isOpenModal
            ? setTimeout(() => {
                  setIsTransitioning(!isTransitioning)
              }, 300)
            : setIsTransitioning(!isTransitioning)
        setIsModalOpen(!isOpenModal)
    }

    const handleModalClick = useCallback(
        (e: MouseEvent) => {
            const outside =
                isOpenModal &&
                modalRef.current &&
                !modalRef.current.contains(e.target as Node)
            if (outside) {
                setIsModalOpen(false)
                setTimeout(() => {
                    setIsTransitioning(!isTransitioning)
                }, 300)
            }
        },
        [isOpenModal, modalRef],
    )

    // const handleSearchClick = async () => {
    //     const filteredPosts = searchPost(filters, time, location)
    //     handelPost(filteredPosts)
    //     handleFilter([...filters])
    //     handleModal()
    // }

    useEffect(() => {
        window.addEventListener('mousedown', handleModalClick)
        return () => window.removeEventListener('mousedown', handleModalClick)
    }, [handleModalClick])

    const searchBarStyles = `
    flex h-12 min-h-12 mx-[10%] mt-10 border-transparent shadow-md
    text-black focus:outline-none hover:shadow-lg rounded-3xl sm:w-auto sm:justify-center`

    const modalStyles = `
    flex flex-col grow absolute z-10 mt-2 p-5 rounded-lg mx-[5%] w-[90%]
    shadow-md bg-white text-black border-4 border-orange-500 transition duration-300 ease-in-out
    ${isOpenModal ? 'opacity-100' : 'opacity-0'} ${
        isTransitioning ? '-top-[100vh]' : 'top-0'
    }`

    return (
        <div ref={modalRef}>
            <div className="relative" onClick={handleModal}>
                <div className={searchBarStyles}>
                    <p className="flex items-center h-full rounded-3xl border-t-2 border-gray w-full text-sm lg:pl-4 lg:justify-start sm:pl-0 sm:justify-center">
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

            <div className="relative">
                <div className={modalStyles}>
                    <SearchKeyword
                        handleFilter={handleFilter}
                        filters={filters}
                    />
                    <div className="flex flex-row grow">
                        <div className="flex-1 mr-2 min-h-10 rounded-lg">
                            <p className="bg-orange-400 text-white">시간</p>
                        </div>
                        <div className="flex-1 min-h-1 rounded-lg ">
                            <p className="bg-orange-400 text-white">장소</p>
                        </div>
                    </div>
                    <p onClick={() => handleFilter([])}>초기화하기</p>
                    {/* <input
                        type="submit"
                        value="Search"
                        className="px-1 mt-2.5 text-white border-black border-4 w-20 rounded-lg bg-orange-500 self-end cursor-pointer"
                        onClick={handleSearchClick}
                    /> */}
                </div>
            </div>
        </div>
    )
}

export default SearchBar
