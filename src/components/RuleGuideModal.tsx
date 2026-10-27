import React from 'react';
import { X, Trophy, AlertTriangle, Dice6, CheckCircle2 } from 'lucide-react';

interface RuleGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RuleGuideModal: React.FC<RuleGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const rules = [
    {
      num: '1',
      title: '팀 구성 및 순서 정하기',
      en: 'Play with your team. Do rock-paper-scissors!',
      desc: '참여할 팀을 정하고, 가위바위보를 통해 먼저 시작할 팀을 정합니다.',
      icon: '✌️',
    },
    {
      num: '2',
      title: '팀별 전용 타워 보드 배정',
      en: 'One game board for each team.',
      desc: '각 팀마다 바닥(START)부터 꼭대기(FINISH 🏆)까지 10개 층으로 이루어진 독립된 타워 보드가 주어집니다.',
      icon: '🏰',
    },
    {
      num: '3',
      title: '주사위 굴리기 및 눈금 매칭',
      en: 'Roll the dice. Match your number.',
      desc: '실제 주사위나 화면의 주사위를 굴려 나온 숫자(1~6)를 확인합니다.',
      icon: '🎲',
    },
    {
      num: '4',
      title: '미래 계획 영어 문장 읽기',
      en: 'Say the sentence aloud and color.',
      desc: '해당 주사위 눈금에 해당하는 영어 질문(Q)과 대답(A)을 팀원/짝과 함께 큰 소리로 연습합니다.',
      icon: '🗣️',
    },
    {
      num: '5',
      title: '★바닥(1층)부터 차례대로 쌓기★',
      en: '★Start from the bottom!★',
      desc: '공중에 떠 있는 블록은 선택할 수 없습니다! 반드시 바로 아래층에 지지대 블록이 먼저 색칠되어 있어야 위층을 쌓을 수 있습니다.',
      icon: '🧱',
      isWarning: true,
    },
    {
      num: '6',
      title: '승리 조건',
      en: 'The first to reach the top wins! 🏆',
      desc: '가장 먼저 10층 트로피 라인에 블록을 완성한 팀이 우승합니다! (제한 시간 플레이 시 가장 높이 쌓은 팀 승리)',
      icon: '🏆',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2">
              <span>📖</span> 게임 규칙 & 진행 안내
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              타워 블록 게임(Tower Blocks Game) 수업 진행 가이드
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rules List */}
        <div className="py-4 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {rules.map((rule) => (
            <div
              key={rule.num}
              className={`p-3.5 rounded-2xl border flex items-start gap-3.5 transition-all ${
                rule.isWarning
                  ? 'bg-rose-50/80 border-rose-300'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black flex-shrink-0 shadow-xs ${
                  rule.isWarning
                    ? 'bg-rose-500 text-white'
                    : 'bg-indigo-600 text-white'
                }`}
              >
                {rule.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3
                    className={`font-black text-sm sm:text-base ${
                      rule.isWarning ? 'text-rose-900' : 'text-slate-800'
                    }`}
                  >
                    {rule.num}. {rule.title}
                  </h3>
                  <span className="text-[11px] font-bold text-slate-400">
                    {rule.en}
                  </span>
                </div>
                <p
                  className={`text-xs sm:text-sm font-medium mt-1 leading-relaxed ${
                    rule.isWarning ? 'text-rose-800 font-bold' : 'text-slate-600'
                  }`}
                >
                  {rule.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl text-sm shadow-md transition-all cursor-pointer active:scale-95"
          >
            확인 및 게임으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};
