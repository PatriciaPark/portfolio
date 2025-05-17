import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function exportToExcel(data, filename = 'data.xlsx') {
  // JS 객체 배열 → 시트
  const worksheet = XLSX.utils.json_to_sheet(data);
  // 워크북 생성
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  // 바이너리로 변환
  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  // 다운로드
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), filename);
}

const tabKeys = ["basicExpressions", "slangs", "number", "homophones", "download"];

const tabLabels = {
  en: {
    basicExpressions: "Basic Expressions",
    slangs: "Slangs",
    number: "Numbers",
    homophones: "Homophones",
    download: "Download Excel"
  },
  ko: {
    basicExpressions: "기본 표현",
    slangs: "속어",
    number: "숫자",
    homophones: "동음이의어",
    download: "엑셀 다운로드"
  }
};

// 예시 데이터 구조
const tabData = {
  basicExpressions: [
    { en: "Hello",                 formal: "안녕하세요[annyeonghaseyo]",            informal: "안녕[annyeong]" },
    { en: "Thank you",             formal: "감사합니다[gamsahamnida]",              informal: "고마워[gomawo]" },
    { en: "Yes",                   formal: "네[ne]",                              informal: "응[eung]" },
    { en: "No",                    formal: "아니요[aniyo]",                       informal: "아니[aniya]" },
    { en: "Please",                formal: "부탁드립니다[butak deurimnida]",        informal: "제발[jebal]" },
    { en: "Excuse me",             formal: "실례합니다[sillyehamnida]",             informal: "저기요[jeogiyo]" },
    { en: "I'm sorry",             formal: "죄송합니다[joesonghamnida]",            informal: "미안해[mianhae]" },
    { en: "Good morning",          formal: "좋은 아침입니다[joeun achimimnida]",      informal: "좋은 아침[joeun achim]" },
    { en: "Good night",            formal: "안녕히 주무세요[annyeonghi jumuseyo]",    informal: "잘 자[jalja]" },
    { en: "Goodbye",               formal: "안녕히 계세요[annyeonghi gyeseyo]",      informal: "잘 가[jalga]" },
    { en: "What’s your name?",     formal: "이름이 어떻게 되세요?[ireumi eotteoke doeseyo?]", informal: "이름이 뭐야?[ireumi mwoya?]" },
    { en: "My name is ...",        formal: "제 이름은 ...입니다[je ireumeun ...imnida]", informal: "내 이름은 ...이야[nae ireumeun ...iya]" },
    { en: "How are you?",          formal: "어떻게 지내세요?[eotteoke jinaeseyo?]",  informal: "어떻게 지내?[eotteoke jinae?]" },
    { en: "Nice to meet you",      formal: "만나서 반갑습니다[mannaseo bangapseumnida]",informal: "만나서 반가워[mannaseo bangawo]" },
    { en: "See you later",         formal: "나중에 뵙겠습니다[najunge boepgetseumnida]",informal: "나중에 봐[najunge bwa]" },
    { en: "Where is the bathroom?",formal: "화장실 어디 있어요?[hwajangsil eodi isseoyo?]", informal: "화장실 어디야?[hwajangsil eodiya?]" },
    { en: "I don’t understand",    formal: "이해하지 못했어요[ihaehaji mothaesseoyo]",informal: "모르겠어[moleugesseo]" },
    { en: "Do you speak English?", formal: "영어 하세요?[yeongeo haseyo?]",            informal: "영어해?[yeongeohae?]" },
    { en: "How much is this?",     formal: "이거 얼마예요?[igeo eolmayeyo?]",         informal: "이거 얼마야?[igeo eolmaya?]" },
    { en: "Help!",                 formal: "도와주세요[dowajuseyo]",                  informal: "도와줘[dowajwo]" }
  ],

  slangs: [
    {
        en: "I’m dying",
        ko: "죽겠다[jukgetda]",
        description: "used to express extreme feelings"
    },
    {
        en: "I’m starving to death",
        ko: "배고파 죽겠다[baegopa jukgetda]"
    },
    {
        en: "I’m so tired (I feel like I’m dying)",
        ko: "힘들어 죽겠어요[himdeureo jukgetseoyo]"
    },
    {
        en: "I miss you so much (I feel like I’m dying)",
        ko: "보고 싶어 죽겠어[bogo sipeo jukgetseo]"
    },
    {
        en: "It’s ‘Fire Friday’, so let’s have a drink",
        ko: "불금인데 한잔 해야지[bulgeum-inde hanjan haeyaji]",
        description: "불금 (Bulgeum) = 불타는 금요일; Burning Friday"
    },
    {
        en: "First round: samgyeopsal & soju; second round: chicken & beer, down?",
        ko: "1차 삼쏘 갔다가 2차 치맥 콜?[ilcha samsso gatdaga 2cha chimaek kol?]",
        description: "삼쏘 (Samso) = samgyeopsal(pork belly) + soju"
    },
    {
        en: "Accept—let’s go for round 3 at a Pocha, deal",
        ko: "받고, 3차 포차까지 콜[batgo 3cha pochakkaji call]",
        description: "포차 (Pocha) = a casual Korean street bar"
    },
    {
        en: "Fool / Idiot",
        ko: "바보[babo]"
    },
    {
        en: "Dummy / Dumb",
        ko: "멍청이[meongcheongi]"
    },
    {
        en: "Sea cucumber, sea pineapple, sea anemone",
        ko: "해삼 멍게 말미잘[haesam meonggae malmijal]"
    },
    {
        en: "‘The answer is already decided—you just have to answer’ type",
        ko: "답정너[dapjeongneo]",
        description: "답정너 = 답은 정해져 있어, 너는 대답만 해"
    },
    {
        en: "Chicken and beer, down?",
        ko: "치맥 콜?[chimaek kol?]",
        description: "치맥 (Chimaek) = chicken + maekju(beer)"
    },
    {
        en: "Totally my type",
        ko: "완전 취저야[wanjeon chwijeoya]",
        description: "취저 = 취향 저격"
    },
    {
        en: "‘God-’ prefix to mean ‘the best’",
        ko: "갓-[gat-]",
        description: "eg. 갓생, 갓벽, 갓겜"
    },
    {
        en: "Let’s live a god-like life(=Living a perfect and disciplined life)",
        ko: "갓생살자 [gotsaeng salja]",
        description: "갓생(gotsaeng) : God + 인생(Life)"
    },
    {
        en: "Felix is god-like perfect",
        ko: "필릭스는 갓벽이지[pilligseuneun gotbyeok iji]",
        description: "갓벽(gotbyeok) : God + 완벽(Perfect)"
    },
    {
        en: "Recommend me the best game",
        ko: "갓겜 추천좀[gotgem chucheonjom]",
        description: "갓겜(gotgem) : God + 게임(Game)"
    },
    {
        en: "Amazing / Cool",
        ko: "쩐다[jjeonda]",
        description: "eg. That person is 쩐다"
    },
    {
        en: "The best / Awesome",
        ko: "짱이다[jjang-ida]",
        description: "eg. You are 짱이다"
    },
    {
        en: "Crazy / Insane / Amazing / Unbelievable",
        ko: "미쳤다[michyeotda]"
    },
    {
        en: "Unbelievable looking",
        ko: "얼굴(face) 미쳤다[eulgul michyeotda]",
        description: "when someone is so handsome/beautiful that it’s hard to believe"
    },
    {
        en: "Dog-",
        ko: "개-[gae-]",
        description: "added before a word to emphasize a bad situation"
    },
    {
        en: "I’m starving",
        ko: "개배고파[gaebaegopa]"
    },
    {
        en: "So annoying",
        ko: "개짜증나[gaejjajeungna]"
    },
    {
        en: "Over the top / Overreacting",
        ko: "개오바야[gaeobaya]"
    },
    {
        en: "I’m so getting angry",
        ko: "개킹받네[gaekingbadne]"
    },
    {
        en: "Omg!",
        ko: "헐~[heol~]",
        description: "when you’re surprised or shocked"
    },
    {
        en: "Omg awesome",
        ko: "헐 대박[heol daebag]"
    },
    {
        en: "Omg what",
        ko: "헐 뭐야[heol mwoya]"
    },
    {
        en: "Omg really?",
        ko: "헐 진짜?[heol jinjja?]"
    },
    {
        en: "Awesome",
        ko: "대박[daebag]"
    },
    {
        en: "Heart skips a beat / Heartthrob",
        ko: "심쿵[simkung]"
    },
    {
        en: "P!ssed off",
        ko: "빡친다[ppagchinda]"
    },
    {
        en: "Whatever",
        ko: "어쩔티비[eojjeoltibi]"
    },
    {
        en: "Didn’t ask / Don’t care",
        ko: "안물안궁[anmul-angung]"
    },
    {
        en: "Ok-ok, I got it",
        ko: "뉘예뉘예 알겠쯉미다[nwiyenwiye algessjjyubmida]"
    }
  ],
  number: [
    { en: "One",   reading: "일[il]",     counting: "하나[hana]"  },
    { en: "Two",   reading: "이[i]",      counting: "둘[dul]"     },
    { en: "Three", reading: "삼[sam]",    counting: "셋[ses]"     },
    { en: "Four",  reading: "사[sa]",     counting: "넷[net]"     },
    { en: "Five",  reading: "오[o]",      counting: "다섯[daseot]" },
    { en: "Six",   reading: "육[yuk]",    counting: "여섯[yeoseot]"},
    { en: "Seven", reading: "칠[chil]",   counting: "일곱[ilgop]"  },
    { en: "Eight", reading: "팔[pal]",    counting: "여덟[yeodeol]"},
    { en: "Nine",  reading: "구[gu]",     counting: "아홉[ahop]"   },
    { en: "Ten",   reading: "십[sip]",    counting: "열[yeol]"    }
  ],
  homophones: [
    {
        word: "배",
        pron: "bae",
        meanings: [
        { label: "fruit",    ko: "배(배가 크고 달다)",  eng: "pear" },
        { label: "vessel",   ko: "배(배가 침몰했다)",   eng: "boat" },
        { label: "stomach",  ko: "배(배가 아프다)",     eng: "stomach" },
        { label: "times",    ko: "배(돈이 두 배 많다)", eng: "times" }
        ]
    },
    {
        word: "눈",
        pron: "nun",
        meanings: [
        { label: "eye", ko: "눈(눈에 밟히다)", eng: "eye" },
        { label: "snow",ko: "눈(눈이 내리다)", eng: "snow" }
        ]
    },
    {
        word: "말",
        pron: "mal",
        meanings: [
        { label: "horse",  ko: "말(말을 타다)", eng: "horse" },
        { label: "speech", ko: "말(말을 하다)", eng: "speech" },
        { label: "end",    ko: "말(이달 말)",   eng: "end" }
        ]
    },
    {
        word: "차",
        pron: "cha",
        meanings: [
        { label: "tea",       ko: "차(차를 마시다)",         eng: "tea" },
        { label: "car",       ko: "차(차가 밀리다)",         eng: "car" },
        { label: "difference",ko: "차(두 수의 차를 구하시오)", eng: "difference" }
        ]
    },
    {
        word: "가지",
        pron: "gaji",
        meanings: [
        { label: "eggplant",   ko: "가지(가지 볶음을 만들다)",       eng: "eggplant" },
        { label: "branch",     ko: "가지(가지를 함부로 꺾지 마시오)", eng: "branch" },
        { label: "kind/type",  ko: "가지(여러가지 경우의 수가 있다)", eng: "kind/type" }
        ]
    }
  ]
};

