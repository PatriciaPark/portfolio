// BrickGirlMazeEscape.jsx
import React, { useRef, useEffect, useState } from 'react';

const TILE_SIZE = 40;
const ROWS = 10;
const COLS = 15;
const INITIAL_TIME = 60;

const createMaze = () => {
    const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(''));
    grid[0][0] = 'S'; // 시작점
    grid[ROWS - 1][COLS - 1] = 'E'; // 출구
    grid[2][2] = 'K';
    grid[3][5] = 'K';
    grid[6][10] = 'K';
    grid[1][1] = 'T';
    grid[4][3] = 'H';
    grid[5][5] = 'B';
    grid[6][6] = 'B';
    grid[0][1] = 'W';
    grid[0][2] = 'W';
    return grid;
};

export default function BrickGirlMazeEscape() {
    const canvasRef = useRef(null);
    const [grid, setGrid] = useState(createMaze);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [keysCollected, setKeysCollected] = useState(0);
    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
    const [gameOver, setGameOver] = useState(false);
    const [gameClear, setGameClear] = useState(false);

    const spriteRef = useRef(null);
    const [spriteLoaded, setSpriteLoaded] = useState(false);
    const frameX = useRef(0);
    const numCols = 3;
    const frameWidth = 335;
    const frameHeight = 512;
    const scale = 0.2;

    useEffect(() => {
        const sprite = new Image();
        sprite.src = process.env.PUBLIC_URL + '/brickgirl_sprite.png';
        sprite.onload = () => setSpriteLoaded(true);
        spriteRef.current = sprite;
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            frameX.current = (frameX.current + 1) % numCols;
        }, 200);
        return () => clearInterval(interval);
    }, []);

    const move = (dx, dy) => {
        if (gameOver || gameClear) return;
        const newX = position.x + dx;
        const newY = position.y + dy;
        if (
            newX < 0 || newY < 0 ||
            newX >= COLS || newY >= ROWS
        ) return;

        const cell = grid[newY][newX];

        const centerX = newX + 0.5;
        const centerY = newY + 0.5;
        const boxX = position.x + 0.5;
        const boxY = position.y + 0.5;
        const distance = Math.sqrt((centerX - boxX) ** 2 + (centerY - boxY) ** 2);

        if (cell === 'W') return;
        if (cell === 'B' && distance < 1.0) grid[newY][newX] = '';
        if (cell === 'K') {
            setKeysCollected(prev => prev + 1);
            grid[newY][newX] = '';
        }
        if (cell === 'T') setTimeLeft(prev => Math.max(0, prev - 10));
        if (cell === 'H') {
            setTimeLeft(prev => prev + 10);
            grid[newY][newX] = '';
        }
        if (cell === 'E') {
            if (keysCollected >= 3) setGameClear(true);
            else return;
        }

        setPosition({ x: newX, y: newY });
        setGrid([...grid]);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp') move(0, -1);
            if (e.key === 'ArrowDown') move(0, 1);
            if (e.key === 'ArrowLeft') move(-1, 0);
            if (e.key === 'ArrowRight') move(1, 0);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [position, grid, keysCollected, gameOver, gameClear]);

    useEffect(() => {
        if (timeLeft <= 0) setGameOver(true);
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, COLS * TILE_SIZE, ROWS * TILE_SIZE);

        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                const cell = grid[y][x];
                let color = 'white';
                if (cell === 'W') color = 'dimgray';
                if (cell === 'B') color = 'saddlebrown';
                if (cell === 'K') color = 'gold';
                if (cell === 'T') color = 'red';
                if (cell === 'H') color = 'skyblue';
                if (cell === 'E') color = 'lime';
                ctx.fillStyle = color;
                ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }

        if (spriteLoaded) {
            ctx.drawImage(
                spriteRef.current,
                frameX.current * frameWidth, 0,
                frameWidth, frameHeight,
                position.x * TILE_SIZE, position.y * TILE_SIZE,
                frameWidth * scale, frameHeight * scale
            );
        } else {
            ctx.fillStyle = 'hotpink';
            ctx.fillRect(position.x * TILE_SIZE, position.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }, [grid, position, spriteLoaded]);

    return (
        <div className="flex flex-col items-center">
            <h2 className="font-press text-rose-400 mb-2">Brick Girl: Maze Escape</h2>
            <canvas
                ref={canvasRef}
                width={COLS * TILE_SIZE}
                height={ROWS * TILE_SIZE}
                className="bg-black rounded shadow-md touch-none"
            />
            <p className="text-white mt-2">⏱ {timeLeft}s | 🔑 {keysCollected}/3</p>
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
    );
}