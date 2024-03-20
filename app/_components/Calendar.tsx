'use client'
import dayGridPlugin from '@fullcalendar/daygrid'
import Calendar from '@fullcalendar/react'
import { useRef } from 'react'

function MyCalendar() {
    const calendarRef = useRef<Calendar>(null)

    return (
        <div className="flex justify-center px-16 py-10">
            <div className="w-full">
                <Calendar
                    plugins={[dayGridPlugin]}
                    ref={calendarRef}
                    initialView="dayGridMonth"
                    height="auto"
                />
            </div>
        </div>
    )
}

export default MyCalendar
