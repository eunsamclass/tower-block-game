import React from 'react';
import { Volume2, Sparkles, MessageCircleQuestion, CheckCircle2 } from 'lucide-react';
import { MissionSentence } from '../types/game';
import { speakSentence } from '../utils/audio';

interface MissionBannerProps {
  currentSentence: MissionSentence;
  currentDice: number | null;
  wildcardOnSix: boolean;
  soundEnabled: boolean;
}

export const MissionBanner: React.FC<MissionBannerProps> = ({
  currentSentence,
  currentDice,
  wildcardOnSix,
  soundEnabled,
}) => {
  const isSix = currentDice === 6;

  const handleSpeakQ = () => {
    speakSentence(currentSentence.questionEn, soundEnabled);
  };

  const handleSpeakA = () => {
    speakSentence(currentSentence.answerEn, soundEnabled);
  };

  const handleSpeakBoth = () => {
    speakSentence(`${currentSentence.questionEn} ... ${currentSentence.answerEn}`, soundEnabled);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-indigo-100 shadow-sm p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      <div className="flex-1 flex flex-col gap-2.5">
        {/* Banner sub-header */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
            주사위 눈금 {currentSentence.dice}번 미션
          </span>
          {isSix && wildcardOnSix && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-300 text-amber-800 text-xs font-black animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              골든 보너스 (1~5번 중 원하는 지지대 블록 자유 선택!)
            </span>
          )}
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            짝과 함께 묻고 답한 후 블록을 색칠하세요!
          </span>
        </div>

        {/* Q sentence */}
        <div className="flex items-start gap-2.5">
          <span className="flex-shrink-0 w-6 h-6 rounded-md bg-blue-500 text-white font-black text-xs flex items-center justify-center mt-0.5 shadow-sm">
            Q
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base sm:text-lg lg:text-xl font-extrabold text-slate-800 tracking-tight">
                {currentSentence.questionEn}
              </span>
              <button
                type="button"
                onClick={handleSpeakQ}
                title="질문 발음 듣기"
                className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {currentSentence.questionKo}
            </p>
          </div>
        </div>

        {/* A sentence */}
        <div className="flex items-start gap-2.5">
          <span className="flex-shrink-0 w-6 h-6 rounded-md bg-emerald-500 text-white font-black text-xs flex items-center justify-center mt-0.5 shadow-sm">
            A
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base sm:text-lg lg:text-xl font-extrabold text-emerald-700 tracking-tight">
                {currentSentence.answerEn}
              </span>
              <button
                type="button"
                onClick={handleSpeakA}
                title="답변 발음 듣기"
                className="p-1 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {currentSentence.answerKo}
            </p>
          </div>
        </div>
      </div>

      {/* TTS Audio button */}
      <div className="flex md:flex-col items-center justify-end gap-2 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4">
        <button
          type="button"
          onClick={handleSpeakBoth}
          className="w-full md:w-auto px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl border border-indigo-200 text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
        >
          <Volume2 className="w-4 h-4 text-indigo-600" />
          <span>전체 발음 듣기</span>
        </button>
      </div>
    </div>
  );
};
