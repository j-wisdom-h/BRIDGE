import { RowDataPacket } from 'mysql2'
import { NextRequest, NextResponse } from 'next/server'

import executeQuery from '@/_lib/db'

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get('userId')
    const sql = `SELECT checked_count
        FROM alarm
        WHERE user_id = ?`
    const checked_count = await executeQuery<RowDataPacket>(sql, [userId])
    return NextResponse.json(checked_count[0])
}

export async function PUT(req: NextRequest) {
    const body = await req.json()
    const { userId, totalCount } = body

    try {
        const sql = `UPDATE alarm SET checked_count = ? WHERE user_id = ?`
        await executeQuery(sql, [totalCount, userId])

        return NextResponse.json({
            success: true,
            message: 'Alarm checked count updated successfully',
        })
    } catch (error) {
        console.error('Error updating alarm checked count:', error)
        return NextResponse.json({
            success: false,
            message: 'Failed to update alarm checked count',
            status: 500,
        })
    }
}
