import React, { useRef, useEffect, useState } from 'react';

const BrickGirlRT = () => {
  const canvasRef = useRef(null);
  const spriteRef = useRef(null);
  const [spriteLoaded, setSpriteLoaded] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // 스프라이트 관련 설정
  const frameWidth = 335;
  const frameHeight = 512;
  const scale = 0.2;
  const numCols = 3;
  const frameX = useRef(0);
  const frameCount = useRef(0);

  // 캐릭터 위치 및 상태
  const girlWorldX = useRef(0); // 실제 월드 상 위치
  const girlTargetScreenX = 150; // 화면 중앙 고정값
  const girlY = useRef(0);
  const velocityY = useRef(0);
  const gravity = 0.6;
  const maxFallSpeed = 15;
  const jumpCount = useRef(0);
  const maxJumps = 2;
  const girlSpeed = useRef(2);

  // 카메라 및 게임 상태
  const cameraX = useRef(0);
  const stuckFrames = useRef(0);
  const wasOnGround = useRef(true);

  // 지형 데이터
  const tileSize = 50;
  const levelData = [
    { x: 0, y: 350 }, { x: 50, y: 350 }, { x: 100, y: 350 },
    { x: 150, y: 350 }, { x: 200, y: 350 }, { x: 250, y: 350 },
    { x: 300, y: 300 }, { x: 350, y: 300 }, { x: 400, y: 250 },
    { x: 450, y: 250 }, { x: 500, y: 200 }, { x: 550, y: 200 }
  ];
  const groundTiles = useRef([]);
  const nextTileIndex = useRef(levelData.length);

  // 착지 여부 확인
  const isOnGround = () => {
    const left = girlWorldX.current + 20;
    const right = girlWorldX.current + frameWidth * scale - 20;
    const feetY = girlY.current + frameHeight * scale;
    return groundTiles.current.some(tile => {
      const withinX = right > tile.x && left < tile.x + tileSize;
      const nextY = feetY + velocityY.current;
      const touching = (feetY < tile.y && nextY >= tile.y) || (feetY >= tile.y && feetY <= tile.y + 20);
      return withinX && touching && velocityY.current >= 0;
    });
  };

  // 수평 벽 충돌 체크
  const isBlockedHorizontally = () => {
    const charRight = girlWorldX.current + frameWidth * scale;
    const charLeft = girlWorldX.current;
    const charTop = girlY.current;
    const charBottom = girlY.current + frameHeight * scale;
    const nextCharRight = charRight + girlSpeed.current;

    return groundTiles.current.some(tile => {
      const tileLeft = tile.x;
      const tileRight = tile.x + tileSize;
      const tileTop = tile.y;
      const tileBottom = tile.y + tileSize;

      const horizontalTouch = nextCharRight > tileLeft && charLeft < tileRight;
      const verticalOverlap = charBottom > tileTop && charTop < tileBottom;

      return horizontalTouch && verticalOverlap;
    });
  };

  // 낙하 중 앞이 '공중'인지 확인
  const isAirAhead = () => {
    const aheadX = girlWorldX.current + frameWidth * scale + 2;
    const feetY = girlY.current + frameHeight * scale + 1;

    return !groundTiles.current.some(tile => {
      return (
        aheadX > tile.x &&
        aheadX < tile.x + tileSize &&
        feetY >= tile.y &&
        feetY <= tile.y + tileSize
      );
    });
  };

  useEffect(() => {
    // 초기화
    groundTiles.current = levelData.map(t => ({ ...t }));
    spriteRef.current = new Image();
    spriteRef.current.src = process.env.PUBLIC_URL + '/brickgirl_sprite.png';
    spriteRef.current.onload = () => {
      setSpriteLoaded(true);
      const firstTile = groundTiles.current[0];
      girlY.current = firstTile.y - frameHeight * scale - 4;
      girlWorldX.current = girlTargetScreenX;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;

    const handleKey = e => {
      if (e.code === 'ArrowUp' && jumpCount.current < maxJumps) {
        velocityY.current = -12 * (jumpCount.current === 1 ? 1.2 : 1);
        jumpCount.current++;
      }
    };
    window.addEventListener('keydown', handleKey);

    const updateFrame = () => {
      if (++frameCount.current % 10 === 0) frameX.current = (frameX.current + 1) % numCols;
    };

    const draw = () => {
      if (!spriteLoaded) {
        raf = requestAnimationFrame(draw);
        return;
      }

      if (gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'red';
        ctx.font = '48px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 120, canvas.height / 2);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 카메라 스크롤 처리
      cameraX.current = girlWorldX.current - girlTargetScreenX;

      // 스크롤용 지형 타일 추가
      const last = groundTiles.current[groundTiles.current.length - 1];
      if (last.x - cameraX.current < canvas.width) {
        const d = levelData[nextTileIndex.current % levelData.length];
        groundTiles.current.push({ x: last.x + tileSize, y: d.y });
        nextTileIndex.current++;
      }

      // 지형 그리기
      groundTiles.current.forEach(t => {
        const screenX = t.x - cameraX.current;
        ctx.fillStyle = 'saddlebrown';
        ctx.fillRect(screenX, t.y, tileSize, tileSize);
      });

      // 착지 상태 확인
      const onGround = isOnGround();

      if (onGround) {
        // 벽 충돌 체크
        if (isBlockedHorizontally()) {
          girlSpeed.current = 0;
          stuckFrames.current++;
        } else {
          girlSpeed.current = 4;
          stuckFrames.current = 0;
          girlWorldX.current += girlSpeed.current;
        }

        // 착지 위치 보정
        const left = girlWorldX.current + 20;
        const right = girlWorldX.current + frameWidth * scale - 20;
        const land = groundTiles.current.find(t => right > t.x && left < t.x + tileSize);
        if (land) {
          girlY.current = land.y - frameHeight * scale - 4;
          velocityY.current = 0;
          jumpCount.current = 0;
        }

      } else {
        // ✅ 낙하 중일 때는 벽 무시하고 '앞이 공중일 때만' 전진
        if (isAirAhead()) {
          girlWorldX.current += 2.0; // 낙하 중 수평 속도
        }

        velocityY.current = Math.min(velocityY.current + gravity, maxFallSpeed);
        girlY.current += velocityY.current;

        if (girlY.current > canvas.height) {
          setGameOver(true);
          return;
        }
      }

      // 이전 프레임 착지 상태 저장
      wasOnGround.current = onGround;

      // 좌측 벽 충돌 시 게임 오버
      const girlScreenX = girlWorldX.current - cameraX.current;
      if (isBlockedHorizontally() && girlScreenX <= 0) {
        setGameOver(true);
        return;
      }

      // 캐릭터 그리기
      updateFrame();
      ctx.drawImage(
        spriteRef.current,
        frameX.current * frameWidth,
        0,
        frameWidth,
        frameHeight,
        girlScreenX,
        girlY.current,
        frameWidth * scale,
        frameHeight * scale
      );

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', handleKey);
    };
  }, [spriteLoaded, gameOver]);

  return (
    <div className="flex flex-col items-center mt-6">
      <h2 className="font-press font-bold mb-4 text-rose-400">Brick Girl: Run & Throw</h2>
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="bg-black rounded shadow-md touch-none"
      />
      {gameOver && <p className="text-lg text-red-500 mt-2">게임 오버! 새로 고침하세요.</p>}
      <p className="text-xs text-center mt-4 text-gray-500 font-press">⬆️: Jump</p>
    </div>
  );
};

export default BrickGirlRT;
