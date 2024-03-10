'use client'
import { useEffect, useState } from 'react'

import FilterTab from './_components/FilterTab'
import Loading from './_components/Loding'
import Posts from './_components/Posts'
import SearchBar from './_components/SearchBar'
import { getAllPosts, searchPost } from './_lib/post'

export default function Home() {
    const [posts, setPosts] = useState<string[]>([])
    const [filters, setFilter] = useState<string[]>([])

    async function initPost() {
        const posts = await getAllPosts()
        setPosts(posts)
    }

    useEffect(() => {
        if (filters.length > 0) {
            searchPost(filters).then((res) => setPosts(res))
        } else {
            initPost()
        }
    }, [filters])

    return (
        <div>
            <h1 className="text-orange-500 text-center my-7 text-4xl font-bold">
                Welcome to Bridge
            </h1>
            <SearchBar handleFilter={setFilter} filters={filters} />
            <FilterTab handleFilter={setFilter} filters={filters} />
            {posts ? <Posts posts={posts} /> : <Loading />}
        </div>
    )
}
