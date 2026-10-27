import React, { useState } from 'react';
import {
  Trophy,
  RotateCcw,
  SkipForward,
  Undo2,
  Volume2,
  VolumeX,
  Settings,
  HelpCircle,
  Download,
  Maximize2,
  Minimize2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Team } from '../types/game';

interface HeaderProps {
  currentTeam: Team;
  round: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onPassTurn: () => void;
  onUndo: () => void;
  canUndo: boolean;
  onOpenSetup: () => void;
  onOpenRules: () => void;
  onOpenSentenceEditor: () => void;
  onExportHtml: () => void;
  timerRemaining: number | null;
}

export const Header: React.FC<HeaderProps> = ({
  currentTeam,
  round,
  soundEnabled,
  onToggleSound,
  onPassTurn,
  onUndo,
  canUndo,
  onOpenSetup,
  onOpenRules,
  onOpenSentenceEditor,
  onExportHtml,
  timerRemaining,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center font-black text-xl shadow-md">
            🏰
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                Tower Blocks Game
              </h1>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                초등 영어
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              미래 계획 표현 (What are you going to do...? / I'm going to...)
            </p>
          </div>
        </div>

        {/* Current Turn Badge */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2.5 px-4 py-2 rounded-2xl border-2 shadow-sm transition-all animate-pulse"
            style={{
              backgroundColor: currentTeam.lightBg,
              borderColor: currentTeam.color,
              color: currentTeam.color,
            }}
          >
            <span className="text-2xl">{currentTeam.emoji}</span>
            <div className="flex flex-col">
              <span className="text-xs font-bold opacity-80 uppercase tracking-wider">
                Round {round} · 지금 턴
              </span>
              <span className="text-sm sm:text-base font-black tracking-tight">
                {currentTeam.name}의 차례!
              </span>
            </div>
          </div>

          {/* Turn timer if active */}
          {timerRemaining !== null && (
            <div
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border font-black text-sm ${
                timerRemaining <= 5
                  ? 'bg-rose-100 text-rose-700 border-rose-300 animate-bounce'
                  : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{timerRemaining}초</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <button
            type="button"
            onClick={onPassTurn}
            title="다음 팀으로 턴 넘기기"
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>턴 넘기기</span>
          </button>

          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            title="마지막 블록 취소"
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <Undo2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onToggleSound}
            title={soundEnabled ? '효과음 끄기' : '효과음 켜기'}
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          <button
            type="button"
            onClick={onOpenSentenceEditor}
            title="미션 영어 문장 수정"
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer text-xs font-bold"
          >
            <span>✏️ 문장</span>
          </button>

          <button
            type="button"
            onClick={onOpenRules}
            title="게임 방법 및 규칙 안내"
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onExportHtml}
            title="오프라인용 단일 HTML 파일로 다운로드"
            className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">단일 HTML 저장</span>
          </button>

          <button
            type="button"
            onClick={onOpenSetup}
            title="게임 설정 (팀 수/이름/색상 변경)"
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            title="전체화면"
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer hidden sm:block"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
