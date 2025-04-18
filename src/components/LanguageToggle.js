import { useLanguage } from "../context/LanguageContext";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="text-sm border px-3 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center"
    >
      {language === "en" ? "🇰🇷" : "🇺🇸"}
      <span className="hidden sm:inline ml-2">
        {language === "en" ? "한국어" : "English"}
      </span>
    </button>
  );
}
