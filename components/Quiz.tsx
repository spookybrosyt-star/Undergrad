
import React, { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw, Trophy, ArrowRight } from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuizProps {
  id: string;
  title: string;
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ id, title, questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (optionIndex: number) => {
    if (showExplanation || isFinished) return;
    
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setIsFinished(true);
    const correctCount = answers.reduce((acc, ans, idx) => {
      return ans === questions[idx].correctIndex ? acc + 1 : acc;
    }, 0);
    const score = Math.round((correctCount / questions.length) * 100);
    onComplete(score);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setAnswers(new Array(questions.length).fill(-1));
    setShowExplanation(false);
    setIsFinished(false);
  };

  if (isFinished) {
    const correctCount = answers.reduce((acc, ans, idx) => ans === questions[idx].correctIndex ? acc + 1 : acc, 0);
    const score = Math.round((correctCount / questions.length) * 100);

    return (
      <div className="glass-card rounded-2xl p-10 text-center border-rose-500/20 shadow-xl my-10 animate-in zoom-in-95 duration-500">
        <div className="w-16 h-16 bg-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-600/20">
          <Trophy className="text-white" size={32} />
        </div>
        <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Quiz Complete</h3>
        <p className="text-neutral-400 mb-8 text-lg">Final Score: <span className="text-rose-400 font-bold">{score}%</span></p>
        <button 
          onClick={resetQuiz}
          className="bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-xl font-bold text-sm border border-white/5 transition-all click-effect"
        >
          <RefreshCw size={16} className="inline mr-2" /> Retake Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isAnswered = answers[currentIndex] !== -1;
  const isCorrect = isAnswered && answers[currentIndex] === currentQuestion.correctIndex;

  return (
    <div className="glass-card rounded-2xl overflow-hidden border-white/10 shadow-xl my-10">
      <div className="bg-white/5 p-6 border-b border-white/5 flex justify-between items-center">
        <h4 className="font-bold text-rose-400 flex items-center gap-2 text-sm uppercase tracking-widest">
           {title}
        </h4>
        <span className="text-[10px] font-bold px-3 py-1 bg-black/40 border border-white/5 rounded-lg text-neutral-500 tracking-wider">
          QUESTION {currentIndex + 1} / {questions.length}
        </span>
      </div>
      
      <div className="p-8">
        <p className="text-xl font-bold text-white mb-8 leading-snug">{currentQuestion.text}</p>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            let stateClass = "bg-white/5 border-white/5 hover:border-rose-500/30 hover:bg-white/10 text-neutral-300";
            
            if (isAnswered) {
              if (idx === currentQuestion.correctIndex) {
                stateClass = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
              } else if (idx === answers[currentIndex]) {
                stateClass = "bg-rose-500/10 border-rose-500/30 text-rose-400";
              } else {
                stateClass = "opacity-40 border-white/5";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-5 rounded-xl border transition-all flex justify-between items-center text-base font-medium click-effect ${stateClass}`}
              >
                <span>{option}</span>
                {isAnswered && idx === currentQuestion.correctIndex && <CheckCircle size={20} className="text-emerald-400" />}
                {isAnswered && idx === answers[currentIndex] && idx !== currentQuestion.correctIndex && <XCircle size={20} className="text-rose-400" />}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className={`mt-8 p-6 rounded-xl border animate-in slide-in-from-top-1 duration-300 ${isCorrect ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-rose-500/5 border-rose-500/10'}`}>
            <p className={`font-bold mb-2 flex items-center gap-2 text-xs uppercase tracking-widest ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isCorrect ? <CheckCircle size={16}/> : <XCircle size={16}/>}
              {isCorrect ? "Correct" : "Incorrect"}
            </p>
            <p className="text-neutral-400 leading-relaxed text-base">{currentQuestion.explanation}</p>
          </div>
        )}

        {isAnswered && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              className="bg-rose-600 hover:bg-rose-500 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-rose-600/20 flex items-center gap-2 click-effect"
            >
              {currentIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"} <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
