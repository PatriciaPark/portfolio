import { Routes, Route, Link } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";
import Home from "./pages/Home";
import Lab from "./pages/Lab"
import About from "./pages/About";
import Career from "./pages/Career";
import Korean from "./pages/Korean";
import MindMap from "./pages/MindMap";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import BB from './games/BrickBreaker';
import BD from './games/BattleDolphins';
import BGSD from './games/BrickGirlSD';
import BGRT from './games/BrickGirlRT';
import BGME from './games/BrickGirlME';
import ScrollToTop from "./components/ScrollToTop";
import ThemeToggle from "./components/ThemeToggle";
import LanguageToggle from "./components/LanguageToggle";

export default function App() {
  const { language } = useLanguage();

  return (
    <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      {/* 네비게이션 바 */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md py-4 px-2 sm:px-4 overflow-x-auto">
        <div className="min-w-full flex justify-center items-center space-x-4 sm:space-x-6 text-base sm:text-lg md:text-xl">
          <Link className="hover:underline" to="/">{language === "en" ? "Home" : "홈"}</Link>
          <Link className="hover:underline" to="/projects">{language === "en" ? "Projects" : "프로젝트"}</Link>
          <Link className="hover:underline" to="/about">{language === "en" ? "About" : "소개"}</Link>
          <Link className="hover:underline" to="/lab">{language === "en" ? "Lab" : "실험실"}</Link>
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </nav>

      {/* 공통 컨텐츠 영역 (상단 네비바 여백 포함) */}
      <div className="pt-28 px-4 sm:px-6">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/about" element={<About />} />
          <Route path="/career" element={<Career />} />
          <Route path="/korean" element={<Korean />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mindmap" element={<MindMap />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/bb" element={<BB />} />
          <Route path="/bd" element={<BD />} />
          <Route path="/bgsd" element={<BGSD />} />
          <Route path="/bgrt" element={<BGRT />} />
          <Route path="/bgme" element={<BGME />} />
        </Routes>
      </div>
      <footer className="w-full py-6 mt-12 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        <p>© {new Date().getFullYear()} YoungJee Park. All rights reserved.</p>
        <p className="mt-1">Built with React & TailwindCSS | Hosted on GitHub Pages</p>
      </footer>
    </div>
  );
}
