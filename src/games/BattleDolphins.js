import { useEffect, useRef, useState } from "react";
import { playSound, stopBGM, sounds } from './sounds';
import CoinDisplay from "./ui/CoinDisplay";
import UnitButtons from "./ui/UnitButtons";
import SuperSkillButton from "./ui/SuperSkillButton";
import CoinUpgradeButton from "./ui/CoinUpgradeButton";

function processUnitBehavior({
    ctx,
    unit,              // 유닛 또는 적
    unitListRef,       // unitsRef.current 또는 enemiesRef.current
    targetListRef,     // 반대 진영
    targetCastleHpRef, // 성 체력
    canvasWidth,
    isEnemy, //= false,   // true면 적
    castleShakeRef
}) {
    // 1. 돌핀킥 처리
    if (unit.isSkill) {
        unit.x -= unit.speed;
        if (!isEnemy && unit.x <= 30) {
            targetCastleHpRef.current = Math.max(0, targetCastleHpRef.current - 999);
            unit.hp = 0;
        }
        ctx.fillText(unit.emoji, unit.x, unit.y);
        return;
    }

    // 2. 성 도달 판정 (우선순위 제일 높음)
    const castleX = isEnemy ? canvasWidth - 50 : 30;
    const reachedCastle = isEnemy ? unit.x >= castleX : unit.x <= castleX;

    if (reachedCastle) {
        if (!unit.castleCooldown || Date.now() - unit.castleCooldown > 1000) {
            targetCastleHpRef.current = Math.max(0, targetCastleHpRef.current - unit.atk);
            unit.castleCooldown = Date.now();

            // 흔들림 시작!
            if (isEnemy) {
                // 적이 공격 = 아군 성(오른쪽)이 흔들림
                castleShakeRef.current.right = 8;
            } else {
                castleShakeRef.current.left = 8;
            }
        }

        if (!unit.wallHitCooldown || Date.now() - unit.wallHitCooldown > 1000) {
            unit.hp -= 1;
            unit.wallHitCooldown = Date.now();
        }

        unit.x = castleX + (isEnemy ? 1 : -1) * 4 * Math.sin(Date.now() / 100);
        ctx.fillText(unit.emoji, unit.x, unit.y);
        return;
    }

    // 3. 타겟 탐색
    let targetRef = null;
    let minDist = Infinity;
    targetListRef.forEach(t => {
        if ((isEnemy && t.x > unit.x) || (!isEnemy && t.x < unit.x)) {
            const dx = t.x - unit.x;
            const dy = t.y - unit.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < minDist) {
                minDist = dist;
                targetRef = t;
            }
        }
    });

    // 4. 전투 or 추적
    if (targetRef) {
        const dx = targetRef.x - unit.x;
        const dy = targetRef.y - unit.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 20) {
            unit.hp -= targetRef.atk;
            targetRef.hp -= unit.atk;

            unit.x += Math.sin(Date.now() / 50) * 2;
            targetRef.x -= Math.sin(Date.now() / 50) * 2;

            // 💥 피격 or 폭발 효과음
            if (!unit.soundCooldown || Date.now() - unit.soundCooldown > 500) {
                playSound('hit'); // hit.wav 사용
                unit.soundCooldown = Date.now();
            }
        } else {
            const angle = Math.atan2(dy, dx);
            unit.x += Math.cos(angle) * unit.speed;
            unit.y += Math.sin(angle) * unit.speed;
        }
    } else {
        // 타겟 없음 → 성 쪽으로 이동
        const dx = castleX - unit.x;
        const dy = 0;
        const angle = Math.atan2(dy, dx);
        unit.x += Math.cos(angle) * unit.speed;
        unit.y += Math.sin(angle) * unit.speed;
    }

    // 5. 그리기
    ctx.fillText(unit.emoji, unit.x, unit.y);
}

