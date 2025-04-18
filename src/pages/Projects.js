import { useLanguage } from "../context/LanguageContext";

const projects = [
  {
    title: {
      en: "B2B Data Management System",
      ko: "B2B 데이터 관리 시스템"
    },
    description: {
      en: "A full-stack web platform for managing customer and sales data with real-time insights and responsive design.",
      ko: "고객 및 매출 데이터를 효율적으로 관리하고 분석할 수 있는 웹 기반 통합 플랫폼. 실시간 목표 관리와 반응형 디자인 적용."
    },
    role: "Full-Stack Developer (Solo)",
    tech: ["Python(Django)", "HTML/CSS", "MySQL", "AWS", "Chart.js", "JavaScript","Bootstrap"],
    link: "https://drive.google.com/file/d/17HyJsUKMF6pSV6tyLRBnb6fZEq32TdOs/view?usp=drive_link"
  },
  {
    title: {
      en: "Simple Dashboard",
      ko: "심플 대시보드"
    },
    description: {
      en: "A secure and intuitive authentication system with email/password login, Google & Facebook OAuth, email verification, and user tracking.",
      ko: "이메일/소셜 로그인, 이메일 인증, 비밀번호 재설정, 사용자 통계를 지원하는 직관적이고 안전한 인증 시스템."
    },
    role: "Full-Stack Developer (Solo)",
    tech: ["Python (Django)", "Node.js", "JavaScript", "MySQL", "OAuth(Google, Facebook)", "HTML/CSS", "Heroku"],
    link: "https://github.com/PatriciaPark/simple-dashboard"
  },
  {
    title: {
      en: "Astronomy 3D Simulation",
      ko: "천문학 3D 시뮬레이션"
    },
    description: {
      en: "A web-based platform with simulation tools for an astronomy lab. Includes a research website, upgraded calculator, and 3D cosmic simulation.",
      ko: "천문학 연구를 위한 웹 기반 시뮬레이션 플랫폼으로, 연구 웹사이트, 계산기 업그레이드, 우주 시뮬레이션을 포함한 통합 프로젝트."
    },
    role: "Full-Stack Developer (Solo)",
    tech: ["Java", "JavaScript", "Unity3D(C#)", "HTML/CSS", "MATLAB", "Blender"],
    link: "https://drive.google.com/file/d/1JIsROXUPEJb28KuV8tae9m8HHLBCaYfb/view"
  },
  {
    title: {
      en: "Dokdo & 5G 3D Content Project",
      ko: "독도 & 5G 3D 콘텐츠 프로젝트"
    },
    description: {
      en: "3D content development for the Dokdo and KT 5G projects, including projection mapping and database integration. Featured at MVC 2018.",
      ko: "독도 프로젝트 및 KT 5G 프로젝트를 위한 3D 콘텐츠 개발, 프로젝션 매핑 및 DB 연동. MVC 2018 전시회에 출품된 실전 프로젝트."
    },
    role: "3D & Full-Stack Developer",
    tech: ["Unity3D(C#)", "Java", "JSP", "3D Max", "Photoshop", "PostgreSQL"],
    link: "https://drive.google.com/file/d/1Dl7H-Td4m_JEyDullgAUQbEFUy0BaL0-/view?usp=drive_link"
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
            <p className="mb-2 text-gray-600 dark:text-gray-300">{project.description[language]}</p>
            <p className="mb-1 text-sm text-gray-500 italic dark:text-gray-400">{project.role}</p>
            <p className="mb-2 text-sm text-gray-700 dark:text-gray-200">
              Tech Stack: {project.tech.join(", ")}
            </p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 underline text-sm"
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
