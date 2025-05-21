import { useState } from "react";

export default function CoinUpgradeButton({ coins, onUpgrade, className = "", disabled }) {
    const upgradeSteps = [
        { cost: 40, increase: 100 },
        { cost: 80, increase: 200 },
        { cost: 160, increase: 300 },
        { cost: 320, increase: 500 }
    ];

    const [upgradeLevel, setUpgradeLevel] = useState(0);
    const currentStep = upgradeSteps[upgradeLevel];
    const canUpgrade = currentStep && coins >= currentStep.cost;

    const handleClick = () => {
        if (!canUpgrade) return;
        onUpgrade(currentStep.increase, currentStep.cost);
        setUpgradeLevel(prev => prev + 1);
    };

    if (!currentStep) return null; // 최대 업그레이드 도달 시 버튼 숨김

    return (
        <button
            className={`w-14 h-14 text-xs font-press border shadow rounded-full flex flex-col items-center justify-center text-center leading-tight 
                        ${className}
                        ${disabled || !canUpgrade ? 'bg-gray-700/70 text-gray-400 cursor-not-allowed' : 'bg-green-600/70 text-white hover:bg-green-500'}
                    `}
            onClick={handleClick}
            disabled={!canUpgrade || disabled}
        >
            💼
            <span className="text-[10px]">+{currentStep.increase}</span>
            <span className="text-[9px]">-{currentStep.cost}</span>
        </button>
    );
}