import { useState } from "react";

export default function SuperSkillButton({ className = "", gauge = 0, onActivate = () => {}, disabled }) {
    const ready = gauge >= 100;
    const percent = Math.min(gauge, 100);
    const degree = Math.round((percent / 100) * 360);

    const backgroundStyle = {
        background: `conic-gradient(#3b82f6 ${degree}deg, #1f2937 ${degree}deg 360deg)`
    };

    return (
        <div
            className={`w-16 h-16 rounded-full flex items-center justify-center p-1 ${className}`}
            style={backgroundStyle}
            title="Super Sonic Dolphin Kick"
        >
            <button
                className={`w-full h-full rounded-full flex items-center justify-center text-xl font-press border shadow 
                            ${disabled || !ready ? 'bg-gray-800/70 text-gray-400 cursor-not-allowed' : 'bg-blue-400/70 text-white hover:bg-blue-500 active:bg-blue-700'}
                        `}
                onClick={() => ready && onActivate()}
                disabled={!ready || disabled}
            >
                🌀
            </button>
        </div>
    );
}
