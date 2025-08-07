import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { language } = useLanguage();

  const paragraphs = {
    en: [
      <>
        When I was younger, I wanted to become an <strong>astronomer</strong>. Not just any
        astronomer — I wanted to be like 'Ellie' from the movie <em>Contact (1997)</em>. I dreamed
        of decoding signals from space and traveling through wormholes. That dream led me to major
        in Astronomy and Space Science at Sejong University. But as time passed, I started to
        question: could I really live a life like Ellie’s?
      </>,
      <>
        So I took a small detour. I picked up <strong>Japanese</strong> as a second major, and then
        headed to China to study <strong>Chinese</strong>. I wanted to see more of the world and
        test my limits. I studied business in Shanghai, passed the HSK Level 5 exam, and learned
        how to survive on my own in a new culture. <em>It was hard, but it made me strong.</em>
      </>,
      <>
        Back in Korea, I stumbled into a course on <strong>Astronomical Image Processing</strong>,
        where I encountered <strong>C programming</strong> for the first time. It felt like
        discovering a new universe. Numbers turning into images, lines of code becoming stars — I
        was fascinated. That summer, I stayed up late in the university lab, learning how to code
        with a sense of curiosity I hadn’t felt in a long time.
      </>,
      <>
        That curiosity became conviction. I joined a <strong>Java development course</strong>,
        studied Android development, and soon found myself writing software instead of observing
        the stars. Since then, I’ve worked in different countries—Korea, China, Taiwan—building data
        systems, mobile apps, dashboards, and even 3D visualization tools for scientific research. I
        learned how to manage teams, lead projects, and talk to both developers and
        non-developers alike.
      </>,
      <>
        I’ve been a <strong>full-time employee</strong>, a <strong>freelancer</strong>,
        a <strong>mentor</strong>, and a <strong>solo creator</strong>. From somewhere in the middle of
        this long journey, my son has been by my side, and now we live together in Canada. I still
        deeply love what I do, but I also enjoy writing essays, creating pixel-art games, and
        imagining new worlds. My path has never been a straight line, but I believe that’s what has
        added more color to who I am.
      </>,
      <>
        And I still dream — not of decoding signals from space anymore, but of building things that
        mean something, even if it’s just for one person.
      </>,
      <>
        I’m always looking for <strong>meaningful work</strong> with thoughtful people. If you think
        I could be a good fit for your team, I’d love to connect.
      </>,
    ],
    ko: [
      <>
        어릴 적, 저는 <strong>천문학자</strong>라는 꿈을 가졌습니다. 그냥 천문학자가 아니라,
        영화 <em>콘택트 (1997)</em> 속 '엘리'처럼 되고 싶었습니다. 외계에서 오는 신호를 해독하고,
        우주를 여행하는 삶. 그렇게 천문우주학과에 진학했지만 시간이 지나면서 이런 의문이 들었습니다.
        <em>"과연 나도 영화 속 엘리처럼 살 수 있을까?"</em>
      </>,
      <>
        그래서 <strong>일본어</strong>를 복수전공으로 공부했고, 더 넓은 세상을 보기 위해
        <strong>중국</strong>으로 유학을 떠났습니다. 상하이에서 비즈니스를 공부하며 HSK 5급도 따고,
        낯선 문화 속에서 홀로 살아가는 법도 배웠습니다. <em>쉽진 않았지만, 저를 강하게 만든
        경험이었습니다.</em>
      </>,
      <>
        한국에 돌아와 우연히 들은 <strong>'천문 이미지 처리'</strong> 수업에서 처음으로
        <strong>C 언어</strong>를 접하게 되었습니다. 숫자가 이미지로, 코드가 별이 되는 그 마법에
        빠져들었고, 여름 내내 연구실에서 밤을 새우며 오랜만에 느낀 진짜 호기심으로 코딩을 배워갔습니다.
      </>,
      <>
        그 호기심은 곧 확신이 되었습니다. <strong>자바 개발자 교육</strong>과
        <strong>안드로이드 개발</strong> 과정을 수료하고, 별을 관측하던 사람이 아닌 무언가를 만드는
        사람이 되었습니다. 이후 한국, 중국, 대만 등에서 데이터 시스템, 모바일 앱, 대시보드, 3D
        시각화 도구까지 다양한 프로젝트를 수행하며, 기획자와 개발자 사이를 잇는 커뮤니케이션 능력도
        쌓아왔습니다.
      </>,
      <>
        저는 <strong>정규직</strong>도, <strong>프리랜서</strong>도, <strong>멘토</strong>도,
        <strong>1인 창작자</strong>도 되어봤습니다. 여정의 중간쯤부터는 아들과 함께였고, 지금은
        캐나다에 살고 있습니다. 여전히 코딩을 하고, 에세이를 쓰고, 도트 게임을 만들고, 새로운 세계를
        상상하는 일을 좋아합니다. <em>저의 길은 결코 일직선이 아니었지만, 그 덕분에 더 많은 색을 가진
        사람이 되었습니다.</em>
      </>,
      <>
        이제는 더 이상 우주의 신호를 해독하진 않지만, 누군가의 마음에 닿을 수 있는 무언가를 만들고
        싶습니다. <em>비록 단 한 사람을 위한 것이라도.</em>
      </>,
      <>
        함께 성장할 수 있는 <strong>의미 있는 일</strong>을 찾고 있습니다. 제 역량이 필요한 곳이
        있다면 언제든 연락 주세요.
      </>,
    ],
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">
        {language === "en" ? "About Me" : "소개"}
      </h1>

      <p className="mb-4">
        👋 {language === "en" ? "Hello. Would you like to hear my story?" : "안녕하세요. 제 이야기 들어보실래요?"}
      </p>

      {paragraphs[language].map((para, i) => (
        <p key={i} className="mb-4 leading-relaxed">{para}</p>
      ))}

      {/* Contact section */}
      <div className="bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-md mx-auto border border-gray-200 dark:border-gray-700 mt-12">
        <h2 className="text-xl font-bold mb-4 text-rose-400 text-center">
          {language === "en" ? "✦ Find out more about me ✦" : "✦ Contect · More about me ✦"}
        </h2>
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
              href="https://www.linkedin.com/in/pyjee8/"
              className="text-indigo-400 hover:underline break-words"
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 linkedin.com/in/pyjee8
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
        </ul>
      </div>
    </div>
  );
}
