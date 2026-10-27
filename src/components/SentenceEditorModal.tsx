import React, { useState } from 'react';
import { MissionSentence } from '../types/game';
import { DEFAULT_MISSION_SENTENCES } from '../utils/towerGrid';
import { RotateCcw, Check, X, BookOpen } from 'lucide-react';

interface SentenceEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  sentences: MissionSentence[];
  onSave: (newSentences: MissionSentence[]) => void;
}

export const SentenceEditorModal: React.FC<SentenceEditorModalProps> = ({
  isOpen,
  onClose,
  sentences,
  onSave,
}) => {
  const [editedSentences, setEditedSentences] = useState<MissionSentence[]>(() => {
    return sentences.map((s) => ({ ...s }));
  });
  const [activeDiceTab, setActiveDiceTab] = useState<number>(1);

  if (!isOpen) return null;

  const currentItem =
    editedSentences.find((s) => s.dice === activeDiceTab) || editedSentences[0];

  const updateCurrentItem = (field: keyof MissionSentence, value: string) => {
    setEditedSentences((prev) =>
      prev.map((item) =>
        item.dice === activeDiceTab ? { ...item, [field]: value } : item
      )
    );
  };

  const handleResetDefaults = () => {
    if (confirm('모든 문장을 기본 학습 문장으로 되돌리시겠습니까?')) {
      setEditedSentences(DEFAULT_MISSION_SENTENCES.map((s) => ({ ...s })));
    }
  };

  const handleSave = () => {
    onSave(editedSentences);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                주사위 미션 영어 문장 수정
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                수업 진도 및 단원에 맞춰 1~6번 주사위 문장을 자유롭게 변경하세요.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dice Selector Tabs */}
        <div className="py-4">
          <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
            편집할 주사위 눈금 선택
          </label>
          <div className="grid grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((num) => {
              const isSelected = activeDiceTab === num;
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => setActiveDiceTab(num)}
                  className={`py-2 px-1 rounded-xl font-black text-sm transition-all flex flex-col items-center gap-0.5 cursor-pointer border-2 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <span>🎲 {num}번</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form fields */}
        <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div>
            <label className="block text-xs font-black text-blue-700 mb-1 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-sm bg-blue-500 text-white flex items-center justify-center text-[10px]">
                Q
              </span>
              질문 (영어 Question)
            </label>
            <input
              type="text"
              value={currentItem.questionEn}
              onChange={(e) => updateCurrentItem('questionEn', e.target.value)}
              className="w-full bg-white px-3.5 py-2 rounded-xl border border-slate-300 font-bold text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
              질문 번역 (한국어 뜻)
            </label>
            <input
              type="text"
              value={currentItem.questionKo}
              onChange={(e) => updateCurrentItem('questionKo', e.target.value)}
              className="w-full bg-white px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-2 border-t border-slate-200">
            <label className="block text-xs font-black text-emerald-700 mb-1 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-sm bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                A
              </span>
              대답 (영어 Answer)
            </label>
            <input
              type="text"
              value={currentItem.answerEn}
              onChange={(e) => updateCurrentItem('answerEn', e.target.value)}
              className="w-full bg-white px-3.5 py-2 rounded-xl border border-slate-300 font-bold text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
              대답 번역 (한국어 뜻)
            </label>
            <input
              type="text"
              value={currentItem.answerKo}
              onChange={(e) => updateCurrentItem('answerKo', e.target.value)}
              className="w-full bg-white px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-5">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>기본 문장으로 초기화</span>
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl text-sm font-bold transition-colors cursor-pointer"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-extrabold shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>문장 저장하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
