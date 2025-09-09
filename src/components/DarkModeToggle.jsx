import { useThemeStore } from "../store/themeStore";
import { FaMoon, FaSun } from "react-icons/fa";

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useThemeStore();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full border border-gray-400 hover:scale-105 transition"
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
}

export default DarkModeToggle;