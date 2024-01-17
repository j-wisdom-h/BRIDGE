'use client'

import ReactDOM from 'react-dom/client'

export function PreloadResources() {
    const head = ReactDOM.createRoot(document.head)

    head.render(
        <link
            rel="preload"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
            crossOrigin="anonymous"
        />,
    )
    //head.render(<link rel='preconnect' href='...' />)
    //head.render(<link rel='prefetchDNS' href='...' />)

    return null
}
