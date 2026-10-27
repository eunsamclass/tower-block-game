import { Block, MissionSentence } from '../types/game';

export const TOTAL_ROWS = 10;
export const TOTAL_COLS = 12;

export const TOWER_BLOCKS: Block[] = [
  // Layer 1 (Row 0 - Bottom / Ground)
  { id: 'b_0_0', row: 0, col: 0, colSpan: 2, num: 2 },
  { id: 'b_0_1', row: 0, col: 2, colSpan: 3, num: 3 },
  { id: 'b_0_2', row: 0, col: 5, colSpan: 2, num: 4 },
  { id: 'b_0_3', row: 0, col: 7, colSpan: 3, num: 5 },
  { id: 'b_0_4', row: 0, col: 10, colSpan: 2, num: 2 },

  // Layer 2 (Row 1)
  { id: 'b_1_0', row: 1, col: 0, colSpan: 3, num: 3 },
  { id: 'b_1_1', row: 1, col: 3, colSpan: 2, num: 2 },
  { id: 'b_1_2', row: 1, col: 5, colSpan: 2, num: 1 },
  { id: 'b_1_3', row: 1, col: 7, colSpan: 2, num: 1 },
  { id: 'b_1_4', row: 1, col: 9, colSpan: 1, num: 3 },
  { id: 'b_1_5', row: 1, col: 10, colSpan: 2, num: 1 },

  // Layer 3 (Row 2)
  { id: 'b_2_0', row: 2, col: 0, colSpan: 3, num: 1 },
  { id: 'b_2_1', row: 2, col: 3, colSpan: 2, num: 3 },
  { id: 'b_2_2', row: 2, col: 5, colSpan: 3, num: 5 },
  { id: 'b_2_3', row: 2, col: 8, colSpan: 1, num: 3 },
  { id: 'b_2_4', row: 2, col: 9, colSpan: 1, num: 4 },
  { id: 'b_2_5', row: 2, col: 10, colSpan: 2, num: 1 },

  // Layer 4 (Row 3)
  { id: 'b_3_0', row: 3, col: 0, colSpan: 2, num: 5 },
  { id: 'b_3_1', row: 3, col: 2, colSpan: 2, num: 4 },
  { id: 'b_3_2', row: 3, col: 4, colSpan: 2, num: 4 },
  { id: 'b_3_3', row: 3, col: 6, colSpan: 2, num: 1 },
  { id: 'b_3_4', row: 3, col: 8, colSpan: 4, num: 2 },

  // Layer 5 (Row 4)
  { id: 'b_4_0', row: 4, col: 0, colSpan: 2, num: 5 },
  { id: 'b_4_1', row: 4, col: 2, colSpan: 2, num: 3 },
  { id: 'b_4_2', row: 4, col: 4, colSpan: 1, num: 1 },
  { id: 'b_4_3', row: 4, col: 5, colSpan: 1, num: 5 },
  { id: 'b_4_4', row: 4, col: 6, colSpan: 2, num: 3 },
  { id: 'b_4_5', row: 4, col: 8, colSpan: 2, num: 1 },
  { id: 'b_4_6', row: 4, col: 10, colSpan: 2, num: 4 },

  // Layer 6 (Row 5)
  { id: 'b_5_0', row: 5, col: 0, colSpan: 3, num: 1 },
  { id: 'b_5_1', row: 5, col: 3, colSpan: 2, num: 5 },
  { id: 'b_5_2', row: 5, col: 5, colSpan: 1, num: 2 },
  { id: 'b_5_3', row: 5, col: 6, colSpan: 3, num: 3 },
  { id: 'b_5_4', row: 5, col: 9, colSpan: 3, num: 2 },

  // Layer 7 (Row 6)
  { id: 'b_6_0', row: 6, col: 0, colSpan: 2, num: 5 },
  { id: 'b_6_1', row: 6, col: 2, colSpan: 1, num: 2 },
  { id: 'b_6_2', row: 6, col: 3, colSpan: 2, num: 4 },
  { id: 'b_6_3', row: 6, col: 5, colSpan: 1, num: 5 },
  { id: 'b_6_4', row: 6, col: 6, colSpan: 3, num: 1 },
  { id: 'b_6_5', row: 6, col: 9, colSpan: 3, num: 3 },

  // Layer 8 (Row 7)
  { id: 'b_7_0', row: 7, col: 0, colSpan: 3, num: 1 },
  { id: 'b_7_1', row: 7, col: 3, colSpan: 2, num: 3 },
  { id: 'b_7_2', row: 7, col: 5, colSpan: 1, num: 3 },
  { id: 'b_7_3', row: 7, col: 6, colSpan: 3, num: 2 },
  { id: 'b_7_4', row: 7, col: 9, colSpan: 3, num: 4 },

  // Layer 9 (Row 8)
  { id: 'b_8_0', row: 8, col: 0, colSpan: 2, num: 3 },
  { id: 'b_8_1', row: 8, col: 2, colSpan: 3, num: 2 },
  { id: 'b_8_2', row: 8, col: 5, colSpan: 2, num: 4 },
  { id: 'b_8_3', row: 8, col: 7, colSpan: 2, num: 5 },
  { id: 'b_8_4', row: 8, col: 9, colSpan: 3, num: 1 },

  // Layer 10 (Row 9 - Top / Trophy Line 🏆)
  { id: 'b_9_0', row: 9, col: 0, colSpan: 2, num: 3 },
  { id: 'b_9_1', row: 9, col: 2, colSpan: 2, num: 2 },
  { id: 'b_9_2', row: 9, col: 4, colSpan: 3, num: 4 },
  { id: 'b_9_3', row: 9, col: 7, colSpan: 2, num: 5 },
  { id: 'b_9_4', row: 9, col: 9, colSpan: 3, num: 1 },
];

