import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="text-sm border px-3 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center"
    >
      {darkMode ? "🌙" : "☀️"}
      <span className="hidden sm:inline ml-2">
        {darkMode ? "Dark" : "Light"}
      </span>
    </button>
  );
}
