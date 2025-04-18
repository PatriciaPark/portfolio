import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
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
          <Link className="hover:underline" to="/contact">About</Link>
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </nav>

      {/* 공통 컨텐츠 영역 (상단 네비바 여백 포함) */}
      <div className="pt-28 px-4 sm:px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}
