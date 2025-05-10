import React, { useRef, useEffect, useState } from 'react';

const BrickGirlRT = () => {
    const canvasRef = useRef(null);
    const spriteRef = useRef(null); // 스프라이트 이미지 객체
    const [canvasSize] = useState({ width: 800, height: 400 }); // 실제 해상도 기준
    const [spriteLoaded, setSpriteLoaded] = useState(false);

    // 스프라이트 설정
    const frameWidth = 335;
    const frameHeight = 512;
    const numCols = 3;
    const scale = 0.2;
    const frameX = useRef(0);
    const frameY = useRef(0);
    const frameCount = useRef(0);

    // 브릭걸 위치 및 점프 관련 변수
    const girlX = useRef(50);
    const girlY = useRef(0);
    const velocityY = useRef(0);
    const gravity = 0.6;
    const jumpCount = useRef(0);
    const maxJumps = 2;

    // 벽돌 배열
    const bricks = useRef([]);

    // 지형 관련 변수
    const scrollSpeed = 2;
    const tileSize = 50;
    const groundTiles = useRef([]);
    const levelData = [
        { x: 0, y: 350 }, { x: 50, y: 350 }, { x: 100, y: 350 },
        { x: 150, y: 350 }, { x: 200, y: 350 },
        { x: 250, y: 350 }, { x: 350, y: 350 },
        { x: 400, y: 350 },
        { x: 500, y: 300 }, { x: 550, y: 300 },
        { x: 600, y: 250 }, { x: 650, y: 250 },
        { x: 700, y: 200 }, { x: 750, y: 200 },
    ];

    useEffect(() => {
        // 초기 지형 설정
        groundTiles.current = levelData.map(tile => ({ ...tile, type: 'ground' }));

        // 스프라이트 이미지 로드
        spriteRef.current = new Image();
        spriteRef.current.src = process.env.PUBLIC_URL + '/brickgirl_sprite.png';
        spriteRef.current.onload = () => {
            setSpriteLoaded(true);
            // 최초 위치를 지형 위에 맞추기
            const tile = groundTiles.current.find(tile =>
                girlX.current + (frameWidth * scale) / 2 > tile.x &&
                girlX.current + (frameWidth * scale) / 2 < tile.x + tileSize
            );
            if (tile) {
                girlY.current = tile.y - frameHeight * scale - 4;
            }
        };
    }, []);

    // 점프 가능 여부 판단
    const isOnGround = () => {
        const feetXLeft = girlX.current + 10;
        const feetXRight = girlX.current + frameWidth * scale - 10;
        const feetY = girlY.current + frameHeight * scale;

        return groundTiles.current.some(tile => {
            const isWithinX = feetXRight > tile.x && feetXLeft < tile.x + tileSize;
            const isTouchingY = feetY >= tile.y && feetY <= tile.y + 5;
            const isFalling = velocityY.current >= 0;
            return isWithinX && isTouchingY && isFalling;
        });
    };

    // 벽돌 던지기
    const throwBrick = () => {
        const startX = girlX.current + 30;
        const startY = girlY.current + 10;
        const vx = 6 + Math.random();
        const vy = -8;
        bricks.current.push({ x: startX, y: startY, vx, vy });
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                throwBrick();
            } else if (e.code === 'ArrowUp') {
                if (jumpCount.current < maxJumps) {
                    velocityY.current = -12 * (jumpCount.current === 1 ? 1.2 : 1);
                    jumpCount.current++;
                }
            }
        };

        const handleTouchStart = (e) => {
            e.preventDefault();
            const touchX = e.touches[0].clientX;
            if (touchX < canvas.width / 2) {
                if (jumpCount.current < maxJumps) {
                    velocityY.current = -12;
                    jumpCount.current++;
                }
            } else {
                throwBrick();
            }
        };

        const updateFrame = () => {
            frameCount.current++;
            if (frameCount.current % 10 === 0) {
                frameX.current = (frameX.current + 1) % numCols;
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 지형 렌더링 및 스크롤
            groundTiles.current.forEach(tile => {
                tile.x -= scrollSpeed;
                ctx.fillStyle = 'saddlebrown';
                ctx.fillRect(tile.x, tile.y, tileSize, tileSize);
            });

            // 스크롤 타일 추가
            const lastTile = groundTiles.current[groundTiles.current.length - 1];
            if (lastTile && lastTile.x < canvas.width) {
                groundTiles.current.push({ x: lastTile.x + tileSize, y: 350, type: 'ground' });
            }

            // 중력 및 점프 처리
            const onGround = isOnGround();
            if (onGround && velocityY.current >= 0) {
                velocityY.current = 0;
                jumpCount.current = 0;
                const landingTile = groundTiles.current.find(tile =>
                    girlX.current + (frameWidth * scale) / 2 > tile.x &&
                    girlX.current + (frameWidth * scale) / 2 < tile.x + tileSize
                );
                if (landingTile) {
                    girlY.current = landingTile.y - frameHeight * scale;
                }
            } else {
                velocityY.current += gravity;
                girlY.current += velocityY.current;
                const floorY = canvas.height - frameHeight * scale;
                if (girlY.current > floorY) {
                    velocityY.current = 0;
                    girlY.current = floorY;
                    jumpCount.current = 0;
                }
            }

            // 벽돌 이동 및 렌더링
            ctx.font = '16px Arial';
            bricks.current.forEach(brick => {
                brick.x += brick.vx;
                brick.vy += gravity * 0.5;
                brick.y += brick.vy;
                ctx.fillText('🧱', brick.x, brick.y);
            });
            bricks.current = bricks.current.filter(brick => brick.x <= canvas.width && brick.y <= canvas.height);

            // 스프라이트 그리기
            if (spriteLoaded) {
                updateFrame();
                ctx.drawImage(
                    spriteRef.current,
                    frameX.current * frameWidth,
                    frameY.current * frameHeight,
                    frameWidth,
                    frameHeight,
                    girlX.current,
                    girlY.current,
                    frameWidth * scale,
                    frameHeight * scale
                );
            } else {
                ctx.fillStyle = 'hotpink';
                ctx.fillRect(girlX.current, girlY.current, 30, 30);
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        // 초기화 및 이벤트 등록
        window.addEventListener('keydown', handleKeyDown);
        canvas.addEventListener('touchstart', handleTouchStart);
        draw();

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            canvas.removeEventListener('touchstart', handleTouchStart);
            cancelAnimationFrame(animationFrameId);
        };
    }, [spriteLoaded]);

    return (
        <div className="flex flex-col items-center mt-6">
            <h2 className="font-press font-bold mb-4 text-rose-400">Brick Girl: Run & Throw</h2>
            <canvas
                ref={canvasRef}
                width={canvasSize.width}
                height={canvasSize.height}
                className="bg-black rounded shadow-md touch-none"
                style={{ width: '100%', maxWidth: '480px' }}
            />
            <p className="text-xs text-center mt-4 text-gray-500 dark:text-gray-400 font-press">
                ⬆️: Jump / Space: 🧱
            </p>
        </div>
    );
};

export default BrickGirlRT;
