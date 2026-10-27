export interface Block {
  id: string;
  row: number; // 0 (bottom) to 9 (top trophy row)
  col: number; // 0 to 11 (12 column grid)
  colSpan: number; // width in columns
  num: number; // 1, 2, 3, 4, 5
}

export interface Team {
  id: number;
  name: string;
  color: string; // primary hex
  textColor: string;
  bgGradient: string;
  borderColor: string;
  lightBg: string;
  emoji: string;
  coloredBlocks: string[];
}

export interface MissionSentence {
  dice: number;
  questionEn: string;
  answerEn: string;
  questionKo: string;
  answerKo: string;
}

export interface GameSettings {
  teamCount: number;
  wildcardOnSix: boolean; // Dice 6 = can choose any number 1-5
  timerSeconds: number | null; // null for no timer, or 30, 45, 60
  soundEnabled: boolean;
  ttsEnabled: boolean;
}

export type GameStatus = 'setup' | 'playing' | 'gameover';