export default function BattleDolphins() {
    const canvasRef = useRef(null);
    const [canvasSize, setCanvasSize] = useState({ width: 400, height: 300 });

    const [coins, setCoins] = useState(0);
    const [maxCoins, setMaxCoins] = useState(100);
    const maxCoinsRef = useRef(100);
    const [units, setUnits] = useState([]);
    const [skillGauge, setSkillGauge] = useState(0);

    const [gameOver, setGameOver] = useState(false);
    const [gameClear, setGameClear] = useState(false);

    const unitsRef = useRef([]);
    const enemiesRef = useRef([]);
    // 성 hp
    const playerCastleHp = useRef(10000);
    const enemyCastleHp = useRef(10000);
    // 배경/이펙트
    const bubblesRef = useRef([]);
    const castleShakeRef = useRef({ left: 0, right: 0 });
    const [muted, setMuted] = useState(false);

    const enemyPool = [
        { emoji: "🪸", name: "산호몬", hp: 500, speed: 0.03, atk: 1, castleCooldown: 0 },    // 방어용, 거의 고정 (시간 견제)
        { emoji: "🌐", name: "해파리", hp: 250, speed: 0.2, atk: 30, castleCooldown: 0 },    // 중간속도, 적당한 피해
        { emoji: "🐚", name: "단단조개", hp: 400, speed: 0.1, atk: 10, castleCooldown: 0 },  // 방어력 탱커형
        { emoji: "🟢", name: "이끼괴물", hp: 350, speed: 0.15, atk: 20, castleCooldown: 0 }, // 밸런스형
        { emoji: "🦑", name: "돌진오징어", hp: 200, speed: 0.3, atk: 60, castleCooldown: 0 } // 강한 공격력, 낮은 HP
    ];

    // 전체 사운드 제어
    const toggleMute = () => {
        const newMuted = !muted;
        setMuted(newMuted);
        Howler.mute(newMuted);
    };

    // 코인 증가 함수
    const addCoins = (amount) => {
        setCoins(prev => {
            const capped = Math.min(prev, maxCoinsRef.current);
            const available = maxCoinsRef.current - capped;
            const gain = Math.max(0, Math.min(amount, available));
            // console.log(`현재 코인: ${prev}, 추가될 코인: ${gain}, 최대 코인: ${maxCoinsRef.current}`);
            return capped + gain;
        });
    };

    // 초기화: 캔버스 크기 반응형
    useEffect(() => {
        const updateSize = () => {
            const width = Math.min(window.innerWidth - 10, 540);
            const height = Math.round(width * 0.6);
            setCanvasSize({ width, height });
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    // 초기 물방울 생성
    useEffect(() => {
        const newBubbles = Array.from({ length: 30 }, () => ({
            x: Math.random() * canvasSize.width,
            y: canvasSize.height + Math.random() * 100, // 아래에서 시작
            radius: Math.random() * 2 + 1,
            speed: Math.random() * 0.5 + 0.2
        }));
        bubblesRef.current = newBubbles;
    }, [canvasSize]);

    // 게임 시작 시 배경음악 (BGM)
    useEffect(() => {
        const startBGM = () => {
            playSound('bgm');
            window.removeEventListener('click', startBGM);
        };
        window.addEventListener('click', startBGM);
    }, []);

    // 페이지 벗어날 때 BGM off
    useEffect(() => {
        return () => {
            stopBGM(); // 컴포넌트가 사라질 때도 정지
        };
    }, []);

    // 코인 자동 증가 로직
    useEffect(() => {
        if (gameOver || gameClear) return;

        const interval = setInterval(() => {
            setCoins(prev => (prev < maxCoins ? prev + 1 : prev)); // 50ms 기준 증가량
        }, 50);
        return () => clearInterval(interval);
    }, [maxCoins, gameOver, gameClear]);

    // 슈퍼스킬 게이지 증가 로직
    useEffect(() => {
        if (gameOver || gameClear) return;

        const interval = setInterval(() => {
            setSkillGauge(prev => (prev < 100 ? prev + 1 : prev));
        }, 500);
        return () => clearInterval(interval);
    }, [gameOver, gameClear]);

    // 적 생성 로직
    useEffect(() => {
        let spawnInterval = 2000; // 시작 간격
        let elapsed = 0;
        let intervalId;

        const spawnEnemy = () => {
            if (gameOver || gameClear) return;

            const enemy = enemyPool[Math.floor(Math.random() * enemyPool.length)];
            enemiesRef.current.push({
                ...enemy,
                x: 0,
                y: Math.random() * (canvasSize.height - 40) + 20
            });

            // 시간 경과에 따라 간격 점점 줄이기
            elapsed += spawnInterval;
            if (spawnInterval > 300 && elapsed >= 1000) { // 1초마다 간격 감소
                spawnInterval -= 100;
                elapsed = 0;

                clearInterval(intervalId);
                intervalId = setInterval(spawnEnemy, spawnInterval);
            }
        };

        intervalId = setInterval(spawnEnemy, spawnInterval);

        return () => clearInterval(intervalId);
    }, [canvasSize.height, gameOver, gameClear]);

    const handleUpgrade = (increase, cost) => {
        setCoins(prev => prev - cost);
        setMaxCoins(prev => {
            const updated = prev + increase;
            maxCoinsRef.current = updated; // ✅ ref도 같이 업데이트!
            return updated;
        });

        // 💰 효과음
        playSound('coin');
    };

    const handleSummon = (unit) => {
        if (coins >= unit.cost) {
            setCoins(prev => prev - unit.cost);
            const newUnit = {
                ...unit,
                x: canvasSize.width - 40,
                y: Math.random() * (canvasSize.height - 40) + 20,
                speed: unit.speed || 1,
                hp: unit.hp || 100,
                atk: unit.atk || 10
            };
            unitsRef.current.push(newUnit);
            setUnits([...unitsRef.current]);

            // 🔊 출격 효과음
            playSound('deploy');
        }
    };

    const handleSuperSkill = () => {
        if (skillGauge < 100) return;

        const lines = 10;
        const spacing = canvasSize.height / (lines + 1);
        const newBursts = Array.from({ length: lines }).map((_, i) => ({
            emoji: '🌀',
            x: canvasSize.width - 40,
            y: spacing * (i + 1),
            speed: 5,
            atk: 999,
            hp: 1,
            isSkill: true
        }));

        unitsRef.current.push(...newBursts);
        setUnits([...unitsRef.current]);
        setSkillGauge(0);

        // 🔊 슈퍼스킬 사운드
        playSound('super');
    };

    // 유닛 & 적 이동 및 그리기
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#001f3f";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = "20px Arial";

            // 🫧 배경 물방울
            ctx.fillStyle = "rgba(255,255,255,0.2)";
            bubblesRef.current.forEach(b => {
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
                ctx.fill();

                b.y -= b.speed;

                // 위로 올라가면 다시 아래로
                if (b.y < -10) {
                    b.x = Math.random() * canvas.width;
                    b.y = canvas.height + Math.random() * 50;
                    b.radius = Math.random() * 2 + 1;
                    b.speed = Math.random() * 0.5 + 0.2;
                }
            });

            // 성
            const castleMaxHp = 10000;

            // 성 본체 높이 설정
            const castleHeight = canvas.height;
            const enemyBarHeight = castleHeight * (enemyCastleHp.current / castleMaxHp);
            const playerBarHeight = castleHeight * (playerCastleHp.current / castleMaxHp);

            // 1️⃣ 흔들림 감쇠 먼저 (매 프레임마다 감소)
            if (castleShakeRef.current.left > 0) castleShakeRef.current.left -= 1;
            if (castleShakeRef.current.right > 0) castleShakeRef.current.right -= 1;

            // 2️⃣ 흔들림 적용해서 성 + 체력바 그리기
            // 🎯 적 성 (왼쪽)
            ctx.fillStyle = "#78350f"; // 성 배경 색
            ctx.fillRect(10 + castleShakeRef.current.left, 0, 20, castleHeight);

            // ❤️ 왼쪽 체력바
            ctx.fillStyle = "#ef4444"; // 체력바 (빨강)
            ctx.fillRect(0, castleHeight - enemyBarHeight, 6, enemyBarHeight); // 아래서 위로

            // 🛡️ 아군 성 (오른쪽)
            ctx.fillStyle = "#93c5fd";
            ctx.fillRect(canvas.width - 30 + castleShakeRef.current.right, 0, 20, castleHeight); // 성 본체

            // 💚 오른쪽 체력바
            ctx.fillStyle = "#22c55e"; // 체력바 (초록)
            ctx.fillRect(canvas.width - 6, castleHeight - playerBarHeight, 6, playerBarHeight);

            // 🧾 체력 숫자
            ctx.fillStyle = "white";
            ctx.font = "10px 'Press Start 2P'";
            ctx.fillText(enemyCastleHp.current, 10, 12);
            ctx.fillText(playerCastleHp.current, canvas.width - 60, 12);


            // 🎮 이후 기본 폰트 크기 복원
            ctx.font = "20px 'Press Start 2P'";

            // 유닛
            unitsRef.current = unitsRef.current.filter(u => u.hp > 0);
            unitsRef.current.forEach(u => {
                processUnitBehavior({
                    ctx,
                    unit: u,
                    unitListRef: unitsRef.current,
                    targetListRef: enemiesRef.current,
                    targetCastleHpRef: enemyCastleHp,
                    canvasWidth: canvas.width,
                    isEnemy: false,
                    castleShakeRef
                });
            });

            // 적
            enemiesRef.current.forEach(e => {
                processUnitBehavior({
                    ctx,
                    unit: e,
                    unitListRef: enemiesRef.current,
                    targetListRef: unitsRef.current,
                    targetCastleHpRef: playerCastleHp,
                    canvasWidth: canvas.width,
                    isEnemy: true,
                    castleShakeRef
                });
            });

            // 적 처치시 🪙 코인 10 지급
            const oldEnemies = enemiesRef.current;
            enemiesRef.current = oldEnemies.filter(e => {
                const alive = e.hp > 0;
                if (!alive) addCoins(30);
                return alive;
            });

            if (!gameOver && playerCastleHp.current <= 0) {
                setGameOver(true);
                return;
            }
            if (!gameClear && enemyCastleHp.current <= 0) {
                setGameClear(true);
                return;
            }

            unitsRef.current = unitsRef.current.filter(u => u.hp > 0);
            unitsRef.current.forEach(u => {
                ctx.fillText(u.emoji, u.x, u.y);
                u.x -= u.speed;
            });

            enemiesRef.current = enemiesRef.current.filter(e => e.hp > 0);
            enemiesRef.current.forEach(e => {
                ctx.fillText(e.emoji, e.x, e.y);
                e.x += e.speed;
            });

            // 게임 승리/패배 효과음
            if (gameOver && playerCastleHp.current <= 0) {
                playSound('defeat'); // 🔊 패배음
                stopBGM();
                setGameOver(true);
                return;
            }
            if (gameClear && enemyCastleHp.current <= 0) {
                playSound('victory'); // 🔊 승리음
                stopBGM();
                setGameClear(true);
                return;
            }

            if (!gameOver && !gameClear) requestAnimationFrame(draw);
        };

        draw();
    }, [canvasSize, gameOver, gameClear]);

    return (
        <div className="flex flex-col items-center mt-6 relative">
            <h2 className="font-press font-bold mb-4 text-sky-400">Battle Dolphins</h2>
            <div className="relative" style={{ width: canvasSize.width, height: canvasSize.height }}>
                <canvas
                    ref={canvasRef}
                    width={canvasSize.width}
                    height={canvasSize.height}
                    className="bg-black rounded shadow-md touch-none absolute top-0 left-0 z-0"
                    style={{ width: "100%", maxWidth: "540px", display: 'block' }}
                />
                <button
                    onClick={toggleMute}
                    className={`absolute top-2 left-1/2 -translate-x-1/2 z-10 w-9 h-9 rounded-full
                                flex items-center justify-center font-press text-xl
                                ${muted ? 'bg-gray-600/50' : 'bg-cyan-500/50'}
                                text-white hover:brightness-110 backdrop-blur-sm transition`}
                    aria-label="Toggle Sound"
                >
                    <span className="-translate-y-[3px] opacity-50">{muted ? '🔇' : '🔊'}</span>
                </button>
                <CoinDisplay className="absolute top-2 right-16 z-10" coins={Math.min(coins, maxCoins)} maxCoins={maxCoins} />
                <SuperSkillButton className="absolute bottom-2 right-2 z-10"
                    gauge={skillGauge}
                    onActivate={handleSuperSkill}
                    disabled={gameOver || gameClear}
                />
                <UnitButtons className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10"
                    coins={coins}
                    onSummon={handleSummon}
                    disabled={gameOver || gameClear}
                />
                <CoinUpgradeButton
                    className="absolute bottom-2 left-2 z-10"
                    coins={coins}
                    onUpgrade={handleUpgrade}
                    disabled={gameOver || gameClear}
                />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none" style={{ backgroundColor: (gameOver || gameClear) ? 'rgba(0,0,0,0.4)' : 'transparent' }}>
                    {(gameOver || gameClear) && (
                        <>
                            <p className="text-xl font-press text-white text-center">
                                {gameOver ? "😢 GAME OVER" : "🎉MISSION COMPLETE!"}
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="font-press mt-4 px-4 py-2 bg-white text-black rounded-lg text-sm pointer-events-auto"
                            >
                                Restart
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}