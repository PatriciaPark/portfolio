import { useLanguage } from "../context/LanguageContext";
import { Link } from 'react-router-dom';
import ParticlesBackground from "../components/ParticlesBackground";
import BrickBreaker from "../games/BrickBreaker";
import BrickGirlSD from "../games/BrickGirlSD";
import BrickGirlRT from "../games/BrickGirlRT";

export default function Home() {
  const { language } = useLanguage();

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 overflow-hidden">
      <ParticlesBackground />

      {/* 상단 타이틀 */}
      <div className="text-center mb-12 z-10">
        {language === "en"
          ? ["Passionate Developer", "&", "Creative Thinker"].map((line, i) => (
            <h1 key={i} className="text-5xl font-bold mb-4 glow-text">
              {line}
            </h1>
          ))
          : ["영어·중국어·일본어 가능한", "7년차 풀스택 개발자"].map((line, i) => (
            <h1 key={i} className="text-5xl font-bold mb-4 glow-text">
              {line}
            </h1>
          ))}
        <div className="text-center mb-4 z-10">
          <p className="text-xl mb-3 glow-text text-gray-700 dark:text-gray-300">
            {language === "en"
              ? "Welcome to my little universe — where code meets curiosity, and stories unfold in pixels and words."
              : "호기심으로 시작된 여정, 코드와 글, 픽셀로 채워가는 나만의 작은 우주에 오신 걸 환영합니다."}
          </p>
        </div>
      </div>

      {/* 게임 영역 */}
      <div className="text-center z-10">
        <BrickGirlSD />
        <div style={{ marginTop: '40px' }}>
          <h1 className="text-indigo-400 text-xl font-bold">🎮 More Games 🕹️</h1>
          <p>▶️ <Link className="hover:underline" to="/bb">Brick Breaker</Link></p>
          <p>▶️ <Link className="hover:underline" to="/bsd">Brick Girl: Space Defense</Link></p>
          {/* <p>▶️ <Link className="hover:underline" to="/brt">Brick Girl: Run & Throw</Link></p> */}
        </div>
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
