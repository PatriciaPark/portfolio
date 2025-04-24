import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mind map data structure
const mindMapData = {
    label: "ME",
    color: "bg-cyan-400", // 중심은 시안 계열로 과학적인 느낌 강조
    children: [
        {
            label: "Full-Stack Developer",
            color: "bg-indigo-500",
            children: [
                { label: "Java", color: "bg-indigo-600" },
                { label: "JavaScript", color: "bg-indigo-600" },
                { label: "HTML/CSS", color: "bg-indigo-500" },
                { label: "Python", color: "bg-indigo-500" },
                { label: "C#", color: "bg-indigo-400" },
                { label: "Vue.js", color: "bg-indigo-400" },
                { label: "Django", color: "bg-indigo-300" }
            ]
        },
        {
            label: "Ownership",
            color: "bg-fuchsia-500"
        },
        {
            label: "Problem-Solving",
            color: "bg-fuchsia-500"
        },
        {
            label: "Hobbies",
            color: "bg-violet-500",
            children: [
                {
                    label: "Game",
                    color: "bg-violet-600",
                    children: [
                        { label: "Diablo", color: "bg-violet-500" },
                        { label: "Animal Crossing", color: "bg-violet-400" },
                        { label: "Minecraft", color: "bg-violet-300" }
                    ]
                },
                {
                    label: "Writing",
                    color: "bg-violet-500",
                    children: [
                        { label: "Essay", color: "bg-violet-400" },
                        { label: "Novel", color: "bg-violet-300" }
                    ]
                },
                {
                    label: "Listening Music",
                    color: "bg-violet-500",
                    children: [
                        { label: "Classical Music", color: "bg-violet-400" },
                        { label: "Jazz", color: "bg-violet-300" },
                        { label: "K-pop", color: "bg-violet-200" }
                    ]
                },
                { label: "Piano", color: "bg-violet-400" },
                { label: "Trip", color: "bg-violet-400" },
                { label: "Caligraphy", color: "bg-violet-300" }
            ]
        },
        {
            label: "Passionate",
            color: "bg-fuchsia-500"
        },
        {
            label: "Continuous Learning",
            color: "bg-fuchsia-500"
        },
        {
            label: "Multilingual",
            color: "bg-cyan-500",
            children: [
                { label: "Korean ⭐⭐⭐", color: "bg-cyan-600" },
                { label: "English ⭐⭐", color: "bg-cyan-500" },
                { label: "Chinese ⭐⭐", color: "bg-cyan-400" },
                { label: "Japanese ⭐", color: "bg-cyan-300" }
            ]
        },
        {
            label: "Leadership",
            color: "bg-fuchsia-500"
        },
        {
            label: "Adaptability",
            color: "bg-fuchsia-500"
        }
    ]
};


