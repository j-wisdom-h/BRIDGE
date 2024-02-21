'use client'
import Link from 'next/link'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { getUserMail } from 'utils/getUser'

import { Deletebutton } from './Modal'

function SubButton({ postId, author }: { postId: number; author: string }) {
    const [email, setEmail] = useState<string | undefined | null>('')

    useEffect(() => {
        async function fetch() {
            const myemail = await getUserMail()
            setEmail(myemail)
        }
        fetch()
    }, [])

    const Author = useMemo(() => email === author, [email, author])

    return (
        <>
            {Author && (
                <div className="grow flex justify-end items-end">
                    <Link
                        href={`/post/${postId}`}
                        className="btn btn-warning first:mr-2"
                    >
                        수정하기
                    </Link>
                    <Deletebutton postId={postId} type="post" />
                </div>
            )}
        </>
    )
}

export default memo(SubButton)
