import { useLanguage } from "../context/LanguageContext";
import ParticlesBackground from "../components/ParticlesBackground";
import BrickBreaker from "../games/BrickBreaker";
import BrickGirlSD from "../games/BrickGirlSD";

export default function Home() {
  const { language } = useLanguage();

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 overflow-hidden">
      <ParticlesBackground />

      {/* 상단 타이틀 */}
      <div className="text-center mb-12 z-10">
        <h1 className="text-5xl font-bold mb-4 glow-text">
          {language === "en"
            ? "YoungJee Park"
            : "박 영 지"}
        </h1>
        <p className="text-xl glow-text text-gray-700 dark:text-gray-300">
          {language === "en"
            ? "Passionate Developer & Creative Thinker"
            : "영어·중국어·일본어 가능한 7년차 풀스택 개발자"}
        </p>
      </div>

      {/* 게임 영역 */}
      <div className="text-center z-10">
        <BrickGirlSD />
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
