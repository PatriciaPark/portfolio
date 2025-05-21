import { Howl } from 'howler';

const base = process.env.PUBLIC_URL || window.location.origin;

// 사운드 정의
const sounds = {
    bgm: new Howl({ src: [base + '/sfx/bgm.mp3'], volume: 0.4, loop: true, rate: 0.5 }),
    hit: new Howl({ src: [base + '/sfx/hit.mp3'], volume: 0.7 }),
    coin: new Howl({ src: [base + '/sfx/coin.mp3'], volume: 0.4 }),
    super: new Howl({ src: [base + '/sfx/super.mp3'], volume: 0.6 }),
    defeat: new Howl({ src: [base + '/sfx/defeat.mp3'], volume: 0.5 }),
    deploy: new Howl({ src: [base + '/sfx/deploy.mp3'], volume: 0.7 }),
    victory: new Howl({ src: [base + '/sfx/victory.mp3'], volume: 0.5 }),
    jumpcoin: new Howl({ src: [base + '/sfx/jumpcoin.mp3'], volume: 0.4 }),
};

// 유틸 함수: 이름으로 재생
export function playSound(name) {
    const sound = sounds[name];
    if (sound) {
        sound.play();
    } else {
        console.warn(`🚫 Sound "${name}" not found.`);
    }
}

// 유틸 함수: BGM 정지
export function stopBGM() {
    sounds.bgm.stop();
}

// 필요시 개별 접근도 허용
export { sounds };