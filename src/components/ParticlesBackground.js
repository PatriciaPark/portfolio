import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useTheme } from "../context/ThemeContext";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const isDark = document.documentElement.classList.contains("dark");
  const { darkMode } = useTheme();

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        particles: {
          number: {
            value: 50, // ⭐ 갯수
            density: { enable: true, value_area: 1000 }
          },
          color: {
            value: darkMode
              ? ["#8be9fd", "#bd93f9", "#f1fa8c"] // 블루, 퍼플, 노랑 계열
              : ["#007cf0", "#00dfd8", "#90cdf4"] // 시안/블루 계열
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: 0.7, // 💧 투명도
            random: true,
          },
          size: {
            value: { min: 1, max: 2 }, // 📏 사이즈 다양화
            random: true,
          },
          links: {
            enable: true,
            distance: 120,
            color: darkMode ? "#ffffff" : "#007cf0",
            opacity: 0.1,
            width: 1
          },
          move: {
            enable: true,
            speed: 0.3, // 0.6 -> 0.3 🐢 느리게 흐르는 별가루
            direction: "none",
            straight: false,
            outMode: "bounce"
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: false // 👉 호버 효과 끄기 (집중 방해 방지)
            }
          }
        },
      }}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}
