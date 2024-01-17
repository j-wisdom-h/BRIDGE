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
            <body>
                <Providers>
                    <Header />
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}
