import { useEffect, useRef, useState } from "react";

export default function Game() {
    const canvasRef = useRef(null);
    const [canvasSize, setCanvasSize] = useState({ width: 400, height: 300 });

    // 브릭걸 위치 및 이동 관련
    const girlX = 30;
    const girlYRef = useRef(150);
    const girlSpeed = 4;
    const keys = useRef({ up: false, down: false });

    // 스프라이트 애니메이션 관련 설정
    const spriteRef = useRef(new Image());
    const frameWidth = 335;   // Math.floor(1024 / 3) = 341
    const frameHeight = 512;  // Math.floor(1024 / 2) = 512
    const numCols = 3;  // 이미지 가로 프레임 수
    const numRows = 2;  // 이미지 세로 프레임 수
    const frameX = useRef(0);
    const frameY = useRef(0);
    const frameCount = useRef(0);
    const scale = 0.1;  // 브릭걸 캐릭터 사이즈
    const [spriteLoaded, setSpriteLoaded] = useState(false);

    // 적 우주선 상태
    const enemiesRef = useRef([]);

    // 벽돌 관련
    const bricksRef = useRef([]);
    const fireBricksRef = useRef(() => { });
    const shootCooldownRef = useRef(false);
    const shootIntervalRef = useRef(null);

    // 트리플샷 상태
    const tripleShotTimerRef = useRef(null);
    const [tripleShot, setTripleShot] = useState(false);

    // 아이템 상태
    const itemRef = useRef(null);

    // 애니메이션 루프
    const animationRef = useRef();
    const isTouching = useRef(false);

    // 별빛 배경
    const starsRef = useRef([]);

    // 점수 상태
    const scoreRef = useRef(0);
    const [score, setScore] = useState(0);

    // 게임 상태
    const [gameOver, setGameOver] = useState(false);
    const [gameClear, setGameClear] = useState(false);

    // 별빛 초기화
    useEffect(() => {
        const stars = Array.from({ length: 100 }, () => ({
            x: Math.random() * canvasSize.width,
            y: Math.random() * canvasSize.height,
            size: Math.random() * 0.8 + 0.2,
            speed: Math.random() * 1 + 0.5,
        }));
        starsRef.current = stars;
    }, [canvasSize]);

    // 브릭걸 스프라이트 이미지 로드
    useEffect(() => {
        spriteRef.current.src = process.env.PUBLIC_URL + "/brickgirl_sprite.png";
        spriteRef.current.onload = () => setSpriteLoaded(true);
    }, []);

    // 1. tripleShot 상태가 바뀌면 shootInterval을 재시작
    useEffect(() => {
        if (isTouching.current) {
            // 이미 인터벌이 있다면 제거하고 재설정
            if (shootIntervalRef.current) {
                clearInterval(shootIntervalRef.current);
            }
            shootIntervalRef.current = setInterval(() => {
                fireBricksRef.current();
            }, 250);
        }

        return () => clearInterval(shootIntervalRef.current);
    }, [tripleShot]);

    // fireBricks 함수 최신 상태 반영
    useEffect(() => {
        fireBricksRef.current = () => {
            const baseY = girlYRef.current;
            if (tripleShot) {
                bricksRef.current.push({ x: girlX + 10, y: baseY + 50, speedX: 6, speedY: 0 });
                bricksRef.current.push({ x: girlX + 10, y: baseY + 30, speedX: 6, speedY: 0 });
                bricksRef.current.push({ x: girlX + 10, y: baseY + 10, speedX: 6, speedY: 0 });
            } else {
                bricksRef.current.push({ x: girlX + 10, y: baseY + 30, speedX: 6, speedY: 0 });
            }
        };
    }, [tripleShot]);

    // 게임 main 루프 실행
    useEffect(() => {
        if (!spriteLoaded) return;  // 이미지가 아직 로드되지 않으면 실행 X

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 배경 별빛
            ctx.fillStyle = "white";
            starsRef.current.forEach((star) => {
                star.x -= star.speed;
                if (star.x < 0) star.x = canvas.width;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // 게임 종료 처리
            if (gameOver || gameClear) {
                // GA 추적
                gtag("event", "game_over", {
                    event_category: "game",
                    event_label: "brickgirl",
                });

                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                ctx.font = "16px 'Press Start 2P'";
                ctx.textAlign = "center";
                ctx.fillStyle = "white";
                ctx.fillText(gameOver ? "😥 GAME OVER" : "🎉 MISSION COMPLETE!", centerX, centerY - 20);
                ctx.font = "13px 'Press Start 2P'";
                ctx.fillStyle = "#93c5fd";
                ctx.fillText("Tap or Press R to Restart", centerX, centerY + 20);
                return; // draw 중단
            }

            // 브릭걸 스프라이트 그리기
            ctx.drawImage(
                spriteRef.current,
                frameX.current * frameWidth,
                frameY.current * frameHeight,
                frameWidth,
                frameHeight,
                girlX,
                girlYRef.current,
                frameWidth * scale,
                frameHeight * scale
            );

            // 프레임 전환 애니메이션
            if (frameCount.current % 10 === 0) {
                frameX.current = (frameX.current + 1) % numCols;
                if (frameX.current === 0) frameY.current = (frameY.current + 1) % numRows;
            }
            frameCount.current++;

            // 브릭걸 이동
            if (keys.current.up && girlYRef.current > -5) girlYRef.current -= girlSpeed;    // 20 숫자를 줄이면 위로 더 이동 가능(10)
            if (keys.current.down && girlYRef.current < canvas.height - 50) girlYRef.current += girlSpeed;  // -20 숫자를 올리면 위로 이동(-50)

            // 벽돌 그리기
            ctx.font = "16px Arial";
            bricksRef.current.forEach((b, i) => {
                b.x += b.speedX;
                b.y += b.speedY;
                ctx.fillText("🧱", b.x, b.y);

                // 적과 충돌 확인
                enemiesRef.current.forEach((e, j) => {
                    const dx = b.x - e.x, dy = b.y - e.y, dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 20) {
                        enemiesRef.current.splice(j, 1);
                        bricksRef.current.splice(i, 1);
                        scoreRef.current++;
                        setScore(scoreRef.current);
                        if (scoreRef.current >= 50) setGameClear(true);
                    }
                });
            });

            // 적 이동 및 충돌
            ctx.fillStyle = "#f472b6";
            ctx.font = "20px Arial";

            enemiesRef.current.forEach((e, i) => {
                e.x -= e.speed;
                ctx.fillText(e.emoji, e.x, e.y);

                // 브릭걸의 hitbox (가로, 세로)
                const girlTop = girlYRef.current;
                const girlBottom = girlYRef.current + frameHeight * 0.06;
                const girlLeft = girlX;
                const girlRight = girlX + frameWidth * 0.07;

                // 적(enemy)의 hitbox (주로 ±10)
                const enemyTop = e.y - 5;
                const enemyBottom = e.y + 5;
                const enemyLeft = e.x - 5;
                const enemyRight = e.x + 5;

                // AABB 방식 충돌 판정
                const isColliding =
                    girlRight > enemyLeft &&
                    girlLeft < enemyRight &&
                    girlBottom > enemyTop &&
                    girlTop < enemyBottom;

                if (isColliding)
                    setGameOver(true);
                if (e.x < -30) {
                    enemiesRef.current.splice(i, 1);
                    scoreRef.current = Math.max(0, scoreRef.current - 1);
                    setScore(scoreRef.current);
                }
            });

            // 아이템 등장
            if (itemRef.current) {
                // 아이템 그리기
                ctx.font = "20px Arial";
                ctx.fillText("⭐", itemRef.current.x, itemRef.current.y);

                // 아이템과 브릭걸 충돌 체크
                itemRef.current.x -= itemRef.current.speed;
                const girlRight = girlX + frameWidth * scale;
                const girlBottom = girlYRef.current + frameHeight * scale;
                if (
                    itemRef.current.x < girlRight &&            // 아이템이 브릭걸보다 왼쪽으로 들어오고
                    itemRef.current.y > girlYRef.current &&     // 아이템이 브릭걸보다 아래쪽이며
                    itemRef.current.y < girlBottom              // 아이템이 브릭걸보다 위쪽
                ) {
                    // 트리플샷 발동
                    setTripleShot(true);
                    clearTimeout(tripleShotTimerRef.current);
                    tripleShotTimerRef.current = setTimeout(() => setTripleShot(false), 5000);
                    // 아이템 제거
                    itemRef.current = null;
                }
                // 화면 밖으로 나가면 제거
                if (itemRef.current && itemRef.current.x < -20) {
                    itemRef.current = null;
                }
            }

            // 점수 & 트리플샷 표시
            ctx.font = "13px 'Press Start 2P'";
            ctx.fillStyle = "#fbbf24";
            ctx.fillText(`Score: ${scoreRef.current}`, 10, 30);

            if (tripleShot) {
                ctx.fillStyle = "#60a5fa";
                ctx.fillText("🔥Triple Shot!", 150, 30);
            }
            // 반복 호출
            animationRef.current = requestAnimationFrame(draw);
        };

        animationRef.current = requestAnimationFrame(draw);

        // draw();

        const onTouchStart = (e) => {
            if (gameOver || gameClear) {
                // GA 게임 재시작 추적 mobile
                gtag("event", "BG_game_restart_mo", {
                    event_category: "game",
                    event_label: "brickgirl",
                });

                window.location.reload();
                return;
            }

            const touchY = e.touches[0].clientY - canvasRef.current.getBoundingClientRect().top;
            girlYRef.current = Math.min(Math.max(touchY, 20), canvasRef.current.height - 20);

            isTouching.current = true;

            // 인터벌 시작 (기존 인터벌 정리)
            if (shootIntervalRef.current) {
                clearInterval(shootIntervalRef.current);
            }
            fireBricksRef.current(); // 첫 발사
            shootIntervalRef.current = setInterval(() => {
                fireBricksRef.current();
            }, 250);
        };

        const onTouchMove = (e) => {
            const touchY = e.touches[0].clientY - canvas.getBoundingClientRect().top;
            girlYRef.current = Math.min(Math.max(touchY, 0), canvas.height - frameHeight * scale);
        };

        const onTouchEnd = () => {
            isTouching.current = false;
            clearInterval(shootIntervalRef.current);
            shootIntervalRef.current = null;
        };

        // 키보드 이벤트
        window.addEventListener("keydown", (e) => {
            if (["ArrowUp", "ArrowDown", " "].includes(e.key)) {
                e.preventDefault(); // 스크롤 방지
            }

            if (e.key === "ArrowUp") keys.current.up = true;
            if (e.key === "ArrowDown") keys.current.down = true;
            if (e.key === " " && !shootCooldownRef.current && !gameOver) {
                fireBricksRef.current();
            }
            if ((e.key === "r" || e.key === "R") && (gameOver || gameClear)) {
                // GA 게임 재시작 추적 pc
                gtag("event", "BG_game_restart_pc", {
                    event_category: "game",
                    event_label: "brickgirl",
                });
                
                window.location.reload();
            }
        });

        window.addEventListener("keyup", (e) => {
            if (e.key === "ArrowUp") keys.current.up = false;
            if (e.key === "ArrowDown") keys.current.down = false;
        });


        // 이벤트 바인딩
        canvas.addEventListener("touchstart", onTouchStart, { passive: false });
        canvas.addEventListener("touchmove", onTouchMove, { passive: false });
        canvas.addEventListener("touchend", onTouchEnd, { passive: false });

        return () => {
            cancelAnimationFrame(animationRef.current);
            clearInterval(shootIntervalRef.current);
        };
    }, [spriteLoaded, canvasSize, gameOver, gameClear, tripleShot]);


    // 적 등장 간격
    useEffect(() => {
        const interval = setInterval(() => {
            if (!gameOver && !gameClear) {
                const emojis = ["🚀", "👽", "🛸"];
                enemiesRef.current.push({
                    x: canvasSize.width + 20,
                    y: Math.random() * (canvasSize.height - 20) + 10,
                    speed: Math.random() * 1.5 + 1.5,
                    emoji: emojis[Math.floor(Math.random() * emojis.length)],
                });
            }
        }, 1500);
        return () => clearInterval(interval);
    }, [canvasSize, gameOver, gameClear]);

    // 아이템 생성
    useEffect(() => {
        const interval = setInterval(() => {
            if (!gameOver && !gameClear && !itemRef.current) {
                itemRef.current = {
                    x: canvasSize.width + 20,
                    y: Math.random() * (canvasSize.height - 30) + 10,
                    speed: 2,
                };
            }
        }, 10000);
        return () => clearInterval(interval);
    }, [canvasSize, gameOver, gameClear]);

    // 반응형 캔버스
    useEffect(() => {
        const updateSize = () => {
            const width = Math.min(window.innerWidth - 10, 480);
            const height = Math.round(width * 0.75);
            setCanvasSize({ width, height });
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return (
        <div className="flex flex-col items-center mt-6">
            <h2 className="font-press font-bold mb-4 text-rose-400">🧱 Brick Girl: Space Defense 🌠</h2>
            <canvas
                ref={canvasRef}
                width={canvasSize.width}
                height={canvasSize.height}
                className="bg-black rounded shadow-md touch-none"
                style={{ width: "100%", maxWidth: "480px" }}
            />
            <p className="text-xs text-center mt-4 text-gray-500 dark:text-gray-400 font-press">
                ⬆ UP ⬇ DOWN • SPACE BAR 🧱
            </p>
        </div>
    );
}
