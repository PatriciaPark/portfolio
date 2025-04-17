import { useLanguage } from "../context/LanguageContext";
import ParticlesBackground from "../components/ParticlesBackground";

export default function Home() {
  const { language } = useLanguage();

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 overflow-hidden">
      <ParticlesBackground />
      <div className="text-center p-6 z-10">
        <h1 className="text-5xl font-bold mb-4 glow-text">Youngjee Park</h1>
        <p className="text-xl glow-text text-gray-700 dark:text-gray-300">
          {language === "en"
            ? "Passionate Developer & Creative Thinker"
            : "열정적인 개발자, 창의적인 사고를 가진 인재"}
        </p>
      </div>

      <style>
        {`
          .glow-text {
            animation: glow 3s ease-in-out infinite;
          }

          @keyframes glow {
            0%, 100% {
              text-shadow: 0 0 4px #ffffff, 0 0 8px #a5b4fc, 0 0 12px #818cf8;
            }
            50% {
              text-shadow: 0 0 6px #e0e7ff, 0 0 10px #c7d2fe, 0 0 16px #a5b4fc;
            }
          }
        `}
      </style>
    </main>
  );
}
