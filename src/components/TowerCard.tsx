import React, { useState } from 'react';
import { Trophy, Flag, AlertCircle, Sparkles } from 'lucide-react';
import { Team, Block } from '../types/game';
import {
  TOWER_BLOCKS,
  TOTAL_ROWS,
  isBlockSupported,
  isBlockPlaceable,
  getTeamTowerHeight,
} from '../utils/towerGrid';
import { playBlockSound, playErrorSound } from '../utils/audio';

interface TowerCardProps {
  team: Team;
  isActiveTurn: boolean;
  currentDice: number | null;
  wildcardOnSix: boolean;
  soundEnabled: boolean;
  onPlaceBlock: (teamId: number, block: Block) => void;
  onInvalidClick?: (msg: string) => void;
}

export const TowerCard: React.FC<TowerCardProps> = ({
  team,
  isActiveTurn,
  currentDice,
  wildcardOnSix,
  soundEnabled,
  onPlaceBlock,
  onInvalidClick,
}) => {
  const [shakingBlockId, setShakingBlockId] = useState<string | null>(null);
  const [tipMessage, setTipMessage] = useState<string | null>(null);

  const coloredSet = new Set(team.coloredBlocks);
  const currentHeight = getTeamTowerHeight(team.coloredBlocks);

  const triggerShake = (blockId: string, message: string) => {
    setShakingBlockId(blockId);
    setTipMessage(message);
    playErrorSound(soundEnabled);
    if (onInvalidClick) onInvalidClick(message);
    setTimeout(() => {
      setShakingBlockId(null);
    }, 600);
    setTimeout(() => {
      setTipMessage(null);
    }, 2500);
  };

  const handleBlockClick = (block: Block) => {
    // If already colored
    if (coloredSet.has(block.id)) {
      return;
    }

    // Check if it is supported from below
    const supported = isBlockSupported(block, coloredSet);
    if (!supported) {
      triggerShake(block.id, '아래층 지지대를 먼저 쌓아야 합니다!');
      return;
    }

    // Check dice match
    if (currentDice === null) {
      triggerShake(block.id, '먼저 주사위를 굴려주세요!');
      return;
    }

    const matchesDice =
      (currentDice === 6 && wildcardOnSix) || block.num === currentDice;

    if (!matchesDice) {
      triggerShake(
        block.id,
        `주사위 눈금(${currentDice}번)과 일치하는 블록을 선택하세요! (이 블록은 ${block.num}번)`
      );
      return;
    }

    // Success!
    playBlockSound(block.row, soundEnabled);
    onPlaceBlock(team.id, block);
  };

  return (
    <div
      className={`flex flex-col bg-white rounded-2xl border-3 transition-all duration-300 p-3 shadow-md relative overflow-hidden select-none ${
        isActiveTurn
          ? 'ring-4 ring-offset-2 ring-indigo-400 border-indigo-600 shadow-xl'
          : 'border-slate-200 opacity-95 hover:opacity-100'
      }`}
      style={{
        borderColor: isActiveTurn ? team.color : undefined,
      }}
    >
      {/* Active turn indicator banner */}
      {isActiveTurn && (
        <div
          className="absolute top-0 left-0 right-0 py-0.5 text-center text-xs font-black tracking-wider text-white flex items-center justify-center gap-1.5 shadow-sm z-10"
          style={{ backgroundColor: team.color }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>현재 턴 (YOUR TURN)</span>
        </div>
      )}

      {/* Team header */}
      <div className={`flex items-center justify-between pb-2 mb-2 border-b border-slate-100 ${isActiveTurn ? 'pt-4' : 'pt-1'}`}>
        <div className="flex items-center gap-2">
          <span className="text-2xl drop-shadow-sm">{team.emoji}</span>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-800 leading-tight">
              {team.name}
            </h3>
            <span className="text-xs text-slate-500 font-semibold">
              높이: {currentHeight} / {TOTAL_ROWS}층
            </span>
          </div>
        </div>

        <div className="text-right">
          <span
            className="inline-block px-2.5 py-1 rounded-lg text-xs font-black shadow-sm"
            style={{
              backgroundColor: team.lightBg,
              color: team.color,
            }}
          >
            {team.coloredBlocks.length}개 완성
          </span>
        </div>
      </div>

      {/* Alert toast inside card if error occurred */}
      {tipMessage && (
        <div className="mb-2 p-1.5 bg-rose-50 border border-rose-300 rounded-lg text-rose-700 text-xs font-bold flex items-center gap-1.5 animate-pulse">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-rose-500" />
          <span className="truncate">{tipMessage}</span>
        </div>
      )}

      {/* Top: Finish Line / Trophy Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-white py-1.5 px-3 flex items-center justify-center gap-2 font-black text-xs sm:text-sm tracking-wider shadow-sm mb-2 border border-sky-300">
        <Trophy className="w-4 h-4 text-yellow-300 animate-bounce" />
        <span>FINISH · TROPHY (10층)</span>
        <Trophy className="w-4 h-4 text-yellow-300 animate-bounce" />
        <div className="absolute inset-0 bg-white/10 opacity-30 pointer-events-none" />
      </div>

      {/* Tower Brick Grid: Render from top row (9) down to bottom row (0) */}
      <div className="flex-1 bg-slate-100/90 rounded-xl p-2 border-2 border-slate-200 flex flex-col gap-1.5 shadow-inner">
        {Array.from({ length: TOTAL_ROWS }, (_, i) => TOTAL_ROWS - 1 - i).map(
          (rowIndex) => {
            const rowBlocks = TOWER_BLOCKS.filter((b) => b.row === rowIndex);

            return (
              <div
                key={rowIndex}
                className="grid grid-cols-12 gap-1.5 h-7 sm:h-8"
              >
                {rowBlocks.map((block) => {
                  const isColored = coloredSet.has(block.id);
                  const isSupported = isBlockSupported(block, coloredSet);
                  const isPlaceable =
                    isActiveTurn &&
                    isBlockPlaceable(
                      block,
                      coloredSet,
                      currentDice,
                      wildcardOnSix
                    );
                  const isShaking = shakingBlockId === block.id;

                  let blockClass =
                    'relative rounded-lg font-black text-xs sm:text-sm flex items-center justify-center transition-all duration-150 cursor-pointer border select-none ';

                  if (isColored) {
                    // Colored by this team
                    blockClass +=
                      'text-white shadow-[inset_0_2px_0_rgba(255,255,255,0.4),_0_2px_4px_rgba(0,0,0,0.15)] border-black/10 ';
                  } else if (isPlaceable) {
                    // Supported and matches dice -> Pulsing and inviting!
                    blockClass +=
                      'bg-indigo-100 text-indigo-900 border-2 border-indigo-500 shadow-md ring-2 ring-indigo-400/50 animate-pulse hover:scale-105 hover:z-10 ';
                  } else if (isSupported) {
                    // Supported from below, but doesn't match current dice
                    blockClass +=
                      'bg-white text-slate-700 border-slate-300 shadow-sm hover:bg-slate-50 ';
                  } else {
                    // Unsupported (floating)
                    blockClass +=
                      'bg-slate-200/80 text-slate-400 border-dashed border-slate-300 hover:border-slate-400 ';
                  }

                  if (isShaking) {
                    blockClass += 'animate-shake bg-rose-200 text-rose-800 border-rose-500 ';
                  }

                  return (
                    <button
                      key={block.id}
                      type="button"
                      onClick={() => handleBlockClick(block)}
                      className={blockClass}
                      style={{
                        gridColumn: `${block.col + 1} / span ${block.colSpan}`,
                        backgroundColor: isColored ? team.color : undefined,
                        borderColor: isColored ? team.borderColor : undefined,
                      }}
                      title={
                        isColored
                          ? `Level ${block.row + 1} · 숫자 ${block.num} (완성)`
                          : isPlaceable
                          ? `클릭하여 색칠하기! (숫자 ${block.num})`
                          : isSupported
                          ? `지지대 연결됨 (숫자 ${block.num})`
                          : `아래층을 먼저 쌓아야 합니다`
                      }
                    >
                      <span className="drop-shadow-xs">{block.num}</span>

                      {/* Small crown on highest row */}
                      {rowIndex === 9 && !isColored && (
                        <span className="absolute -top-1 -right-1 text-[10px]">
                          ⭐
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          }
        )}
      </div>

      {/* Bottom: START Line with Grass & Checkered Flag */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-500 text-white py-1.5 px-3 flex items-center justify-center gap-2 font-black text-xs sm:text-sm tracking-wider shadow-sm mt-2 border border-emerald-400">
        <Flag className="w-4 h-4 text-white" />
        <span>START · 바닥 라인 (1층)</span>
        <Flag className="w-4 h-4 text-white" />
      </div>
    </div>
  );
};
