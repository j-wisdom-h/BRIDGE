import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// 사용자의 인증 코드를 저장하는 맵 객체
export const verificationCodes = new Map()

// 이메일 인증 함수
export function verifyCode(email, userCode) {
    const storedCode = verificationCodes.get(email)
    console.log(typeof storedCode, typeof userCode)

    if (storedCode === Number(userCode)) {
        // 인증 성공
        return true
    } else {
        // 인증 실패
        return false
    }
}

export async function POST(req) {
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
    //console.log(mailOptions)

    // 사용자의 이메일을 키로하여 인증 코드 저장
    verificationCodes.set(email, verificationCode)

    try {
        await transporter.sendMail(mailOptions)
        console.log('Email sent!')
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error('Error sending email:', error)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}
