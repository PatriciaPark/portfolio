import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-6">
        {language === "en" ? "Contact" : "연락처"}
      </h1>
      <p className="mb-2">
        📧 Email:{" "}
        <a href="mailto:pyjee8@gmail.com" className="text-blue-600 underline">
          pyjee8@gmail.com
        </a>
      </p>
      <p className="mb-2">
        🔗 LinkedIn:{" "}
        <a
          href="https://linkedin.com/in/pyjee8"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          linkedin.com/in/pyjee8
        </a>
      </p>
      <p>
        💻 GitHub:{" "}
        <a
          href="https://github.com/PatriciaPark"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          github.com/PatriciaPark
        </a>
      </p>
    </main>
  );
}
