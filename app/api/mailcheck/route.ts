import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// 이메일 인증 함수
export async function verifyCode(email: string, userCode: string) {
    'use server'
    const cookieStore = cookies()
    const storedCode = cookieStore.get(email)?.value
    return storedCode === userCode
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { email } = body

    // 랜덤한 6자리 숫자로 인증번호 생성
    const verificationCode = Math.floor(100000 + Math.random() * 900000)

    // 여기서 이메일에 인증번호를 포함하여 전송합니다.
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.NEXTAUTH_EMAIL}`,
            pass: `${process.env.NEXTAUTH_PASS}`,
        },
    })

    const mailOptions = {
        from: `${process.env.NEXTAUTH_EMAIL}`,
        to: email,
        subject: 'Bridge Verification Code',
        html: `<p>Your verification code is: ${verificationCode}</p>`,
    }

    // 사용자의 이메일을 키로하여 인증 코드 저장
    cookies().set(email, String(verificationCode), { maxAge: 3 * 60 })

    try {
        await transporter.sendMail(mailOptions)
        console.log('Email sent!')
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error('Error sending email:', error)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}
