import { RowDataPacket } from 'mysql2'

function dateToString(dateObject: Date): string {
    const dateString: string = dateObject.toISOString()
    return dateString.split('T')[0]
}

function dateFormatting(postArray: RowDataPacket[]): RowDataPacket[] {
    const translatePosts = postArray.map((row) => ({
        ...row,
        startDate: dateToString(row.startDate),
        endDate: dateToString(row.endDate),
    }))

    return translatePosts
}

export { dateFormatting }
