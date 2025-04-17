import { useLanguage } from "../context/LanguageContext";

const projects = [
  {
    title: {
      en: "B2B Data Management System",
      ko: "B2B 데이터 관리 시스템"
    },
    description: {
      en: "A custom web platform for analyzing and managing business data.",
      ko: "기업 데이터 분석 및 관리를 위한 맞춤형 웹 플랫폼."
    },
    role: "Full-Stack Developer (Solo)",
    tech: ["Python", "Django", "MySQL", "AWS", "Chart.js"],
    link: null
  },
  {
    title: {
      en: "Simple Dashboard",
      ko: "간단한 대시보드"
    },
    description: {
      en: "OAuth login, user tracking, email verification, session stats.",
      ko: "OAuth 로그인, 사용자 추적, 이메일 인증, 세션 통계."
    },
    role: "Full-Stack Developer (Solo)",
    tech: ["Node.js", "JavaScript", "MySQL", "OAuth"],
    link: "https://github.com/PatriciaPark/simple-dashboard"
  },
  {
    title: {
      en: "Astronomy 3D Simulation",
      ko: "천문학 3D 시뮬레이션"
    },
    description: {
      en: "Web app and simulation tool for astronomical research.",
      ko: "천문학 연구를 위한 웹앱과 시뮬레이션 도구."
    },
    role: "Full-Stack Developer (Solo)",
    tech: ["Java", "JavaScript", "Unity3D", "MATLAB", "Blender"],
    link: "https://drive.google.com/file/d/1JIsROXUPEJb28KuV8tae9m8HHLBCaYfb/view"
  },
  {
    title: {
      en: "M-Coupon Payment API",
      ko: "M-쿠폰 결제 시스템"
    },
    description: {
      en: "Payment system improvement project for retail app.",
      ko: "리테일 앱 결제 시스템 개선 프로젝트."
    },
    role: "Freelance Full-Stack Developer",
    tech: ["Java", "Spring", "Oracle"],
    link: null
  },
  {
    title: {
      en: "Dokdo 3D Content Project",
      ko: "독도 3D 콘텐츠 프로젝트"
    },
    description: {
      en: "3D content development for KT 5G & Dokdo exhibition.",
      ko: "KT 5G 및 독도 전시를 위한 3D 콘텐츠 개발."
    },
    role: "3D Developer",
    tech: ["Unity3D", "C#", "Photoshop", "PostgreSQL"],
    link: null
  }
];

export default function Projects() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-10">
        {language === "en" ? "Projects" : "프로젝트"}
      </h1>
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border rounded-2xl shadow-md p-6 hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-2">{project.title[language]}</h2>
            <p className="mb-2 text-gray-600">{project.description[language]}</p>
            <p className="mb-1 text-sm text-gray-500 italic">{project.role}</p>
            <p className="mb-2 text-sm text-gray-700">
              Tech Stack: {project.tech.join(", ")}
            </p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                {language === "en" ? "View More" : "더보기"}
              </a>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
