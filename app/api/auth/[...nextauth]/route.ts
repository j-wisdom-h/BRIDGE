import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
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
                // console.log(credentials)
                try {
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
                    throw new Error(e.response.data.msg)
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
                return true
            } else {
                return false
            }
        },
        async jwt({ token, user, account, profile }) {
            if (profile && account) {
                // 프로필 정보 설정
                //console.log(profile)
                const { name, email, picture, ...others } = profile
                token = {
                    name,
                    email,
                    image: picture,
                    accessToken: account.access_token,
                    accessTokenExpires: account.expires_at,
                    refreshToken: account.refresh_token,
                }
            } else if (user) {
                // token.accessToken = { 사용자액세스토큰 }
                token.email = user.email
            }

            return token
        },
        async session({ session, token }) {
            session.user = token as any
            //console.log('sesson', session)
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