export default function MindMapPage() {
    const [path, setPath] = useState([]);
    const currentNode = path[path.length - 1] || mindMapData;
    const isRoot = path.length === 0;

    // 중앙 좌표 기준
    const mePosition = {
        x: window.innerWidth / 2 - 55,
        y: window.innerHeight / 2 - 150
    };

    const baseCenter = {
        x: window.innerWidth / 2 - 40,
        y: window.innerHeight / 2 - 130
    };

    const handleClick = (node) => {
        if (node === currentNode && path.length > 0) {
            setPath((prev) => prev.slice(0, -1)); // 뒤로 가기
        } else if (node.children) {
            node._origin = node._origin || { x: mePosition.x, y: mePosition.y }; // 현재 위치 기억
            setPath((prev) => [...prev, node]);
        }
    };

    const baseCircleClass =
        "absolute rounded-full text-white text-center flex items-center justify-center transition-all duration-300 focus:outline-none shadow-md hover:shadow-lg dark:shadow-white/10";

    // 글씨 및 그림자 강조 클래스 : tailwind.config.js
    const emphasizedRing = "ring-2 ring-white/20 dark:ring-white/70 animate-pulseGlow";
    const emphasizedShadow = "shadow-[0_8px_10px_rgba(0,0,0,0.5)] dark:shadow-[0_8px_24px_rgba(255,255,255,0.5)] dark:drop-shadow-whiteGlow";

    // 방사형 레이아웃 계산 함수
    const getRadialLayout = (count, radius = 140) => {
        const angleStep = (Math.PI * 2) / count;
        return Array.from({ length: count }, (_, i) => {
            const angle = angleStep * i - Math.PI / 2;
            return {
                x: baseCenter.x + Math.cos(angle) * radius,
                y: baseCenter.y + Math.sin(angle) * radius
            };
        });
    };

    const origin = path.length > 0 && currentNode._origin ? currentNode._origin : mePosition;
    const hasChildren = !!currentNode.children;

    return (
        <div className="relative w-screen h-screen bg-white dark:bg-gray-900 overflow-hidden">
            {/* 상위 노드 (중앙) */}
            <motion.button
                key={currentNode.label + "-main" + path.length}
                initial={{ opacity: 0.2, scale: 0.9, left: origin.x, top: origin.y }}
                exit={{ opacity: 0.35, scale: 0.85 }}
                animate={{
                    opacity: 1,
                    scale: isRoot ? [1, 1.1, 1] : 1,
                    left: mePosition.x,
                    top: mePosition.y,
                    boxShadow: isRoot
                        ? [
                            "0 0 0 rgba(255,255,255,0)",
                            "0 0 24px rgba(255,255,255,0.5)",
                            "0 0 0 rgba(255,255,255,0)"
                        ]
                        : "none"
                }}
                transition={{
                    duration: isRoot ? 3 : 0.4,
                    repeat: isRoot ? Infinity : 0,
                    repeatType: "loop",
                    ease: isRoot ? ["easeInOut", "easeInOut"] : "easeInOut",
                    times: isRoot ? [0, 0.5, 1] : undefined
                }}
                className={`w-28 h-28 ${currentNode.color} z-10 ${baseCircleClass} 
              ${hasChildren ? `${emphasizedShadow} ${emphasizedRing} hover:scale-105 hover:brightness-110` : ""}`}
                onClick={() => handleClick(currentNode)}
            >
                {currentNode.label}
            </motion.button>

            {/* <motion.button
                key={currentNode.label + "-main" + path.length}
                initial={{ opacity: 0, scale: 0.9, left: origin.x, top: origin.y }}
                animate={{ opacity: 1, scale: 1, left: mePosition.x, top: mePosition.y }}
                transition={{ duration: 0.4 }}
                className={`w-28 h-28 ${currentNode.color} z-10 ${baseCircleClass} 
                            ${hasChildren ? `${emphasizedShadow} ${emphasizedRing} hover:scale-105 hover:brightness-110` : ""}`}
                onClick={() => handleClick(currentNode)}
            >
                {currentNode.label}
            </motion.button> */}

            {/* 하위 노드: 중앙에서 확장되는 효과 */}
            <AnimatePresence>
                {!isRoot &&
                    currentNode.children &&
                    getRadialLayout(currentNode.children.length).map((targetPos, i) => {
                        const child = currentNode.children[i];
                        child._origin = { x: targetPos.x, y: targetPos.y };
                        const hasChildren = !!child.children;

                        return (
                            <motion.button
                                key={child.label}
                                initial={{ opacity: 0, scale: 0, left: mePosition.x, top: mePosition.y }}
                                animate={{ opacity: 1, scale: 1, left: targetPos.x, top: targetPos.y }}
                                exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                // exit={{ opacity: 0, scale: 0, left: mePosition.x, top: mePosition.y }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                                className={`w-20 h-20 ${child.color} ${baseCircleClass} 
                                            ${hasChildren ? `${emphasizedShadow} ${emphasizedRing} hover:scale-105 hover:brightness-110` : ""}`}
                                onClick={() => handleClick(child)}
                            >
                                {child.label}
                            </motion.button>
                        );
                    })}
            </AnimatePresence>
        </div >
    );
}
