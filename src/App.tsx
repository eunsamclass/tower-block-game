import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { DiceRoller } from './components/DiceRoller';
import { MissionBanner } from './components/MissionBanner';
import { TowerCard } from './components/TowerCard';
import { SetupModal } from './components/SetupModal';
import { WinnerModal } from './components/WinnerModal';
import { SentenceEditorModal } from './components/SentenceEditorModal';
import { RuleGuideModal } from './components/RuleGuideModal';
import {
  Team,
  Block,
  MissionSentence,
  GameSettings,
} from './types/game';
import {
  DEFAULT_MISSION_SENTENCES,
  TEAM_COLOR_PRESETS,
  getTeamTowerHeight,
} from './utils/towerGrid';
import { generateStandaloneHtml } from './utils/exportHtml';

export default function App() {
  // Game Settings
  const [settings, setSettings] = useState<GameSettings>({
    teamCount: 4,
    wildcardOnSix: true,
    timerSeconds: null,
    soundEnabled: true,
    ttsEnabled: true,
  });

  // Sentences
  const [sentences, setSentences] = useState<MissionSentence[]>(
    DEFAULT_MISSION_SENTENCES
  );

  // Teams
  const [teams, setTeams] = useState<Team[]>(() => {
    return TEAM_COLOR_PRESETS.slice(0, 4).map((preset, idx) => ({
      id: idx,
      name: preset.name,
      color: preset.color,
      textColor: preset.textColor,
      bgGradient: preset.bgGradient,
      borderColor: preset.borderColor,
      lightBg: preset.lightBg,
      emoji: preset.emoji,
      coloredBlocks: [],
    }));
  });

  // Current turn state
  const [currentTeamIndex, setCurrentTeamIndex] = useState<number>(0);
  const [currentDice, setCurrentDice] = useState<number | null>(1);
  const [round, setRound] = useState<number>(1);
  const [history, setHistory] = useState<
    { teamId: number; blockId: string; round: number }[]
  >([]);

  // Modals state
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);
  const [isSentenceEditorOpen, setIsSentenceEditorOpen] = useState(false);
  const [isRuleGuideOpen, setIsRuleGuideOpen] = useState(false);
  const [winnerTeam, setWinnerTeam] = useState<Team | null>(null);

  // Timer state
  const [timerRemaining, setTimerRemaining] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Global toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Turn timer effect
  useEffect(() => {
    if (settings.timerSeconds && !isWinnerModalOpen) {
      setTimerRemaining(settings.timerSeconds);
      if (timerRef.current) clearInterval(timerRef.current);

      timerRef.current = setInterval(() => {
        setTimerRemaining((prev) => {
          if (prev === null || prev <= 1) {
            handlePassTurn();
            return settings.timerSeconds;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    } else {
      setTimerRemaining(null);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [currentTeamIndex, settings.timerSeconds, isWinnerModalOpen]);

  const currentTeam = teams[currentTeamIndex] || teams[0];
  const currentSentence =
    sentences.find((s) => s.dice === (currentDice || 1)) || sentences[0];

  // Handle dice change
  const handleDiceChange = (num: number) => {
    setCurrentDice(num);
  };

  // Handle placing a block
  const handlePlaceBlock = (teamId: number, block: Block) => {
    // Add block to team
    setTeams((prev) =>
      prev.map((t) => {
        if (t.id === teamId) {
          return {
            ...t,
            coloredBlocks: [...t.coloredBlocks, block.id],
          };
        }
        return t;
      })
    );

    // Save to history for undo
    setHistory((prev) => [
      ...prev,
      { teamId, blockId: block.id, round },
    ]);

    // Check victory condition: reached top row (row index 9 = Level 10)
    if (block.row === 9) {
      const winning = teams.find((t) => t.id === teamId);
      if (winning) {
        setWinnerTeam({
          ...winning,
          coloredBlocks: [...winning.coloredBlocks, block.id],
        });
        setIsWinnerModalOpen(true);
      }
      return;
    }

    // Automatically advance turn with short feedback delay
    setTimeout(() => {
      handlePassTurn();
    }, 400);
  };

  // Pass turn to next team
  const handlePassTurn = () => {
    setCurrentTeamIndex((prev) => {
      const next = (prev + 1) % teams.length;
      if (next === 0) {
        setRound((r) => r + 1);
      }
      return next;
    });
  };

  // Undo last placed block
  const handleUndo = () => {
    if (history.length === 0) return;
    const lastAction = history[history.length - 1];

    setTeams((prev) =>
      prev.map((t) => {
        if (t.id === lastAction.teamId) {
          return {
            ...t,
            coloredBlocks: t.coloredBlocks.filter(
              (id) => id !== lastAction.blockId
            ),
          };
        }
        return t;
      })
    );

    setHistory((prev) => prev.slice(0, prev.length - 1));
    showToast('마지막 블록 배치를 되돌렸습니다.');
  };

  // Start new game with fresh setup
  const handleStartGame = (newTeams: Team[], newSettings: GameSettings) => {
    setTeams(newTeams);
    setSettings(newSettings);
    setCurrentTeamIndex(0);
    setCurrentDice(1);
    setRound(1);
    setHistory([]);
    setWinnerTeam(null);
    setIsWinnerModalOpen(false);
    showToast('새로운 게임이 시작되었습니다!');
  };

  // Play again with same teams
  const handlePlayAgain = () => {
    setTeams((prev) =>
      prev.map((t) => ({
        ...t,
        coloredBlocks: [],
      }))
    );
    setCurrentTeamIndex(0);
    setCurrentDice(1);
    setRound(1);
    setHistory([]);
    setWinnerTeam(null);
    setIsWinnerModalOpen(false);
    showToast('새 게임이 시작되었습니다! 화이팅!');
  };

  // Export single standalone HTML file
  const handleExportHtml = () => {
    const htmlContent = generateStandaloneHtml(sentences);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tower_blocks_game.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('단일 HTML 파일(오프라인 실행용)이 다운로드되었습니다!');
  };

  // Determine grid column layout based on team count
  const getGridColsClass = () => {
    switch (teams.length) {
      case 2:
        return 'grid-cols-1 md:grid-cols-2 max-w-4xl';
      case 3:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl';
      case 4:
        return 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 max-w-7xl';
      case 5:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-7xl';
      case 6:
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 max-w-7xl';
      default:
        return 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 max-w-7xl';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Top Header */}
      <Header
        currentTeam={currentTeam}
        round={round}
        soundEnabled={settings.soundEnabled}
        onToggleSound={() =>
          setSettings((s) => ({ ...s, soundEnabled: !s.soundEnabled }))
        }
        onPassTurn={handlePassTurn}
        onUndo={handleUndo}
        canUndo={history.length > 0}
        onOpenSetup={() => setIsSetupModalOpen(true)}
        onOpenRules={() => setIsRuleGuideOpen(true)}
        onOpenSentenceEditor={() => setIsSentenceEditorOpen(true)}
        onExportHtml={handleExportHtml}
        timerRemaining={timerRemaining}
      />

      {/* Global Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white px-5 py-2.5 rounded-2xl shadow-xl text-sm font-bold animate-bounce-in flex items-center gap-2">
          <span>🔔</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-3 sm:p-5 flex flex-col gap-4 max-w-7xl mx-auto w-full">
        {/* Upper Dashboard: Dice & Mission Sentence Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
          {/* Dice Controller */}
          <div className="lg:col-span-4 xl:col-span-3 flex">
            <div className="w-full">
              <DiceRoller
                currentDice={currentDice}
                onDiceChange={handleDiceChange}
                soundEnabled={settings.soundEnabled}
              />
            </div>
          </div>

          {/* Mission Dialogue Card */}
          <div className="lg:col-span-8 xl:col-span-9 flex">
            <div className="w-full">
              <MissionBanner
                currentSentence={currentSentence}
                currentDice={currentDice}
                wildcardOnSix={settings.wildcardOnSix}
                soundEnabled={settings.soundEnabled}
              />
            </div>
          </div>
        </div>

        {/* Central Tower Boards Area */}
        <section className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2 px-1">
            <h2 className="text-xs sm:text-sm font-black text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <span>🏰</span>
              <span>팀별 타워 현황판 ({teams.length}개 팀)</span>
            </h2>
            <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
              ★ 바닥 1층부터 차례대로 지지대를 연결하며 쌓아 올리세요!
            </span>
          </div>

          <div
            className={`grid gap-3 sm:gap-4 mx-auto w-full ${getGridColsClass()}`}
          >
            {teams.map((team, idx) => (
              <TowerCard
                key={team.id}
                team={team}
                isActiveTurn={idx === currentTeamIndex}
                currentDice={currentDice}
                wildcardOnSix={settings.wildcardOnSix}
                soundEnabled={settings.soundEnabled}
                onPlaceBlock={handlePlaceBlock}
                onInvalidClick={(msg) => showToast(msg)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer info banner */}
      <footer className="bg-white border-t border-slate-200 py-2.5 px-4 text-center text-xs text-slate-500 font-medium">
        <span>
          타워 블록 게임 (Tower Blocks Game) · 초등 영어 미래 시제 표현 수업 교구 · 교실 전자칠판 / 스마트보드 최적화
        </span>
      </footer>

      {/* Modals */}
      <SetupModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
        onStartGame={handleStartGame}
        currentTeams={teams}
        currentSettings={settings}
      />

      <WinnerModal
        winner={winnerTeam}
        isOpen={isWinnerModalOpen}
        onPlayAgain={handlePlayAgain}
        onOpenSetup={() => {
          setIsWinnerModalOpen(false);
          setIsSetupModalOpen(true);
        }}
        soundEnabled={settings.soundEnabled}
      />

      <SentenceEditorModal
        isOpen={isSentenceEditorOpen}
        onClose={() => setIsSentenceEditorOpen(false)}
        sentences={sentences}
        onSave={(newSentences) => {
          setSentences(newSentences);
          showToast('미션 문장이 성공적으로 업데이트되었습니다!');
        }}
      />

      <RuleGuideModal
        isOpen={isRuleGuideOpen}
        onClose={() => setIsRuleGuideOpen(false)}
      />
    </div>
  );
}
