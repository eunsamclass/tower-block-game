import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles, RotateCcw, Settings, Star } from 'lucide-react';
import { Team } from '../types/game';
import { playVictorySound } from '../utils/audio';

interface WinnerModalProps {
  winner: Team | null;
  isOpen: boolean;
  onPlayAgain: () => void;
  onOpenSetup: () => void;
  soundEnabled: boolean;
}

export const WinnerModal: React.FC<WinnerModalProps> = ({
  winner,
  isOpen,
  onPlayAgain,
  onOpenSetup,
  soundEnabled,
}) => {
  useEffect(() => {
    if (isOpen && winner) {
      playVictorySound(soundEnabled);

      // Confetti blast
      const end = Date.now() + 3 * 1000;
      const colors = [winner.color, '#FFD700', '#ffffff', '#38BDF8'];

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isOpen, winner, soundEnabled]);

  if (!isOpen || !winner) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-center border-4 border-amber-300 relative overflow-hidden animate-bounce-in">
        {/* Decorative background rays */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-200/40 rounded-full blur-2xl" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-indigo-200/40 rounded-full blur-2xl" />

        {/* Big Trophy & Star */}
        <div className="relative inline-block mb-3">
          <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shadow-lg border-4 border-white">
            <span className="text-5xl sm:text-6xl animate-pulse">🏆</span>
          </div>
          <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-950 p-1.5 rounded-full shadow-md animate-bounce">
            <Sparkles className="w-5 h-5 fill-yellow-900" />
          </div>
        </div>

        {/* Title */}
        <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-black tracking-wider uppercase mb-2">
          VICTORY! 승리를 축하합니다!
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mb-2">
          <span style={{ color: winner.color }}>{winner.emoji} {winner.name}</span>
          <br />
          타워 완공 승리! 🏆
        </h2>

        <p className="text-slate-600 text-sm sm:text-base font-semibold mb-6">
          가장 먼저 10층 트로피 라인에 도달하여 승리하였습니다!
          <br />
          모든 팀원들에게 큰 박수를 보내주세요! 👏🎉
        </p>

        {/* Stats card */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-around mb-6">
          <div className="text-center">
            <span className="text-xs text-slate-500 font-bold block">완성 블록</span>
            <span className="text-xl font-black text-slate-800">
              {winner.coloredBlocks.length}개
            </span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-center">
            <span className="text-xs text-slate-500 font-bold block">최고 층수</span>
            <span className="text-xl font-black text-amber-600">
              10층 (TOP)
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={onPlayAgain}
            className="flex-1 py-3 px-5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-black rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>한 판 더 하기 (Play Again)</span>
          </button>
          <button
            type="button"
            onClick={onOpenSetup}
            className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            <span>설정 변경</span>
          </button>
        </div>
      </div>
    </div>
  );
};
