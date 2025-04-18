import { useEffect, useRef, useState } from "react";

export default function BrickBreaker() {
    const canvasRef = useRef(null);

    // 게임 설정값들
    const canvasWidth = 400;
    const canvasHeight = 300;
    const ballRadius = 10;

    // 점수 및 게임 상태
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameClear, setGameClear] = useState(false);
    const scoreRef = useRef(0);

    // 공 상태 (x, y, 속도)
    const xRef = useRef(canvasWidth / 2);
    const yRef = useRef(canvasHeight - 60);
    const dxRef = useRef(2);
    const dyRef = useRef(-2);

    // 패들 상태
    const paddleHeight = 10;
    const paddleWidth = 75;
    const paddleXRef = useRef((canvasWidth - paddleWidth) / 2);
    const keys = useRef({ left: false, right: false });
    const animationRef = useRef(null);

    // 벽돌 설정값
    const brickRowCount = 3;
    const brickColumnCount = 6;
    const brickWidth = 50;
    const brickHeight = 20;
    const brickPadding = 10;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 25;

    // 벽돌 배열 초기화
    const bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }

    // 공 그리기
    const drawBall = (ctx) => {
        ctx.beginPath();
        ctx.arc(xRef.current, yRef.current, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#ff6347";
        ctx.fill();
        ctx.closePath();
    };

    // 패들 그리기
    const drawPaddle = (ctx) => {
        ctx.beginPath();
        ctx.rect(paddleXRef.current, canvasHeight - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    };

    // 벽돌 그리기 및 남은 벽돌 수 체크
    const drawBricks = (ctx) => {
        let remainingBricks = 0;
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                const b = bricks[c][r];
                if (b.status === 1) {
                    remainingBricks++;
                    const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                    const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                    b.x = brickX;
                    b.y = brickY;

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
                    // 벽돌 기본 사각형
                    ctx.beginPath();
                    ctx.fillStyle = "#b91c1c";
                    ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
                    ctx.closePath();

                    // 벽돌 구멍 3개
                    const holeCount = 3;
                    for (let i = 0; i < holeCount; i++) {
                        ctx.beginPath();
                        ctx.arc(
                            brickX + brickWidth * (0.2 + i * 0.3), // 0.2, 0.5, 0.8 위치
                            brickY + brickHeight * 0.5,
                            brickHeight * 0.2,
                            0,
                            Math.PI * 2
                        );
                        ctx.fillStyle = "#1f1f1f"; // 구멍 색
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        }
        // 모든 벽돌 제거 시 클리어 처리
        if (remainingBricks === 0 && !gameClear) {
            setGameClear(true);
        }
    };

    // 점수 그리기
    // const drawScore = (ctx) => {
    //     ctx.font = "14px Arial";
    //     ctx.fillStyle = "#ffffff";
    //     ctx.fillText(`Score: ${scoreRef.current}`, 8, 20);
    // };

    // 게임 화면 안 메시지 박스
    const drawEndMessage = (ctx, message) => {
        ctx.font = "24px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(message, canvasWidth / 2, canvasHeight / 2);

        // Restart 버튼 텍스트 안내
        ctx.font = "14px Arial";
        ctx.fillText("Press R to Restart", canvasWidth / 2, canvasHeight / 2 + 30);
    };

    // 공과 벽돌 충돌 감지
    const collisionDetection = () => {
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                const b = bricks[c][r];
                if (b.status === 1) {
                    if (
                        xRef.current > b.x &&
                        xRef.current < b.x + brickWidth &&
                        yRef.current > b.y &&
                        yRef.current < b.y + brickHeight
                    ) {
                        dyRef.current = -dyRef.current;
                        b.status = 0;
                        scoreRef.current += 1;
                        setScore(scoreRef.current);
                    }
                }
            }
        }
    };

    // 키보드 이벤트 핸들러
    const keyDownHandler = (e) => {
        if (e.key === "Right" || e.key === "ArrowRight") keys.current.right = true;
        else if (e.key === "Left" || e.key === "ArrowLeft") keys.current.left = true;
        else if (e.key === "r" || e.key === "R") handleRestart();
    };

    const keyUpHandler = (e) => {
        if (e.key === "Right" || e.key === "ArrowRight") keys.current.right = false;
        else if (e.key === "Left" || e.key === "ArrowLeft") keys.current.left = false;
    };

    // 리스타트 버튼 클릭시 새로고침
    const handleRestart = () => {
        window.location.reload();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        document.addEventListener("keydown", keyDownHandler);
        document.addEventListener("keyup", keyUpHandler);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // drawScore(ctx);
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
                drawEndMessage(ctx, "🎉 CLEAR!!");
                cancelAnimationFrame(animationRef.current);
                return;
            }

            // 벽 충돌 처리
            if (
                xRef.current + dxRef.current > canvasWidth - ballRadius ||
                xRef.current + dxRef.current < ballRadius
            ) dxRef.current = -dxRef.current;
            if (yRef.current + dyRef.current < ballRadius) dyRef.current = -dyRef.current;
            // 바닥 충돌 처리 (게임 오버)
            else if (yRef.current + dyRef.current > canvasHeight - ballRadius) {
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
            if (keys.current.right && paddleXRef.current < canvasWidth - paddleWidth)
                paddleXRef.current += 5;
            else if (keys.current.left && paddleXRef.current > 0)
                paddleXRef.current -= 5;

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
    }, [gameOver, gameClear]);

    return (
        <div className="mt-8 flex flex-col items-center">
            <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                className="bg-black rounded shadow-md"
            />
        </div>
    );
}
