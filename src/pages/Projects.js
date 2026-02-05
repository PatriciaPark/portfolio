import { useLanguage } from "../context/LanguageContext";
import React, { useEffect } from "react";

const projects = [
  {
    title: {
      en: "World Book Ranking – World Books, One Place",
      ko: "World Book Ranking – 한 곳에서 만나는 전 세계의 책들"
    },
    description: {
      en: "A global book discovery mobile app that aggregates best-selling books by country, enabling users to explore reading trends across international markets.",
      ko: "나라별 베스트셀러 데이터를 수집·정리하여 전 세계 독서 트렌드를 한 곳에서 탐색할 수 있는 글로벌 도서 발견 모바일 앱."
    },
    role: "Lead Frontend Developer & Code Integration",
    tech: ["React Native", "React Navigation", "AdMob", "Amplitude", "Node.js", "Express", "Puppeteer", "Cheerio", "Google APIs"],
    link: {
      android: "https://play.google.com/store/apps/details?id=com.worldbookranking",
      ios: "https://apps.apple.com/app/world-book-ranking/id6755462071"
    }
  },
  {
    title: {
      en: "JobPilot - AI-powered Job Application Automation Platform",
      ko: "JobPilot - AI 기반 취업 관리 플랫폼"
    },
    description: {
      en: "An intelligent job application automation platform that leverages AI to analyze resumes, generate personalized cover letters, match job opportunities, and prepare for interviews.",
      ko: "AI를 활용해 이력서 분석, 맞춤형 커버레터 생성, 채용공고 매칭, 면접 준비를 제공하는 지능형 취업 관리 플랫폼."
    },
    role: "Full-Stack Developer (Solo)",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI", "Supabase", "Vercel"],
    link: "https://jobpilotabc.com/"
  },
  {
    title: {
      en: "JobPilot Biz - AI-powered Job Matching Service for Businesses",
      ko: "JobPilot Biz - AI 기반 맞춤 취업 서비스"
    },
    description: {
      en: "A modern job platform leveraging AI to provide personalized job recommendations and career insights. Built with Next.js, TypeScript, and Python, deployed on Vercel and Render.",
      ko: "AI를 활용해 맞춤형 취업 추천과 커리어 인사이트를 제공하는 최신 취업 플랫폼. Next.js, TypeScript, Python 기반으로 Vercel과 Render에 배포."
    },
    role: "Full-Stack Developer (Solo)",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "HTML", "Python", "Vercel", "Render"],
    link: "https://jobpilotbiz.vercel.app/"
  },
  {
    title: {
      en: "NeoOrder Lite - Order Management System",
      ko: "NeoOrder Lite - 주문 관리 시스템"
    },
    description: {
      en: "A lightweight Java web application simulating an order management system with RESTful APIs, status transitions, charts, and multi-language support. Deployed on Render for portfolio demos and API testing.",
      ko: "RESTful API, 상태 변경, 차트, 다국어 지원 기능을 갖춘 간소화된 주문 관리 시스템. Render 클라우드에 배포되어 포트폴리오 시연 및 API 테스트용으로 제작."
    },
    role: "Full-Stack Developer (Solo)",
    tech: ["Java", "Spring Boot", "Spring Web", "Spring Data JPA", "H2 DB", "Maven", "HTML", "JavaScript", "Chart.js", "Swagger UI", "Render"],
    link: "https://github.com/PatriciaPark/neoorder-lite"
  },
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
    tech: ["Python", "Django", "HTML/CSS", "MySQL", "AWS", "Chart.js", "JavaScript", "Bootstrap", "Git"],
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
    tech: ["Python", "Django", "Node.js", "JavaScript", "MySQL", "OAuth", "HTML/CSS", "Heroku", "Git"],
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
    role: "Full-Stack Developer",
    tech: ["Java", "JavaScript", "Unity3D", "C#", "HTML/CSS", "MATLAB", "Blender"],
    link: "https://doi.org/10.8080/1020170114003"
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
    tech: ["Unity3D", "C#", "Java", "JSP", "3D Max", "Photoshop", "PostgreSQL", "Git"],
    link: "https://drive.google.com/file/d/1Dl7H-Td4m_JEyDullgAUQbEFUy0BaL0-/view?usp=drive_link"
  },
  {
    title: {
      en: "Redcap Tour Hotel System",
      ko: "레드캡투어 호텔 시스템"
    },
    description: {
      en: "Developed and maintained hotel/visa/agency-related service pages for Redcap Tour (Next-gen Hotel Project with LG CNS).",
      ko: "레드캡투어(LG CNS)의 차세대 호텔 프로젝트에서 호텔·비자·기타 대행 서비스 페이지 개발 및 유지보수."
    },
    role: "Full-Stack Developer",
    tech: ["Java", "JavaScript", "JSP", "Oracle", "SQL", "BizActor", "UIP"],
    link: ""
  },  
  {
    title: {
      en: "Line Bank IFRS Accounting System",
      ko: "라인뱅크 IFRS 회계 시스템"
    },
    description: {
      en: "Developed accounting module for lease standard transition. Used Oracle procedures and Git-based workflow.",
      ko: "IFRS9 기준서 개정 대응 회계 시스템 취약점 유지보수 및 sso 개발."
    },
    role: "Backend Developer",
    tech: ["Java", "Oracle", "Git", "Spring"],
    link: ""
  },
  {
    title: {
      en: "eBay Korea Air Ticket Admin Platform",
      ko: "이베이코리아 항공권 어드민 플랫폼"
    },
    description: {
      en: "Developed admin interface for air ticket reservation and payment with role-based access.",
      ko: "항공권 예약 및 결제 관리 어드민 플랫폼 개발, 권한 기반 접근 제어 구현."
    },
    role: "Full-Stack Developer",
    tech: ["Java", "JSP", "Spring", "Oracle", "jQuery", "HTML/CSS", "JavaScript", "SQL", "Git"],
    link: ""
  },
  {
    title: {
      en: "Lotte Mart M-Coupon App",
      ko: "롯데마트 M쿠폰 앱 리뉴얼얼"
    },
    description: {
      en: "Implemented payment system API integration and backend maintenance for mobile coupon app.",
      ko: "모바일 쿠폰앱의 결제 시스템 API 연동 및 백엔드 유지보수."
    },
    role: "Backend Developer",
    tech: ["Java", "Spring", "Oracle", "SQL", "HTML/CSS"],
    link: ""
  },
  {
    title: {
      en: "Doosan Infracore Equipment & Parts Management System",
      ko: "두산인프라코어 LOS 실행 Transaction 프로젝트"
    },
    description: {
      en: "Built internal equipment/parts tracking system using Java and Vue.js.",
      ko: "장비/부품 관리 페이지 신규 개발 & 기존 페이지 유지보수 및 메뉴 추가 개발."
    },
    role: "Full-Stack Developer",
    tech: ["Java", "Vue.js", "MSSQL", "JavaScript", "HTML/CSS", "Git"],
    link: ""
  },
  {
    title: {
      en: "Tribons CRM Project",
      ko: "트라이본즈 CRM 프로젝트"
    },
    description: {
      en: "Modified data integration queries (insert → merge) and developed REST APIs for Oracle Eloqua Marketing Cloud Service.",
      ko: "데이터 통합 쿼리 수정 (insert → merge), Oracle Eloqua 마케팅 클라우드 연동용 REST API 개발."
    },
    role: "Backend Developer",
    tech: ["Java", "Oracle", "SQL", "MySQL", "Spring", "Git"],
    link: ""
  }
];

