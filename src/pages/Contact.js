import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { language } = useLanguage();

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">
        {language === "en" ? "About Me" : "소개"}
      </h1>

      {language === "en" ? (
        <>
          <p className="mb-4">👋 Hello, I'm <strong>Youngjee Park</strong>.</p>
          <p className="mb-4">
            I'd like to briefly introduce myself by sharing the journey that has shaped who I am today.
          </p>
          <p className="mb-4">
            My journey began with a fascination for astronomy as a child, which eventually led me to study it in university. But along the way, I realized what I truly enjoy is building things—solving problems, designing systems, and bringing ideas to life through code.
          </p>
          <p className="mb-4">
            Living and working in Korea, China, Taiwan, and now Canada has taught me how to adapt quickly, keep learning, and connect across cultures. I've built everything from web platforms to data tools, and I genuinely enjoy the process of figuring things out from scratch.
          </p>
          <p className="mb-4">
            I'm always looking for meaningful work with thoughtful people. If you think I could be a good fit for your team, I’d love to connect.
          </p>


          <div className="bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-md mx-auto border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-rose-400 text-center">Contact</h2>
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

        </>
      ) : (
        <>
          <p className="mb-4">👋 안녕하세요, 박영지입니다.</p>
          <p className="mb-4">지금의 저를 만들어온 인생 여정을 간략히 소개드리고자 합니다.</p>
          <p className="mb-4"><strong>첫 번째 여정</strong><br />
            영화 Contact를 보고 천문학자라는 꿈을 가지게 되었습니다. 원하던 천문학과에 진학하게 되었지만, 현실은 영화와는 많이 달랐습니다. 그래서 취미로 했던 일본어를 복수전공으로 공부하며 인생의 선택 폭을 한 단계 넓혔습니다. Contact의 주인공처럼 멋진 천문학자로 사는 삶은 아니지만, 그녀처럼 꿈을 좇는 것을 멈추지 않고 싶었기 때문입니다.
          </p>

          <p className="mb-4"><strong>두 번째 여정</strong><br />
            방학 동안 중국 여행을 다녀오려던 계획이 점점 커져 어학연수가 되었습니다. 중국어는 하나도 모르던 상태에서 8개월 만에 新HSK 5급을 취득하고, 대학 편입시험에 통과하기까지 많은 심경의 변화가 있었고, 막연하게나마 중국에 자리를 잡게 될 것으로 생각했습니다. 하지만 인생은 계획대로만 되지 않았고, 즐거웠지만 힘들었고, 기뻤지만 지치기도 했던 중국에서의 2년을 뒤로하고 한국에 돌아왔습니다. 이 경험은 저에게 ‘하면 된다’는 말의 진정한 의미를 깨닫게 해주었고, 제 삶에 큰 영향을 주었습니다.
          </p>

          <p className="mb-4"><strong>세 번째 여정</strong><br />
            천문학과에 복학하여 미래에 대한 고민을 안고 열심히 수업을 쫓아갔습니다. 그러던 중 접하게 된 C언어는 저에게 새로운 불씨를 던져주었습니다. 방학 동안 교수님의 연구를 도와드리며 틈틈이 C언어를 공부했고, 이후 자바 개발자 교육과정을 들으며 IT 세계에 본격적으로 입문하게 되었습니다. 이후 안드로이드 개발자 과정을 통해 역량을 강화하며 개발자로서의 진로를 확신하게 되었습니다. 졸업과 동시에 스타트업 게임 회사와 중국 칭다오에 있는 IT 회사에서 근무하며 기획과 운영 업무를 경험했고, 이후 모교 연구실에서의 개발 경험을 시작으로 본격적인 개발자로서의 경력을 쌓기 시작했습니다.
          </p>

          <p className="mb-8"><strong>지금의 나</strong><br />
            한국과 대만, 캐나다 등 다양한 환경에서 풀스택 개발자로 프로젝트를 수행해왔으며, 혼자서도 콘텐츠 웹사이트를 구축하고 모바일 게임도 개발할 수 있는 역량을 갖추게 되었습니다. 지금까지의 여정을 통해 수긍하는 법, 후회하지 않는 법을 배웠습니다. 그리고 더 강해졌고, 보다 열정적으로 삶에 임하게 되었습니다. 어제의 나보다 더 나은 오늘의 내가 되기 위해, 지금도 배우고 성장하며 도전을 이어가고 있습니다.
          </p>

          <p className="mb-4">
            지금의 저는 다양한 환경에 빠르게 적응할 수 있으며, 새로운 기술을 배우는 데에도 자신이 있습니다.
            제 역량이 도움이 될 수 있는 기회가 있다면, 언제든 편하게 연락 주시기 바랍니다.
          </p>

          <div className="bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-md mx-auto border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-rose-400 text-center">연 락 처</h2>
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
        </>
      )}
    </div>
  );
}