// Map by ID for quick lookup
export const BLOCKS_BY_ID = new Map<string, Block>(
  TOWER_BLOCKS.map((b) => [b.id, b])
);

// Check if block has supporting foundation colored directly underneath
export function isBlockSupported(
  block: Block,
  coloredBlockIds: Set<string> | string[]
): boolean {
  if (block.row === 0) {
    return true; // Ground level is always physically supported
  }

  const coloredSet =
    coloredBlockIds instanceof Set ? coloredBlockIds : new Set(coloredBlockIds);

  const rowBelow = block.row - 1;
  const blocksBelow = TOWER_BLOCKS.filter((b) => b.row === rowBelow);

  return blocksBelow.some((lowerBlock) => {
    if (!coloredSet.has(lowerBlock.id)) return false;
    // Check horizontal overlap
    const overlapStart = Math.max(block.col, lowerBlock.col);
    const overlapEnd = Math.min(
      block.col + block.colSpan,
      lowerBlock.col + lowerBlock.colSpan
    );
    return overlapStart < overlapEnd;
  });
}

// Check if block can be placed given the current dice
export function isBlockPlaceable(
  block: Block,
  coloredBlockIds: Set<string> | string[],
  currentDice: number | null,
  wildcardOnSix: boolean = true
): boolean {
  const coloredSet =
    coloredBlockIds instanceof Set ? coloredBlockIds : new Set(coloredBlockIds);

  if (coloredSet.has(block.id)) return false;
  if (!isBlockSupported(block, coloredSet)) return false;
  if (currentDice === null) return false;

  if (currentDice === 6 && wildcardOnSix) {
    return true; // Lucky 6 wildcard allows picking any supported block
  }

  return block.num === currentDice;
}

// Calculate highest layer reached (1 to 10)
export function getTeamTowerHeight(coloredBlockIds: string[]): number {
  if (coloredBlockIds.length === 0) return 0;
  let maxRow = -1;
  for (const id of coloredBlockIds) {
    const block = BLOCKS_BY_ID.get(id);
    if (block && block.row > maxRow) {
      maxRow = block.row;
    }
  }
  return maxRow + 1; // 1-based level
}

