import '../styles/globals.css'

import { Metadata } from 'next'

import Footer from '@/_components/Footer'
import Header from '@/_components/Header'
import Providers from '@/_components/Provider'

export const metadata: Metadata = {
    title: 'Bridge',
    description: 'our communication, bridge',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            {/* <head>
                <link
                    rel="preload"
                    href="font/Pretendard-Regular.subset.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
            </head> */}
            <body>
                <div>
                    <Providers>
                        <Header />
                        <main className="min-h-screen">{children}</main>
                        <Footer />
                    </Providers>
                </div>
            </body>
        </html>
    )
}
