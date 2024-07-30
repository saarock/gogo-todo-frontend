import {createContext, useContext} from "react";

const initialState = {
    themeMode: "light",
    darkTheme : () => {
    },
    lightTheme: () => {},
}

export const ThemeContext = createContext(initialState);
export const ThemeProvider = ThemeContext.Provider;

export default function useTheme() {
    return useContext(ThemeContext);
}