import React, { useState } from 'react';
import { Users, Sparkles, Clock, Check, Play, Palette } from 'lucide-react';
import { Team, GameSettings } from '../types/game';
import { TEAM_COLOR_PRESETS } from '../utils/towerGrid';

interface SetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame: (teams: Team[], settings: GameSettings) => void;
  currentTeams: Team[];
  currentSettings: GameSettings;
}

const EMOJI_OPTIONS = ['🦁', '🐬', '🐯', '🦖', '🦄', '🦊', '🐼', '🦅', '🐻', '🐰'];

export const SetupModal: React.FC<SetupModalProps> = ({
  isOpen,
  onClose,
  onStartGame,
  currentTeams,
  currentSettings,
}) => {
  const [teamCount, setTeamCount] = useState<number>(
    currentTeams.length || 4
  );
  const [wildcardOnSix, setWildcardOnSix] = useState<boolean>(
    currentSettings.wildcardOnSix
  );
  const [timerSeconds, setTimerSeconds] = useState<number | null>(
    currentSettings.timerSeconds
  );
  const [soundEnabled, setSoundEnabled] = useState<boolean>(
    currentSettings.soundEnabled
  );

  // Teams state
  const [teams, setTeams] = useState<Team[]>(() => {
    return Array.from({ length: 6 }, (_, idx) => {
      const preset = TEAM_COLOR_PRESETS[idx % TEAM_COLOR_PRESETS.length];
      const existing = currentTeams[idx];
      if (existing) {
        return { ...existing };
      }
      return {
        id: idx,
        name: preset.name,
        color: preset.color,
        textColor: preset.textColor,
        bgGradient: preset.bgGradient,
        borderColor: preset.borderColor,
        lightBg: preset.lightBg,
        emoji: preset.emoji,
        coloredBlocks: [],
      };
    });
  });

  if (!isOpen) return null;

  const handleTeamNameChange = (idx: number, newName: string) => {
    setTeams((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], name: newName };
      return next;
    });
  };

  const handleTeamColorChange = (idx: number, presetIndex: number) => {
    const preset = TEAM_COLOR_PRESETS[presetIndex];
    setTeams((prev) => {
      const next = [...prev];
      next[idx] = {
        ...next[idx],
        color: preset.color,
        textColor: preset.textColor,
        bgGradient: preset.bgGradient,
        borderColor: preset.borderColor,
        lightBg: preset.lightBg,
      };
      return next;
    });
  };

  const handleTeamEmojiChange = (idx: number, emoji: string) => {
    setTeams((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], emoji };
      return next;
    });
  };

  const handleConfirm = () => {
    const activeTeams = teams.slice(0, teamCount).map((t, i) => ({
      ...t,
      id: i,
      coloredBlocks: [], // Fresh reset on start
    }));

    onStartGame(activeTeams, {
      teamCount,
      wildcardOnSix,
      timerSeconds,
      soundEnabled,
      ttsEnabled: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2">
              <span className="p-2 bg-indigo-100 text-indigo-700 rounded-xl text-lg">🏰</span>
              게임 설정 (Game Setup)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              참여할 팀 수와 각 팀의 이름, 대표 색상을 설정하세요.
            </p>
          </div>
        </div>

        <div className="py-5 space-y-6">
          {/* Team count selection */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
              참여 팀 수 선택
            </label>
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {[2, 3, 4, 5, 6].map((count) => {
                const isSelected = teamCount === count;
                return (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setTeamCount(count)}
                    className={`py-3 px-2 rounded-2xl font-black text-center transition-all cursor-pointer border-2 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md scale-102 ring-2 ring-indigo-200'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="text-lg sm:text-xl">{count}팀</div>
                    <div className="text-[11px] font-semibold opacity-75">
                      {count === 2 ? '1:1 대결' : `${count}개 타워`}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Teams details */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
              팀별 이름 & 색상 지정 ({teamCount}개 팀)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-1">
              {teams.slice(0, teamCount).map((team, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl border-2 flex flex-col gap-2 transition-all shadow-xs"
                  style={{
                    backgroundColor: team.lightBg,
                    borderColor: team.color,
                  }}
                >
                  <div className="flex items-center gap-2">
                    {/* Emoji selector dropdown / preview */}
                    <select
                      value={team.emoji}
                      onChange={(e) => handleTeamEmojiChange(idx, e.target.value)}
                      className="bg-white rounded-lg p-1 text-lg border border-slate-300 font-bold cursor-pointer"
                    >
                      {EMOJI_OPTIONS.map((em) => (
                        <option key={em} value={em}>
                          {em}
                        </option>
                      ))}
                    </select>

                    {/* Team Name Input */}
                    <input
                      type="text"
                      value={team.name}
                      onChange={(e) => handleTeamNameChange(idx, e.target.value)}
                      placeholder={`Team ${idx + 1}`}
                      className="flex-1 bg-white px-3 py-1.5 rounded-lg border border-slate-300 text-sm font-black text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Color presets palette */}
                  <div className="flex items-center gap-1.5 justify-end">
                    <span className="text-[11px] text-slate-500 font-bold mr-1">색상:</span>
                    {TEAM_COLOR_PRESETS.map((preset, pIdx) => {
                      const isActive = team.color === preset.color;
                      return (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => handleTeamColorChange(idx, pIdx)}
                          className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                            isActive ? 'scale-125 ring-2 ring-slate-800 shadow-xs' : 'hover:scale-110'
                          }`}
                          style={{ backgroundColor: preset.color }}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Game Rules / Options */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
              규칙 & 부가 기능
            </label>

            {/* Lucky 6 Wildcard option */}
            <label className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200 cursor-pointer">
              <input
                type="checkbox"
                checked={wildcardOnSix}
                onChange={(e) => setWildcardOnSix(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded-md text-amber-600 focus:ring-amber-500"
              />
              <div className="text-xs">
                <span className="font-bold text-amber-900 block">
                  ★ 주사위 6번 황금 보너스 (골든 찬스)
                </span>
                <span className="text-amber-700">
                  주사위 6번이 나오면 1~5번 블록 중 원하는 유효 지지대 블록을 자유롭게 선택할 수 있습니다.
                </span>
              </div>
            </label>

            {/* Turn timer option */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-bold text-slate-700">
                  턴 제한 시간 (스마트보드 타이머)
                </span>
              </div>
              <div className="flex gap-1.5">
                {[
                  { label: '없음', val: null },
                  { label: '30초', val: 30 },
                  { label: '45초', val: 45 },
                  { label: '60초', val: 60 },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setTimerSeconds(opt.val)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      timerSeconds === opt.val
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-bold transition-colors cursor-pointer"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl text-sm font-extrabold shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>게임 시작하기 (Start Game)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
