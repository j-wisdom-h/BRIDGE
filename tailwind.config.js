/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                orange: {
                    100: '#FFE9D9',
                    200: '#FFD8BC',
                    300: '#FFB282',
                    400: '#FF875D',
                    500: '#FF5833',
                    600: '#E54C2E',
                    700: '#CC4126',
                    800: '#99311F',
                    900: '#4D190D',
                },
            },
            screens: {
                sm: { max: '767px' },
                md: { min: '768px', max: '1023px' },
                lg: { min: '1024px' },
            },
        },
    },
    plugins: [require('daisyui')],
}
