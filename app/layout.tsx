import '../styles/globals.css'

import { Metadata } from 'next'
import toast, { Toaster } from 'react-hot-toast'

import Footer from '@/_components/Footer'
import Header from '@/_components/Header'
import Providers from '@/_components/Provider'

export const metadata: Metadata = {
    title: 'Bridge',
    description: 'our communication, bridge',
}

const customToastOptions = {
    style: {
        minWidth: '300px',
        fontSize: '16px',
    },
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
                <div className="w-full h-full">
                    <Providers>
                        <Toaster toastOptions={customToastOptions} />
                        <Header />
                        <main className="h-full">{children}</main>
                        <Footer />
                    </Providers>
                </div>
            </body>
        </html>
    )
}
