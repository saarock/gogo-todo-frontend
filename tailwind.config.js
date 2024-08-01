/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'gogo-primary': 'rgb(228, 49, 78)',
                'gogo-button': 'rgb(230, 74, 74)',
                'gogo-button-hover': 'rgb(172, 47, 47)',
                'gogo-border': 'rgb(172, 47, 47)',
                'gogo-input-bg': 'rgba(97, 70, 70, 0.555)',
                gogo__input__focus: 'rgba(97, 70, 70, 0.555)',
                'gogo-green': '#00FF00', // Adjust as needed for your green
            },
        },
    },
    plugins: [],
}
