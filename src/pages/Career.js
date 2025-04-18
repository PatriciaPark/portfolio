import { useLanguage } from "../context/LanguageContext";

const careerTimeline = [
  {
    company: "Self-Employed (Canada & Korea)",
    period: "2024 – 2025",
    description: {
      en: "Running a solo business focused on web and mobile development.",
      ko: "웹 및 모바일 개발 중심의 1인 사업을 운영 및 웹사이트와 2D 게임을 직접 설계, 개발, 배포."
    }
  },
  {
    company: "Redcap Tour (Seoul, Korea)",
    period: "2023 – 2024",
    description: {
      en: "Developed hotel & agency system. Optimized backend API with Oracle.",
      ko: "호텔 및 에이전시 시스템 개발. 백엔드 API 최적화 및 Oracle 통합."
    }
  },
  {
    company: "KGC Taiwan (Taipei, Taiwan)",
    period: "2022 – 2023",
    description: {
      en: "Built data management system and automated workflows using AWS.",
      ko: "데이터 관리 시스템 구축 및 AWS 기반 자동화 워크플로우 구현."
    }
  },
  {
    company: "Freelance Projects (Taiwan & Korea)",
    period: "2020 – 2021",
    description: {
      en: "Completed projects for Line Bank, Lotte Mart, Doosan Infracore, Tribons.",
      ko: "라인뱅크 타이완, 롯데마트, 두산 인프라코어, 트라이본즈 프로젝트 수행."
    }
  },
  {
    company: "eBay Korea (Seoul, Korea)",
    period: "2018 – 2019",
    description: {
      en: "Improved air ticket platform, optimized system performance.",
      ko: "항공권 플랫폼 개선 및 시스템 성능 최적화."
    }
  },
  {
    company: "Ariel Networks (Seoul, Korea)",
    period: "2017 – 2018",
    description: {
      en: "Created 3D content for KT 5G & Dokdo Project.",
      ko: "KT 5G 및 독도 프로젝트용 3D 콘텐츠 제작."
    }
  },
  {
    company: "Sejong University R&D (Seoul, Korea)",
    period: "2017",
    description: {
      en: "Developed astronomy visualization and research interface.",
      ko: "천문학 시각화 및 연구 인터페이스 개발."
    }
  }
];

export default function Career() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-10">
        {language === "en" ? "Career Timeline" : "경력 사항"}
      </h1>
      <div className="max-w-4xl mx-auto space-y-6">
        {careerTimeline.map((job, index) => (
          <div key={index} className="border-l-4 border-gray-400 pl-4">
            <h2 className="text-xl font-semibold">{job.company}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{job.period}</p>
            <p className="text-gray-700 dark:text-gray-200">{job.description[language]}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
