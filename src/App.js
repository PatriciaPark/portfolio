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
      <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md py-4 px-6 flex justify-center space-x-6">
        <Link className="hover:underline" to="/">Home</Link>
        <Link className="hover:underline" to="/projects">Projects</Link>
        <Link className="hover:underline" to="/career">Career</Link>
        <Link className="hover:underline" to="/contact">About</Link>
        <ThemeToggle />
        <LanguageToggle />
      </nav>

      {/* 공통 패딩 적용 */}
      <div className="pt-28">
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