export default function KoreanContentPage() {
  const [activeTab, setActiveTab] = useState("basicExpressions");
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        {language === "en" ? "Let's learn Basic Korean😉" : "기본 한국어를 배워봅시다😉"}
      </h1>

      <div className="flex justify-center gap-4 mb-8 flex-wrap overflow-x-auto">
        {tabKeys.map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === key
                ? "bg-cyan-500 text-white shadow"
                : "bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-zinc-600"
            }`}
          >
            {tabLabels[language][key]}
          </button>
        ))}
      </div>

      <div>
        {/* basic ecpressions */}
        {activeTab === "basicExpressions" && (
          <div className="overflow-x-auto p-4 rounded-lg">
            <table className="w-full table-auto border-separate border-spacing-1 table-glow">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-600 to-indigo-600 text-white">
                  <th className="px-3 py-2 text-sm">English</th>
                  <th className="px-3 py-2 text-sm">Formal</th>
                  <th className="px-3 py-2 text-sm">Informal</th>
                </tr>
              </thead>
              <tbody>
                {tabData.basicExpressions.map((row, idx) => (
                  <tr key={idx} className="odd:bg-gradient-to-r odd:from-transparent odd:to-cyan-400 
                                           even:bg-gradient-to-r even:from-transparent even:to-indigo-400 
                                           hover:from-cyan-200 hover:to-indigo-200
                                           dark:hover:from-cyan-800 dark:hover:to-indigo-800
                                           transition-colors">
                    <td className="px-3 py-2 text-xs text-gray-800 dark:text-white">{row.en}</td>
                    <td className="px-3 py-2 text-xs text-gray-800 dark:text-white">{row.formal}</td>
                    <td className="px-3 py-2 text-xs text-gray-800 dark:text-white">{row.informal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* number */}
        {activeTab === "number" && (
          <div className="overflow-x-auto p-4 rounded-lg">
            <table className="w-full table-auto border-separate border-spacing-1 table-glow">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-600 to-indigo-600 text-white">
                  <th className="px-3 py-2 text-sm">English</th>
                  <th className="px-3 py-2 text-sm">Reading</th>
                  <th className="px-3 py-2 text-sm">Counting</th>
                </tr>
              </thead>
              <tbody>
                {tabData.number.map((row, idx) => (
                  <tr key={idx} className="odd:bg-gradient-to-r odd:from-transparent odd:to-cyan-400 
                                           even:bg-gradient-to-r even:from-transparent even:to-indigo-400 
                                           hover:from-cyan-200 hover:to-indigo-200
                                           dark:hover:from-cyan-800 dark:hover:to-indigo-800
                                           transition-colors">
                    <td className="px-3 py-2 text-xs text-gray-800 dark:text-white">{row.en}</td>
                    <td className="px-3 py-2 text-xs text-gray-800 dark:text-white">{row.reading}</td>
                    <td className="px-3 py-2 text-xs text-gray-800 dark:text-white">{row.counting}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}


        {/* slangs */}
        {activeTab === "slangs" && (
        <div className="overflow-x-auto p-4 rounded-lg">
            <table className="w-full table-auto border-separate border-spacing-1 table-glow">
            <thead>
                <tr className="bg-gradient-to-r from-cyan-600 to-indigo-600 text-white">
                  <th className="px-3 py-2 text-sm">English</th>
                  <th className="px-3 py-2 text-sm">Korean</th>
                  <th className="px-3 py-2 text-sm">Description</th>
                </tr>
            </thead>
            <tbody>
                {tabData.slangs.map((row, idx) => (
                <tr
                    key={idx}
                    className="odd:bg-gradient-to-r odd:from-transparent odd:to-cyan-400 
                               even:bg-gradient-to-r even:from-transparent even:to-indigo-400 
                               hover:from-cyan-200 hover:to-indigo-200
                               dark:hover:from-cyan-800 dark:hover:to-indigo-800
                               transition-colors"
                >
                    <td className="px-3 py-2 text-xs text-gray-800 dark:text-white">{row.en}</td>
                    <td className="px-3 py-2 text-xs text-gray-800 dark:text-white">{row.ko}</td>
                    <td className="px-3 py-2 text-xs text-gray-800 dark:text-white">{row.description}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        )}

        {/* homophones */}
        {activeTab === "homophones" && (
        <div className="overflow-x-auto p-4 rounded-lg">
            <table className="w-full table-auto border-separate border-spacing-1 table-glow">
            <thead>
                <tr className="bg-gradient-to-r from-cyan-600 to-indigo-600 text-white">
                  <th className="px-3 py-2 text-sm">Word</th>
                  <th className="px-3 py-2 text-sm">Pron.</th>
                  <th className="px-3 py-2 text-sm">English Meaning</th>
                  <th className="px-3 py-2 text-sm">Korean Meaning</th>
                </tr>
            </thead>
            <tbody>
                {tabData.homophones.map((item, i) =>
                item.meanings.map((m, j) => (
                    <tr
                    key={`${i}-${j}`}
                    className="odd:bg-gradient-to-r odd:from-transparent odd:to-cyan-400 
                               even:bg-gradient-to-r even:from-transparent even:to-indigo-400 
                               hover:from-cyan-200 hover:to-indigo-200
                               dark:hover:from-cyan-800 dark:hover:to-indigo-800
                               transition-colors"
                    >
                    {j === 0 && (
                        <>
                        <td
                            rowSpan={item.meanings.length}
                            className="px-3 py-2 text-xs text-gray-800 dark:text-cyan-200 align-center text-center"
                        >
                            {item.word}
                        </td>
                        <td
                            rowSpan={item.meanings.length}
                            className="px-3 py-2 text-xs text-gray-800 dark:text-cyan-200 align-center text-center"
                        >
                            {item.pron}
                        </td>
                        </>
                    )}
                        <td className="px-3 py-2 text-xs text-gray-800 dark:text-white">{m.eng}</td>
                        <td className="px-3 py-2 text-xs text-gray-800 dark:text-white">{m.ko}</td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>
        )}

        {/* excel download */}
        {activeTab === "download" && (
        <div className="text-center">
            <a
            href="/basic_expressions.xlsx"
            download="BasicKorean_v1.xlsx"
            className="inline-block px-6 py-3 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition"
            >
            {language === 'en' ? 'Download Basic Korean as Excel' : '기본 한국어 엑셀 다운로드'}
            </a>
        </div>
        )}

      </div>
    </div>
  );
}
