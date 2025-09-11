import { useEffect, useRef, useState } from "react";

export default function BrickBreaker() {
    const canvasRef = useRef(null);
    const [canvasSize, setCanvasSize] = useState({ width: 400, height: 300 });

    // 게임 설정값 (반응형)
    const paddleWidth = canvasSize.width * 0.25;
    const paddleHeight = canvasSize.height * 0.03;
    const ballRadius = canvasSize.width * 0.025;

    // 벽돌 설정값
    const brickRowCount = 3;
    const brickColumnCount = 6;
    const brickPadding = 10;
    const brickHeight = 20;

    // 점수 및 게임 상태
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameClear, setGameClear] = useState(false);
    const scoreRef = useRef(0);

    // 공 상태 (x, y, 속도)
    const xRef = useRef(canvasSize.width / 2);
    const yRef = useRef(canvasSize.height - 60);
    const dxRef = useRef(2);
    const dyRef = useRef(-2);

    // 패들 상태
    const paddleXRef = useRef((canvasSize.width - paddleWidth) / 2);
    const keys = useRef({ left: false, right: false });
    const animationRef = useRef(null);

    const bricks = useRef([]);

    // 벽돌 초기화
    useEffect(() => {
        const brickWidth = (canvasSize.width - (brickColumnCount + 1) * brickPadding) / brickColumnCount;
        const offsetLeft = (canvasSize.width - (brickColumnCount * brickWidth + (brickColumnCount - 1) * brickPadding)) / 2;

        const newBricks = [];
        for (let c = 0; c < brickColumnCount; c++) {
            newBricks[c] = [];
            for (let r = 0; r < brickRowCount; r++) {
                const brickX = offsetLeft + c * (brickWidth + brickPadding);
                const brickY = 30 + r * (brickHeight + brickPadding);
                newBricks[c][r] = { x: brickX, y: brickY, status: 1 };
            }
        }
        bricks.current = newBricks;
    }, [canvasSize]);

    // 공 그리기 - 기본 스타일
    // const drawBall = (ctx) => {
    //     ctx.beginPath();
    //     ctx.arc(xRef.current, yRef.current, ballRadius, 0, Math.PI * 2);
    //     ctx.fillStyle = "#ff6347";
    //     ctx.fill();
    //     ctx.closePath();
    // };

    // 공 그리기 - 이모지 스타일
    const drawBall = (ctx) => {
        ctx.font = `${ballRadius * 2}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("🐣", xRef.current, yRef.current);
    };

    // 패들 그리기 - 기본
    const drawPaddle = (ctx) => {
        ctx.beginPath();
        ctx.rect(
            paddleXRef.current,
            canvasSize.height - paddleHeight,
            paddleWidth,
            paddleHeight
        );
        ctx.fillStyle = "#fbbf24";   // amber
        ctx.fill();
        ctx.closePath();
    };

    // 패들 그리기 - 무지개
    // const drawPaddle = (ctx) => {
    //     const paddleX = paddleXRef.current;

    //     const gradient = ctx.createLinearGradient(paddleX, canvasRef.current.height - paddleHeight, paddleX + paddleWidth, canvasRef.current.height);
    //     gradient.addColorStop(0, "#ff0000");   // 빨강
    //     gradient.addColorStop(0.17, "#ffa500"); // 주황
    //     gradient.addColorStop(0.34, "#ffff00"); // 노랑
    //     gradient.addColorStop(0.51, "#00ff00"); // 초록
    //     gradient.addColorStop(0.68, "#0000ff"); // 파랑
    //     gradient.addColorStop(0.85, "#4b0082"); // 남색
    //     gradient.addColorStop(1, "#ee82ee");   // 보라

    //     ctx.beginPath();
    //     ctx.rect(paddleX, canvasRef.current.height - paddleHeight, paddleWidth, paddleHeight);
    //     ctx.fillStyle = gradient;
    //     ctx.fill();
    //     ctx.closePath();
    // };


    // 벽돌 그리기 및 남은 벽돌 수 체크
    const drawBricks = (ctx) => {
        let remainingBricks = 0;
        bricks.current.forEach((column) => {
            column.forEach((b) => {
                if (b.status === 1) {
                    remainingBricks++;
                    ctx.beginPath();
                    ctx.fillStyle = "#b91c1c";
                    ctx.fillRect(b.x, b.y, (canvasSize.width - (brickColumnCount + 1) * brickPadding) / brickColumnCount, brickHeight);
                    ctx.closePath();

                    // 기본 벽돌 스타일(색상)
                    //   ctx.beginPath();
                    //   ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    //   ctx.fillStyle = "#fbbf24";
                    //   ctx.fill();
                    //   ctx.closePath();

                    // 🧱 이모지 스타일
                    //   ctx.font = "24px Arial";
                    //   ctx.textAlign = "center";
                    //   ctx.textBaseline = "middle";
                    //   ctx.fillText("🧱", brickX + brickWidth / 2, brickY + brickHeight / 2);

                    // 구멍난 벽돌
                    for (let i = 0; i < 3; i++) {
                        ctx.beginPath();
                        ctx.arc(
                            b.x + ((canvasSize.width - (brickColumnCount + 1) * brickPadding) / brickColumnCount) * (0.2 + i * 0.3),
                            b.y + brickHeight * 0.5,
                            brickHeight * 0.2,
                            0,
                            Math.PI * 2
                        );
                        ctx.fillStyle = "#1f1f1f";
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            });
        });

        // 모든 벽돌 제거 시 클리어 처리
        if (remainingBricks === 0 && !gameClear) {
            setGameClear(true);
        }
    };

    // 게임 화면 안 메시지 박스
    const drawEndMessage = (ctx, message) => {
        const centerX = canvasRef.current.width / 2;
        const centerY = canvasRef.current.height / 2;

        ctx.font = "16px 'Press Start 2P'";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(message, centerX, centerY - 20);

        // 버튼 클릭 메시지
        ctx.font = "13px 'Press Start 2P'";
        ctx.fillStyle = "#818cf8";
        ctx.fillText("Tap or Press R to Restart", centerX, centerY + 20);
    };

    // 공과 벽돌 충돌 감지
    const collisionDetection = () => {
        const brickWidth = (canvasSize.width - (brickColumnCount + 1) * brickPadding) / brickColumnCount;
        bricks.current.forEach((column) => {
            column.forEach((b) => {
                if (b.status === 1) {
                    if (
                        xRef.current > b.x &&
                        xRef.current < b.x + brickWidth &&
                        yRef.current > b.y &&
                        yRef.current < b.y + brickHeight
                    ) { // 공 속도가 매 충돌마다 5%씩 빨라짐 + 최대 속도 제한
                        const speedFactor = 1.05;
                        const maxSpeed = 10;

                        dxRef.current = Math.max(-maxSpeed, Math.min(maxSpeed, dxRef.current * speedFactor));
                        dyRef.current = Math.max(-maxSpeed, Math.min(maxSpeed, dyRef.current * -speedFactor));

                        b.status = 0;
                        scoreRef.current++;
                        setScore(scoreRef.current);
                    }
                }
            });
        });
    };

    // 키보드 이벤트 핸들러
    const handleRestart = () => {
        // GA 리스타트 추적
        // if (window.gtag) {
        //     window.gtag('event', 'BB_game_restart', {
        //         event_category: 'Game',
        //         event_label: 'BrickBreaker'
        //     });
        // }

        window.location.reload();
    }
    const keyDownHandler = (e) => {
        if (e.key === "Right" || e.key === "ArrowRight") keys.current.right = true;
        else if (e.key === "Left" || e.key === "ArrowLeft") keys.current.left = true;
        else if (e.key === "r" || e.key === "R") handleRestart();
    };

    const keyUpHandler = (e) => {
        if (e.key === "Right" || e.key === "ArrowRight") keys.current.right = false;
        else if (e.key === "Left" || e.key === "ArrowLeft") keys.current.left = false;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        document.addEventListener("keydown", keyDownHandler);
        document.addEventListener("keyup", keyUpHandler);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBricks(ctx);
            drawBall(ctx);
            drawPaddle(ctx);
            collisionDetection();

            // 종료 메시지
            if (gameOver) {
                drawEndMessage(ctx, "😢 GAME OVER");
                cancelAnimationFrame(animationRef.current);
                return;
            }
            if (gameClear) {
                // GA 게임 클리어 추적
                // if (window.gtag) {
                //     window.gtag('event', 'BB_game_clear', {
                //         event_category: 'Game',
                //         event_label: 'BrickBreaker'
                //     });
                // }

                // 클리어 메시지
                drawEndMessage(ctx, "🎉 CLEAR!!");
                cancelAnimationFrame(animationRef.current);
                return;
            }

            // 벽 충돌 처리
            const nextX = xRef.current + dxRef.current;
            const nextY = yRef.current + dyRef.current;

            if (nextX + ballRadius > canvas.width || nextX - ballRadius < 0) {
                dxRef.current = -dxRef.current;
            }
            if (nextY - ballRadius < 0) {
                dyRef.current = -dyRef.current;
            }

            // 바닥 충돌 + 패들 반사 처리
            if (nextY + ballRadius > canvas.height) {
                if (
                    xRef.current > paddleXRef.current &&
                    xRef.current < paddleXRef.current + paddleWidth
                ) {
                    dyRef.current = -dyRef.current;
                } else {
                    setGameOver(true);
                    return;
                }
            }

            // 키 입력에 따른 패들 이동
            if (keys.current.right && paddleXRef.current < canvas.width - paddleWidth) {
                paddleXRef.current += 5;
            } else if (keys.current.left && paddleXRef.current > 0) {
                paddleXRef.current -= 5;
            }

            // 공 이동
            xRef.current += dxRef.current;
            yRef.current += dyRef.current;

            animationRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
            document.removeEventListener("keyup", keyUpHandler);
            cancelAnimationFrame(animationRef.current);
        };
    }, [gameOver, gameClear, canvasSize, paddleWidth]);

    // 반응형 화면 추가
    useEffect(() => {
        const updateSize = () => {
            const screenWidth = window.innerWidth;
            const width = Math.min(screenWidth - 10, 480);
            const height = Math.round(width * 0.75);
            setCanvasSize({ width, height });
        };
        updateSize();   // 처음 실행
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    // 모바일 화면 터치
    useEffect(() => {
        const canvas = canvasRef.current;
        const handleTouchMove = (e) => {
            const touchX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
            paddleXRef.current = Math.min(
                Math.max(touchX - paddleWidth / 2, 0),
                canvas.width - paddleWidth
            );
        };
        canvas.addEventListener("touchmove", handleTouchMove);
        return () => canvas.removeEventListener("touchmove", handleTouchMove);
    }, [paddleWidth]);

    // 터치 or 클릭 시 해당 위치 누르면 restart
    useEffect(() => {
        const canvas = canvasRef.current;

        const handleClick = (e) => {
            if (!gameOver && !gameClear) return;

            const rect = canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2 + 20;

            const textWidth = 150;
            const textHeight = 30;

            if (
                clickX > centerX - textWidth / 2 &&
                clickX < centerX + textWidth / 2 &&
                clickY > centerY - textHeight / 2 &&
                clickY < centerY + textHeight / 2
            ) {
                window.location.reload();
            }
        };

        canvas.addEventListener("click", handleClick);
        canvas.addEventListener("touchstart", handleClick);

        return () => {
            canvas.removeEventListener("click", handleClick);
            canvas.removeEventListener("touchstart", handleClick);
        };
    }, [gameOver, gameClear]);

    return (
        <div className="mt-8 flex flex-col items-center">
            <h2 className="font-press font-bold mb-4 text-rose-400">🧱Brick Breaker🧱</h2>
            <canvas
                ref={canvasRef}
                width={canvasSize.width}
                height={canvasSize.height}
                className="bg-black rounded shadow-md w-full max-w-none touch-none"
                style={{ width: '100%', maxWidth: "480px", display: 'block' }}
            />
            <p className="text-xs text-center mt-4 text-gray-500 dark:text-gray-400 font-press">
                ⬅ LEFT • RIGHT ➡ 
            </p>
        </div>
    );
}