// Default English Mission Sentences from curriculum
export const DEFAULT_MISSION_SENTENCES: MissionSentence[] = [
  {
    dice: 1,
    questionEn: 'What are you going to do tomorrow?',
    answerEn: "I'm going to see a movie.",
    questionKo: '너는 내일 무엇을 할 예정이니?',
    answerKo: '나는 영화를 볼 거야.',
  },
  {
    dice: 2,
    questionEn: 'What are you going to do this weekend?',
    answerEn: "I'm going to go to the library.",
    questionKo: '너는 이번 주말에 무엇을 할 예정이니?',
    answerKo: '나는 도서관에 갈 거야.',
  },
  {
    dice: 3,
    questionEn: 'What are you going to do this Wednesday?',
    answerEn: "I'm going to walk the dog.",
    questionKo: '너는 이번 수요일에 무엇을 할 예정이니?',
    answerKo: '나는 개를 산책시킬 거야.',
  },
  {
    dice: 4,
    questionEn: 'What are you going to do this afternoon?',
    answerEn: "I'm going to do my science project.",
    questionKo: '너는 오늘 오후에 무엇을 할 예정이니?',
    answerKo: '나는 과학 과제(프로젝트)를 할 거야.',
  },
  {
    dice: 5,
    questionEn: 'What are you going to do this Thursday?',
    answerEn: "I'm going to watch a baseball game.",
    questionKo: '너는 이번 목요일에 무엇을 할 예정이니?',
    answerKo: '나는 야구 경기를 볼 예정이야.',
  },
  {
    dice: 6,
    questionEn: 'What are you going to do tomorrow?',
    answerEn: "I'm going to stay home. (★ Lucky 6!)",
    questionKo: '너는 내일 뭐 할 거야?',
    answerKo: '나는 집에 있을 거야. (★ 원하는 블록 자유 선택!)',
  },
];

// Presets for teams
export const TEAM_COLOR_PRESETS = [
  {
    color: '#EF4444',
    textColor: '#FFFFFF',
    bgGradient: 'from-rose-500 to-red-600',
    borderColor: '#DC2626',
    lightBg: '#FEE2E2',
    name: 'Red Team (빨강팀)',
    emoji: '🦁',
  },
  {
    color: '#3B82F6',
    textColor: '#FFFFFF',
    bgGradient: 'from-sky-500 to-blue-600',
    borderColor: '#2563EB',
    lightBg: '#DBEAFE',
    name: 'Blue Team (파랑팀)',
    emoji: '🐬',
  },
  {
    color: '#EAB308',
    textColor: '#78350F',
    bgGradient: 'from-amber-400 to-yellow-500',
    borderColor: '#CA8A04',
    lightBg: '#FEF9C3',
    name: 'Yellow Team (노랑팀)',
    emoji: '🐯',
  },
  {
    color: '#10B981',
    textColor: '#FFFFFF',
    bgGradient: 'from-emerald-400 to-teal-600',
    borderColor: '#059669',
    lightBg: '#D1FAE5',
    name: 'Green Team (초록팀)',
    emoji: '🦖',
  },
  {
    color: '#8B5CF6',
    textColor: '#FFFFFF',
    bgGradient: 'from-violet-500 to-purple-600',
    borderColor: '#7C3AED',
    lightBg: '#EDE9FE',
    name: 'Purple Team (보라팀)',
    emoji: '🦄',
  },
  {
    color: '#F97316',
    textColor: '#FFFFFF',
    bgGradient: 'from-orange-400 to-amber-600',
    borderColor: '#EA580C',
    lightBg: '#FFEDD5',
    name: 'Orange Team (주황팀)',
    emoji: '🦊',
  },
];
