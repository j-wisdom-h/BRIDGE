import '../styles/globals.css'

import { Metadata } from 'next'

import Footer from '@/_component/Footer'
import Header from '@/_component/Header'
import Providers from '@/_component/Provider'

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
            <body className="relative">
                <Providers>
                    <Header></Header>
                    {children}
                </Providers>
                <Footer></Footer>
            </body>
        </html>
    )
}
