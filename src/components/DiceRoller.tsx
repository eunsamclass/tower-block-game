import React, { useState } from 'react';
import { playDiceSound } from '../utils/audio';

interface DiceRollerProps {
  currentDice: number | null;
  onDiceChange: (num: number) => void;
  soundEnabled: boolean;
  disabled?: boolean;
}

export const DiceRoller: React.FC<DiceRollerProps> = ({
  currentDice,
  onDiceChange,
  soundEnabled,
  disabled = false,
}) => {
  const [isRolling, setIsRolling] = useState(false);

  const handleRoll = () => {
    if (disabled || isRolling) return;
    setIsRolling(true);
    playDiceSound(soundEnabled);

    // Dice animation interval
    let counter = 0;
    const interval = setInterval(() => {
      const tempNum = Math.floor(Math.random() * 6) + 1;
      onDiceChange(tempNum);
      counter++;
      if (counter >= 10) {
        clearInterval(interval);
        const finalNum = Math.floor(Math.random() * 6) + 1;
        onDiceChange(finalNum);
        setIsRolling(false);
      }
    }, 60);
  };

  // Render dice face dots
  const renderDiceDots = (num: number) => {
    switch (num) {
      case 1:
        return (
          <div className="w-full h-full flex items-center justify-center">
            <span className="w-4 h-4 bg-red-600 rounded-full shadow-inner" />
          </div>
        );
      case 2:
        return (
          <div className="w-full h-full flex justify-between p-1.5">
            <span className="w-3.5 h-3.5 bg-slate-900 rounded-full" />
            <span className="w-3.5 h-3.5 bg-slate-900 rounded-full self-end" />
          </div>
        );
      case 3:
        return (
          <div className="w-full h-full flex justify-between p-1.5">
            <span className="w-3.5 h-3.5 bg-slate-900 rounded-full" />
            <span className="w-3.5 h-3.5 bg-slate-900 rounded-full self-center" />
            <span className="w-3.5 h-3.5 bg-slate-900 rounded-full self-end" />
          </div>
        );
      case 4:
        return (
          <div className="w-full h-full grid grid-cols-2 p-1.5 gap-2">
            <span className="w-3.5 h-3.5 bg-slate-900 rounded-full" />
            <span className="w-3.5 h-3.5 bg-slate-900 rounded-full justify-self-end" />
            <span className="w-3.5 h-3.5 bg-slate-900 rounded-full self-end" />
            <span className="w-3.5 h-3.5 bg-slate-900 rounded-full justify-self-end self-end" />
          </div>
        );
      case 5:
        return (
          <div className="w-full h-full grid grid-cols-3 grid-rows-3 p-1.5 place-items-center">
            <span className="w-3 h-3 bg-slate-900 rounded-full" />
            <span />
            <span className="w-3 h-3 bg-slate-900 rounded-full" />
            <span />
            <span className="w-3 h-3 bg-slate-900 rounded-full" />
            <span />
            <span className="w-3 h-3 bg-slate-900 rounded-full" />
            <span />
            <span className="w-3 h-3 bg-slate-900 rounded-full" />
          </div>
        );
      case 6:
        return (
          <div className="w-full h-full grid grid-cols-2 grid-rows-3 p-1.5 place-items-center">
            <span className="w-3 h-3 bg-slate-900 rounded-full" />
            <span className="w-3 h-3 bg-slate-900 rounded-full" />
            <span className="w-3 h-3 bg-slate-900 rounded-full" />
            <span className="w-3 h-3 bg-slate-900 rounded-full" />
            <span className="w-3 h-3 bg-slate-900 rounded-full" />
            <span className="w-3 h-3 bg-slate-900 rounded-full" />
          </div>
        );
      default:
        return (
          <span className="text-2xl font-black text-slate-400">?</span>
        );
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
      <div className="flex items-center gap-3">
        {/* Interactive Dice Cube */}
        <button
          type="button"
          onClick={handleRoll}
          disabled={disabled || isRolling}
          title="클릭하여 주사위 굴리기"
          className={`relative w-16 h-16 sm:w-18 sm:h-18 bg-white border-3 border-slate-800 rounded-2xl shadow-[0_6px_0_#1e293b] active:shadow-[0_2px_0_#1e293b] active:translate-y-1 transition-all duration-150 flex items-center justify-center cursor-pointer select-none ${
            isRolling ? 'animate-bounce rotate-12 scale-105' : 'hover:-translate-y-0.5'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {currentDice ? renderDiceDots(currentDice) : (
            <span className="text-3xl">🎲</span>
          )}
        </button>

        <div className="flex flex-col">
          <button
            type="button"
            onClick={handleRoll}
            disabled={disabled || isRolling}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded-xl shadow-sm text-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>🎲 주사위 굴리기</span>
          </button>
          <span className="text-[11px] text-slate-500 font-medium mt-1 text-center">
            실제 주사위 눈금 직접 클릭 가능 👇
          </span>
        </div>
      </div>

      {/* Manual Quick Selector Buttons for Physical Classroom Dice */}
      <div className="flex items-center gap-1.5 w-full justify-center">
        {[1, 2, 3, 4, 5, 6].map((num) => {
          const isSelected = currentDice === num;
          return (
            <button
              key={num}
              type="button"
              onClick={() => {
                onDiceChange(num);
                playDiceSound(soundEnabled);
              }}
              className={`w-8 h-8 rounded-lg font-black text-sm transition-all duration-150 flex items-center justify-center cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md scale-110 ring-2 ring-indigo-300'
                  : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-300'
              }`}
            >
              {num}
            </button>
          );
        })}
      </div>
    </div>
  );
};
