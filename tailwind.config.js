/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                orange: '#FF5833',
            },
            screens: {
                sm: '480px',
                md: '768px',
                lg: '976px',
                xl: '1440px',
            },
            borderRadius: {
                none: '0',
                sm: '.125rem',
                DEFAULT: '.25rem',
                lg: '.5rem',
                full: '9999px',
            },
        },
    },
    plugins: [require('daisyui')],
}
