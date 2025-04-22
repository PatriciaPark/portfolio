import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import About from "./pages/About";
import BB from './games/BrickBreaker';
import BSD from './games/BrickGirlSD';
import BRT from './games/BrickGirlRT';
import ScrollToTop from "./components/ScrollToTop";
import ThemeToggle from "./components/ThemeToggle";
import LanguageToggle from "./components/LanguageToggle";

export default function App() {
  return (
    <div className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      {/* 네비게이션 바 */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md py-4 px-2 sm:px-4 overflow-x-auto">
        <div className="min-w-full flex justify-center items-center space-x-4 sm:space-x-6 text-base sm:text-lg md:text-xl">
          <Link className="hover:underline" to="/">Home</Link>
          <Link className="hover:underline" to="/projects">Projects</Link>
          <Link className="hover:underline" to="/career">Career</Link>
          <Link className="hover:underline" to="/about">About</Link>
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </nav>

      {/* 공통 컨텐츠 영역 (상단 네비바 여백 포함) */}
      <div className="pt-28 px-4 sm:px-6">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/bb" element={<BB />} />
          <Route path="/bsd" element={<BSD />} />
          <Route path="/brt" element={<BRT />} />
        </Routes>
      </div>
      <footer className="w-full py-6 mt-12 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        <p>© {new Date().getFullYear()} YoungJee Park. All rights reserved.</p>
        <p className="mt-1">Built with React & TailwindCSS | Hosted on GitHub Pages</p>
      </footer>
    </div>
  );
}
