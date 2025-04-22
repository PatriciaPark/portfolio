import React from "react";
import { Parallax } from 'react-scroll-parallax';
import { useLanguage } from "../context/LanguageContext";
import mj01 from "../assets/images/mj01.png";
import mj02 from "../assets/images/mj02.png";
import mj03 from "../assets/images/mj03.png";
import mj04 from "../assets/images/mj04.png";
import mj05 from "../assets/images/mj05.png";

const Introduce = () => {
    const { language } = useLanguage();

    const images = [mj01, mj02, mj03, mj04, mj05];

    const sections = [
        {
            img: images[0],
            text: {
                en: `When I was younger, I wanted to become an astronomer.

                Not just any astronomer, I wanted to be like 'Ellie' from the movie [Contact(1997)]. I dreamed of decoding signals from space and traveling through wormholes. That dream led me to major in Astronomy and Space Science at Sejong University. But as time passed, 
                
                I started to question: could I really live a life like Ellie’s?`,
                ko: `어릴 적, 천문학자라는 꿈을 가지게 되었습니다.

                그냥 천문학자가 아니라, 영화 [콘택트(1997)] 속 '엘리'처럼 되고 싶었습니다. 외계에서 오는 신호를 해독하고, 우주를 여행하는 그런 삶. 꿈을 안고 천문우주학과에 진학했지만, 시간이 흐를수록 의문이 생겼습니다.
                
                '과연 나도 영화 속 엘리처럼 살 수 있을까?'`,
            },
        },
        {
            img: images[1],
            text: {
                en: `So I took a small detour. I picked up Japanese as a second major, and then headed to China to study Chinese. I wanted to see more of the world and test my limits. I studied business in Shanghai, passed the HSK Level 5 exam, and learned how to survive on my own in a new culture.
                
                It was hard, but it made me strong.`,
                ko: `그래서 취미로 했던 일본어를 복수전공으로 공부하며 인생의 선택 폭을 한 단계 넓혔습니다. Contact의 주인공 엘리처럼 멋진 천문학자로 사는 삶은 아니지만, 그녀처럼 꿈을 좇는 것을 멈추지 않고 싶었기 때문입니다. 그러다 중국으로 유학을 떠나 중국어를 배웠습니다. 더 넓은 세상을 보고 내 한계를 시험해보고 싶었거든요. 상하이에서 비즈니스를 공부하며 HSK 5급도 따고, 낯선 문화 속에서 홀로 살아가는 법도 배웠습니다.
                
                쉽진 않았지만, 이 경험은 ‘하면 된다’는 말의 진정한 의미를 깨닫게 해주었고, 제 삶에 큰 영향을 주었습니다.`,
            },
        },
        {
            img: images[2],
            text: {
                en: `Back in Korea, I stumbled into a course on Astronomical Image Processing, where I encountered C programming for the first time. It felt like discovering a new universe. Numbers turning into images, lines of code becoming stars — I was fascinated. 
                
                That summer, I stayed up late in the university lab, learning how to code with a sense of curiosity I hadn’t felt in a long time.`,
                ko: `한국에 돌아와 우연히 들은 '천문 이미지 처리' 수업에서 처음으로 C 언어를 접하게 되었습니다. 마치 새로운 우주를 발견한 듯한 기분. 숫자가 이미지로, 코드가 별이 되는 그 마법에 나는 빠져들었습니다. 
                
                그 여름, 나는 학교 연구실에서 밤을 지새우며 오랜만에 느낀 진짜 호기심으로 코딩을 배워갔습니다.`,
            },
        },
        {
            img: images[3],
            text: {
                en: `That curiosity became conviction. 
                I joined a Java development course, studied Android development, and soon found myself writing software instead of observing the stars. Since then, I’ve worked in different countries-Korea, China, Taiwan-building data systems, mobile apps, dashboards, and even 3D visualization tools for scientific research. I learned how to manage teams, lead projects, and talk to both developers and non-developers alike.`,
                ko: `그 호기심은 곧 확신이 되었습니다. 
                자바 개발 과정을 수강하고 안드로이드 개발도 공부하며, 나는 별을 관측하던 사람이 아니라, 무언가를 만드는 사람이 되어 있었죠. 그 이후로 한국, 중국, 대만 등 여러 나라에서 일하며 데이터 시스템, 모바일 앱, 대시보드, 과학 연구를 위한 3D 시각화 도구까지 만들어왔습니다. 팀을 이끌고, 기획자와 개발자 사이에서 조율하며 커뮤니케이션 역량도 갖추게 되었습니다.`,
            },
        },
        {
            img: images[4],
            text: {
                en: `I’ve been a full-time employee, a freelancer, a mentor, and a solo creator. From somewhere in the middle of this long journey, my son has been by my side, and now we live together in Canada. I still deeply love what I do, but I also enjoy writing essays, creating pixel-art games, and imagining new worlds. My path has never been a straight line, but I believe that’s what has added more color to who I am.
                
                And I still dream — not of decoding signals from space anymore, but of building things that mean something, even if it’s just for one person.`,
                ko: `저는 정규직도, 프리랜서도, 멘토도, 1인 창작자도 되어봤습니다. 저의 이 긴 여정의 중간쯤부터 아들이 함께 하고 있었고, 지금은 아들과 함께 캐나다에서 살고 있습니다. 여전히 저의 일을 너무나 좋아하지만, 에세이를 쓰고, 도트 게임을 만들고, 새로운 세계를 상상하는 일도 좋아합니다. 저의 길은 결코 일직선이 아니었지만, 그 덕분에 더 많은 색을 가진 사람이 되었다고 생각합니다.

                이제는 더 이상 우주의 신호를 해독하진 않지만, 누군가의 마음에 닿을 수 있는 무언가를 만들고 싶습니다. 비록 단 한 사람을 위한 것이라도.`,
            },
        },
    ];

    return (
        <div className="my-journey px-4 py-12 max-w-4xl mx-auto">
            {sections.map((section, index) => (
                <Parallax key={index} speed={8}>
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                        <img
                            src={section.img}
                            alt={`journey-${index + 1}`}
                            className="w-full max-w-xs md:w-[40%] rounded-xl object-contain"
                        />
                        <div className="md:w-[60%] whitespace-pre-line leading-relaxed text-gray-800 dark:text-gray-100">
                            {language === "ko" ? section.text.ko : section.text.en}
                        </div>
                    </div>
                </Parallax>
            ))}

<div className="bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-md mx-auto border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-rose-400 text-center">
            {language === "en"
            ? "More About Me"
            : "연 락 처"}</h2>
            <ul className="space-y-2 text-sm text-left">
              <li>
                <a
                  href="mailto:pyjee8@gmail.com"
                  className="text-lime-400 hover:underline break-words"
                >
                  ✉️ pyjee8@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/PatriciaPark"
                  className="text-amber-400 hover:underline break-words"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  💻 github.com/PatriciaPark
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/pyjee8/"
                  className="text-indigo-400 hover:underline break-words"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🔗 linkedin.com/in/pyjee8
                </a>
              </li>
            </ul>
          </div>
        </div>

    );
};

export default Introduce;