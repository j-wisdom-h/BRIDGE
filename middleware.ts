import { type NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

// 로그인 해야 접근 가능 경로
const withAuthList = ['profile', 'mypost', 'mystudy', 'post', 'alarm']
// 로그인 하지 않은 상태에서 접근가능 경로
const withOutAuthList = ['signin', 'signup']

// withAuth 함수: 인증된 사용자만 접근 가능한 페이지를 처리
export function withAuth(req: NextRequest, isAuthenticated: boolean) {
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/', req.url))
    }
}

// withOutAuth 함수: 로그인하지 않은 사용자만 접근 가능한 페이지를 처리
export function withOutAuth(req: NextRequest, isAuthenticated: boolean) {
    if (isAuthenticated) {
        return NextResponse.redirect(new URL('/', req.url))
    }
}

export async function middleware(req: NextRequest) {
    const token = await getToken({ req })
    const { pathname } = req.nextUrl

    const isWithAuth = withAuthList.includes(pathname.substring(1))
    const isWithOutAuth = withOutAuthList.includes(pathname.substring(1))

    if (isWithAuth) return withAuth(req, !!token)
    else if (isWithOutAuth) return withOutAuth(req, !!token)
}

export const config = {
    matcher: [
        ...withAuthList,
        ...withOutAuthList,
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
        
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
        */
    ],
}
