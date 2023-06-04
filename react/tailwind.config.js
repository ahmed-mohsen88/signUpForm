/** @type {import('tailwindcss').Config} */

export const content = [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.{js,jsx,ts,tsx}",
    " ./src/**/*.{html,js,jsx}",
];
export const theme = {
    extend: {
        color: {},
        screens: {
            xs: { min: "280px", max: "500px" },
            sm: "500px",
            md: "700px",
            lg: "1000px",
            // ..._screens,
        },
    },
};
export const plugins = ["@tailwindcss/forms"];
