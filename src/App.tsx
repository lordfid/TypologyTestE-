/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { UserAnswer, Question, TestResult } from './types';
import { questions } from './questions';
import { calculateFinalResult } from './scoring/calculateResults';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';

export default function App() {
  // Load initial theme from localStorage or default to 'dark'
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('mendalam_theme');
    return (saved === 'light') ? 'light' : 'dark';
  });

  const [screen, setScreen] = useState<'start' | 'quiz' | 'result'>('start');
  const [answers, setAnswers] = useState<{ [questionId: string]: UserAnswer }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  // Sync theme modifications to DOM body
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('mendalam_theme', theme);
  }, [theme]);

  // When Starting the assessment
  const handleStartQuiz = () => {
    // Collect ONLY the main questions first (90 questions)
    const mainQs = questions.filter(q => q.phase === 'main');
    setActiveQuestions(mainQs);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setTestResult(null);
    setScreen('quiz');
  };

  const handleSelectOption = (optionIndex: number) => {
    const currentQ = activeQuestions[currentQuestionIndex];
    if (!currentQ) return;

    const newAnswer: UserAnswer = {
      questionId: currentQ.id,
      selectedOptionIndex: optionIndex,
      skipped: false
    };

    setAnswers(prev => ({ ...prev, [currentQ.id]: newAnswer }));

    // Move Forward
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Evaluate if adaptation or tie-breaking is necessary
      evaluateNextSteps({ ...answers, [currentQ.id]: newAnswer });
    }
  };

  const handleSkipQuestion = () => {
    const currentQ = activeQuestions[currentQuestionIndex];
    if (!currentQ) return;

    const skipAnswer: UserAnswer = {
      questionId: currentQ.id,
      selectedOptionIndex: 0,
      skipped: true
    };

    setAnswers(prev => ({ ...prev, [currentQ.id]: skipAnswer }));

    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      evaluateNextSteps({ ...answers, [currentQ.id]: skipAnswer });
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Evaluate if tie-breakers should be loaded
  const evaluateNextSteps = (currentAnswersList: { [key: string]: UserAnswer }) => {
    const answersArray = Object.values(currentAnswersList);

    // Initial pre-estimation of the final result
    const preResult = calculateFinalResult(answersArray);
    
    // Sort and check closeness of top candidates
    const top2Matches = preResult.topMBTIMatches;
    const gap = top2Matches[0].score - top2Matches[1].score;

    // Trigger tie breaker if gap is narrow (< 10) AND we are still in 'main' phase
    const isMainPhaseOnly = activeQuestions.every(q => q.phase === 'main');

    if (gap < 10 && isMainPhaseOnly) {
      // Look up if we have an active tie breaker question targeting this pair specifically
      const candidate1 = top2Matches[0].type;
      const candidate2 = top2Matches[1].type;

      const matchedTieBreaker = questions.filter(
        q => q.phase === 'tie-break' &&
        q.tieBreakerFor?.includes(candidate1) &&
        q.tieBreakerFor?.includes(candidate2)
      );

      if (matchedTieBreaker.length > 0) {
        // Splice the tie breaker questions dynamically in the path!
        setActiveQuestions(prev => [...prev, ...matchedTieBreaker]);
        // Jump straight to the newly added questions
        setCurrentQuestionIndex(activeQuestions.length);
        return; // Halt transitioning to results
      }
    }

    // Otherwise, transit to Results Dashboard immediately
    const finalReport = calculateFinalResult(answersArray);
    setTestResult(finalReport);
    setScreen('result');
  };

  const handleRestart = () => {
    setScreen('start');
  };

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-500`}>
      {screen === 'start' && (
        <StartScreen
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onStart={handleStartQuiz}
        />
      )}
      
      {screen === 'quiz' && (
        <QuizScreen
          theme={theme}
          onToggleTheme={handleToggleTheme}
          questions={activeQuestions}
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          onSelectOption={handleSelectOption}
          onSkipQuestion={handleSkipQuestion}
          onPreviousQuestion={handlePreviousQuestion}
        />
      )}

      {screen === 'result' && testResult && (
        <ResultScreen
          theme={theme}
          onToggleTheme={handleToggleTheme}
          result={testResult}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
