import { verifyJwt } from 'app/_lib/jwt'
import { NextRequest } from 'next/server'

export default function validateAccessToken(request: NextRequest) {
    const accessToken = request.headers.get('authorization')
    if (!accessToken || !verifyJwt(accessToken)) {
        return new Response(JSON.stringify({ error: 'No Authorization' }), {
            status: 401,
        })
    }
}