const colors = ["text-rose-400", "text-lime-400", "text-amber-400", "text-indigo-400"];

export default function Projects() {
  const { language } = useLanguage();

  // 페이지 진입 시 GA 이벤트 전송
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Projects',
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-10">
        {language === "en" ? "Projects" : "프로젝트"}
      </h1>
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="rounded-xl shadow-md bg-white dark:bg-zinc-900 hover:shadow-lg transition flex flex-col justify-between overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold">{project.title[language]}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{project.role}</p>
              <p className="mt-4 text-gray-700 dark:text-gray-300">{project.description[language]}</p>

              <hr className="my-4 border-gray-200 dark:border-gray-700" />

              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Tech Stack</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tech.map((tech, idx) => (
                  <span key={idx} className={`px-3 py-1 rounded-full bg-gray-800 text-xs ${colors[idx % colors.length]}`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.link && typeof project.link === 'object' ? (
              <div className="flex border-t border-gray-200 dark:border-gray-700">
                {project.link.android && (
                  <a
                    href={project.link.android}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-1/2 bg-gray-800 text-white text-sm py-3 px-4 flex items-center justify-between cursor-pointer hover:bg-gray-700 transition"
                  >
                    <span>{language === "en" ? "▶️ Google Play" : "▶️ 구글 플레이"}</span>
                    <span>➔</span>
                  </a>
                )}
                {project.link.ios && (
                  <a
                    href={project.link.ios}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-1/2 bg-gray-800 text-white text-sm py-3 px-4 flex items-center justify-between cursor-pointer hover:bg-gray-700 transition"
                  >
                    <span>{language === "en" ? "🍎 App Store" : "🍎 앱 스토어"}</span>
                    <span>➔</span>
                  </a>
                )}
              </div>
            ) : (
              project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white text-sm py-3 px-4 rounded-b-xl flex items-center justify-between cursor-pointer hover:bg-gray-700 transition"
                >
                  <span>{language === "en" ? "View More" : "더보기"}</span>
                  <span>➔</span>
                </a>
              )
            )}
          </div>

        ))}
      </div>
    </main>
  );
}
