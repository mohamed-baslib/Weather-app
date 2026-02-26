import { useState } from "react";
import { ThemeContext } from "./ThemeContext"

export const ThemeProvider = ({children}) => {
    const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
  };
    return (
        <ThemeContext.Provider value={{dark, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}