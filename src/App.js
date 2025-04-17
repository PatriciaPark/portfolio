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
      <nav className="shadow-md py-4 px-6 flex justify-center space-x-6">
        <Link className="hover:underline" to="/">Home</Link>
        <Link className="hover:underline" to="/projects">Projects</Link>
        <Link className="hover:underline" to="/career">Career</Link>
        <Link className="hover:underline" to="/contact">Contact</Link>
        <ThemeToggle />
        <LanguageToggle />
      </nav>
      <Routes>
        <Route path="/" element={<div className='dark:bg-gray-900 dark:text-gray-100'><Home /></div>} />
        <Route path="/projects" element={<div className='dark:bg-gray-900 dark:text-gray-100'><Projects /></div>} />
        <Route path="/career" element={<div className='dark:bg-gray-900 dark:text-gray-100'><Career /></div>} />
        <Route path="/contact" element={<div className='dark:bg-gray-900 dark:text-gray-100'><Contact /></div>} />
      </Routes>
    </div>
  );
}
