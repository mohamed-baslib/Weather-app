import "./App.css";
import Weather from "./components/Weather";
import { useTheme } from "./contexts/useTheme";
import { useLanguage } from "./contexts/useLanguage";

function App() {
  const { dark } = useTheme();
  const { isLangAr } = useLanguage();
  return (
    <div
      dir={isLangAr ? "rtl" : "ltr"}
      className={`${dark ? "dark" : ""} flex justify-center bg-gradient-to-l from-purple-200 to-blue-500`}
    >
      <Weather />
    </div>
  );
}

export default App;
