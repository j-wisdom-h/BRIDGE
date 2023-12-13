import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import KakaoProvider from 'next-auth/providers/kakao'

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            id: 'Authcredentials',
            name: 'Credentials',
            credentials: {
                username: {
                    label: '이메일',
                    type: 'text',
                    placeholder: '이메일 주소 입력 요망',
                },
                password: { label: '비밀번호', type: 'password' },
            },

            async authorize(credentials, req): Promise<any> {
                try {
                    console.log(credentials)
                    const res = await fetch(
                        `${process.env.NEXTAUTH_URL}/api/login`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                username: credentials?.username,
                                password: credentials?.password,
                            }),
                        },
                    )
                    const user = await res.json()
                    // Any object returned will be saved in `user` property of the JWT
                    return user || null
                } catch (e) {
                    throw new Error(e.response)
                }
            },
        }),
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID!,
            clientSecret: process.env.KAKAO_SECRET!,
        }),
    ],
    callbacks: {
        //데이터를 넘겨주고 싶으면 jwt 토큰에 데이터를 유지
        async jwt({ token, user }) {
            if (user) {
                token.user = user // 사용자 정보를 토큰에 저장합니다
            }
            return token
        },
        async session({ session, token, user }) {
            return session
        },
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signin',
    },
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
