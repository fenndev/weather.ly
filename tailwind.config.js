/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
export default {
    content: ['./index.html', './src/**/*.{html,svelte,js,ts}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Noto Sans"', ...defaultTheme.fontFamily.sans.filter(font => font !== '"Noto Sans"')],
            },
        },
    },
    plugins: [],
};
