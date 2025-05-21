export default function UnitButtons({ coins = 0, onSummon = () => { }, className = "", disabled }) {
    const units = [
        {
            name: "돌핀 스카우트", cost: 20, emoji: "🐬",
            speed: 0.4, hp: 80, atk: 60, // 빠르고 약한 연속공격형
            castleCooldown: 0
        },
        {
            name: "딥블루", cost: 50, emoji: "🐟",
            speed: 0.3, hp: 160, atk: 120, // 밸런스형
            castleCooldown: 0
        },
        {
            name: "헬리돌핀", cost: 100, emoji: "🐡",
            speed: 0.2, hp: 240, atk: 180, // 느리지만 단단하고 강함
            castleCooldown: 0
        },
        {
            name: "서퍼샤크", cost: 200, emoji: "🦈",
            speed: 0.5, hp: 200, atk: 200, // 고속 강공격 돌격
            castleCooldown: 0
        },
        {
            name: "돌핀킹", cost: 300, emoji: "🐳",
            speed: 0.1, hp: 350, atk: 300, // 느리지만 압도적인 위력
            castleCooldown: 0
        }
    ];


    return (
        <div className={`flex gap-1 px-2 py-1 bg-black bg-opacity-50 rounded ${className}`}>
            {units.map((unit, index) => {
                const canAfford = coins >= unit.cost;
                return (
                    <button
                        key={index}
                        className={`flex flex-col items-center justify-center w-12 h-12 text-xs rounded border font-press transition-all duration-200 
                                    ${disabled || !canAfford ? 'bg-gray-600/70 text-gray-400 border-gray-500/70 cursor-not-allowed' : 'bg-gray-800 text-white border-white hover:bg-gray-700'}
                                `}
                        title={`${unit.name} (${unit.cost})`}
                        disabled={!canAfford || disabled}
                        onClick={() => canAfford && onSummon(unit)}
                    >
                        <span className="text-xl">{unit.emoji}</span>
                        <span>{unit.cost}</span>
                    </button>
                );
            })}
        </div>
    );
}
