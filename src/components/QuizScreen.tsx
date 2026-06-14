/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft, ArrowRight, EyeOff, Sun, Moon, HelpCircle } from 'lucide-react';
import { Question, UserAnswer } from '../types';

interface QuizScreenProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  questions: Question[];
  currentQuestionIndex: number;
  answers: { [key: string]: UserAnswer };
  onSelectOption: (optionIndex: number) => void;
  onSkipQuestion: () => void;
  onPreviousQuestion: () => void;
}

export default function QuizScreen({
  theme,
  onToggleTheme,
  questions,
  currentQuestionIndex,
  answers,
  onSelectOption,
  onSkipQuestion,
  onPreviousQuestion
}: QuizScreenProps) {
  const isDark = theme === 'dark';
  const currentQuestion = questions[currentQuestionIndex];
  
  if (!currentQuestion) return null;

  const totalQuestions = questions.length;
  const progressPercent = Math.round(((currentQuestionIndex) / totalQuestions) * 100);
  const currentAnswer = answers[currentQuestion.id];

  return (
    <div className={`min-h-screen flex flex-col justify-between py-8 px-4 md:px-8 transition-colors duration-500 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Top Header */}
      <header className="max-w-3xl w-full mx-auto flex justify-between items-center sm:pb-4 border-b border-slate-500/10 active:border-slate-500/20">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-slate-500">
            Fase: {currentQuestion.phase === 'main' ? 'Pertanyaan Utama' : 'Penajam / Tie-break'}
          </span>
          <p className="font-sans font-bold text-sm text-indigo-500 leading-none">
            Kemurnian Karakter Psike
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            id="quiz-theme-btn"
            className={`p-2.5 rounded-xl border transition-all duration-300 ${isDark ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-sky-400' : 'border-slate-200 bg-white hover:bg-slate-100 text-indigo-600'}`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* Progressive Progress Meter */}
      <div className="max-w-3xl w-full mx-auto mt-6">
        <div className="flex justify-between items-center text-xs font-mono text-slate-500 mb-2">
          <span>PROGRES MATRIKS</span>
          <span>{currentQuestionIndex + 1} / {totalQuestions} ({progressPercent}%)</span>
        </div>
        <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-905 bg-slate-900' : 'bg-slate-200'}`}>
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.max(3, progressPercent)}%` }}
          />
        </div>
      </div>

      {/* Main Question Card Structure */}
      <main className="max-w-3xl w-full mx-auto my-auto py-8">
        <div className="space-y-6">
          
          {/* Question Text Info */}
          <div className="space-y-3">
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/30 border-slate-800/80 text-slate-400' : 'bg-slate-100/50 border-slate-200 text-slate-600'} text-xs font-mono select-none flex items-start gap-2.5`}>
              <HelpCircle size={16} className="text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-indigo-500">Konteks: </span> {currentQuestion.contextType}
                <span className="mx-2">|</span>
                <span className="font-bold text-indigo-500">Tekanan: </span> {currentQuestion.pressureType}
              </div>
            </div>

            <h3 className="font-sans text-xl md:text-2xl font-semibold leading-relaxed tracking-tight">
              {currentQuestion.text}
            </h3>

            {/* Reminder Tip */}
            <p className="font-mono text-xs text-amber-500 italic select-none">
              💡 {currentQuestion.reminder || "Pilih yang paling sering terjadi dalam ingatan nyatamu, bukan apa yang paling indah."}
            </p>
          </div>

          {/* Answer Options Grid - Touch friendly (min height 44px, generous borders) */}
          <div className="space-y-4 pt-4">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = currentAnswer && !currentAnswer.skipped && currentAnswer.selectedOptionIndex === idx;

              return (
                <button
                  key={idx}
                  onClick={() => onSelectOption(idx)}
                  className={`w-full p-5 rounded-2xl text-left font-sans font-medium text-base transition-all duration-300 border flex justify-between items-center group cursor-pointer ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-600/10 text-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                      : isDark
                      ? 'border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 hover:border-slate-700 text-slate-200'
                      : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-800 shadow-sm'
                  }`}
                  style={{ minHeight: '52px' }}
                >
                  <span className="flex-1 pr-4">{opt.text}</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-500 text-white'
                      : 'border-slate-400 group-hover:border-slate-500'
                  }`}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </main>

      {/* Bottom Floating Navigation Console */}
      <footer className="max-w-3xl w-full mx-auto flex justify-between gap-4 pt-6 border-t border-slate-500/10 active:border-slate-500/20">
        
        {/* Back Button */}
        <button
          onClick={onPreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-sans font-semibold text-sm transition-all ${
            currentQuestionIndex === 0
              ? 'opacity-30 cursor-not-allowed text-slate-500'
              : isDark
              ? 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
          }`}
          title="Kembali ke pertanyaan sebelumnya"
        >
          <ArrowLeft size={16} /> Kembali
        </button>

        {/* Skip Button */}
        <button
          onClick={onSkipQuestion}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-sans font-semibold text-sm transition-all ${
            isDark
              ? 'text-slate-400 hover:bg-slate-900/50'
              : 'text-slate-600 hover:bg-slate-100 border border-transparent hover:border-slate-200'
          }`}
          title="Lewati pertanyaan ini dan hitung sisanya"
        >
          <EyeOff size={16} /> Lewati Skenario
        </button>

      </footer>

    </div>
  );
}
