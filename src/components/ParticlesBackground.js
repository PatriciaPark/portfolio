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
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: {
            value: darkMode
                ? "#ffffff"
                : ["#ff4ecd", "#4be1ec", "#ffe34e", "#00ffab", "#9b5de5", "#f15bb5"]
          },
          opacity: { value: 0.6 },
          size: { value: 2 },
          move: { enable: true, speed: 0.6 },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: "repulse" } },
          modes: { repulse: { distance: 50 } },
        },
      }}
      className="absolute inset-0 z-0"
    />
  );
}
