import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

// 고정된 탭 key 목록
const tabKeys = ["miniGames", "brickGirl", "novel"];

// 다국어 탭 라벨
const tabLabels = {
    en: {
        miniGames: "Mini Games",
        brickGirl: "Brick Girl",
        novel: "Novel"
    },
    ko: {
        miniGames: "미니게임",
        brickGirl: "브릭걸",
        novel: "소설"
    }
};

// 콘텐츠 데이터
const tabContent = {
    miniGames: [
        {
            title: { en: "Brick Breaker", ko: "벽돌깨기" },
            description: {
                en: "A classic brick-breaking mini game recreated with React + Canvas. Break all the blocks and challenge your reflexes!",
                ko: "클래식 벽돌깨기 게임을 React + Canvas로 재현했습니다. 모든 벽돌을 부수며 반사신경을 시험해보세요!"
            },
            status: { en: "Playable", ko: "플레이가능" },
            link: "/portfolio#/bb"
        },
        {
            title: { en: "Brick Girl: Space Defense", ko: "브릭걸: 스페이스 디펜스" },
            description: {
                en: "Defend space against alien invaders by throwing bricks! A fast-paced shooter built with React + Canvas.",
                ko: "우주 침공을 막아라! 벽돌을 던져 외계인을 처치하는 슈팅형 미니 게임입니다. React + Canvas로 제작."
            },
            status: { en: "Playable", ko: "플레이가능" },
            link: "/portfolio#/bsd"
        },
        {
            title: { en: "Brick Girl: Run & Throw", ko: "브릭걸: 런 & 스로우" },
            description: {
                en: "A runner-style game where you break through obstacles with bricks while running. Built with React + Canvas.",
                ko: "달리며 벽돌로 장애물을 제거하는 러너 스타일 미니 게임입니다. React + Canvas로 제작."
            },
            status: { en: "In Progress", ko: "작업중" },
            link: "" 
        }
    ],
    brickGirl: [
        {
            title: { en: "Brick Girl Universe", ko: "브릭걸 유니버스" },
            description: {
                en: "A pixel-art story game concept set in space.",
                ko: "픽셀 아트 기반의 우주 세계관 스토리 게임 기획입니다."
            },
            status: { en: "In Progress", ko: "작업중" },
            link: ""
        }
    ],
    novel: [
        {
            title: { en: "『You Are Not on Earth』", ko: "『너는 지구에 없어』" },
            description: {
                en: "A romance fantasy novel project in progress.",
                ko: "로맨스 판타지 장편소설 준비 중입니다."
            },
            status: { en: "Coming Soon", ko: "준비중" },
            link: ""
        }
    ]
};

export default function Lab() {
    const { language } = useLanguage();
    const [activeTab, setActiveTab] = useState("miniGames");

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "Playable":
            case "플레이가능":
                return "bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-200";
            case "In Progress":
            case "작업중":
                return "bg-yellow-100 dark:bg-yellow-800 text-yellow-600 dark:text-yellow-200";
            case "Coming Soon":
            case "준비중":
                return "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200";
            default:
                return "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300";
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4 py-8">
            {/* 타이틀 */}
            <h1 className="text-4xl font-bold text-center mb-10">
                🧪 {language === "en" ? "Lab: My Creative Playground" : "실험실: 상상력이 현실이 되는 곳"}
            </h1>

            {/* 탭 버튼들 */}
            <div className="flex justify-center gap-4 mb-8 flex-wrap">
                {tabKeys.map((key) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === key
                            ? "bg-cyan-500 text-white shadow"
                            : "bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-zinc-600"
                            }`}
                    >
                        {tabLabels[language][key]}
                    </button>
                ))}
            </div>

            {/* 콘텐츠 카드 */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                <AnimatePresence mode="sync">
                    {tabContent[activeTab]?.map((item, i) => {
                        const isClickable = !!item.link;

                        const ContentWrapper = isClickable ? motion.a : motion.div;
                        const baseStyle = `block p-6 rounded-xl border transition-all ${isClickable
                            ? "cursor-pointer hover:shadow-lg dark:hover:shadow-white/10"
                            : "opacity-50 cursor-not-allowed select-none"
                            }`;

                        return (
                            <ContentWrapper
                                key={item.title.en}
                                {...(isClickable && {
                                    href: item.link,
                                    target: "_blank",
                                    rel: "noopener noreferrer"
                                })}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className={`${baseStyle} bg-white dark:bg-zinc-800 shadow-md border-gray-200 dark:border-white/10`}
                            >
                                <h2 className="text-xl font-semibold mb-2 text-indigo-500 dark:text-indigo-300">
                                    {item.title[language]}
                                </h2>
                                <p className="text-sm mb-2">{item.description[language]}</p>
                                <span className={`text-xs px-3 py-1 inline-block rounded-full ${getStatusBadgeClass(item.status[language])}`}>
                                    {item.status[language]}
                                </span>
                            </ContentWrapper>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
