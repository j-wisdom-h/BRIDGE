import { verifyCode } from 'app/api/mailcheck/route'
import { NextResponse } from 'next/server'

export async function POST(req, res) {
    const { email, userCode } = await req.json()

    // 클라이언트가 제공한 이메일과 인증 코드 확인
    const isVerified = verifyCode(email, userCode)

    if (isVerified) {
        return NextResponse.json({ success: true }, { status: 200 })
    } else {
        console.error('Error')
        return NextResponse.json({ success: false }, { status: 500 })
    }
}
