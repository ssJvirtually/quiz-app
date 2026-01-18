'use client';

import { useEffect, useState } from 'react';
import { fetchQuestions, Question } from '@/lib/api';
import QuestionCard from '@/components/QuestionCard';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadQuestions() {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (err) {
        setError('Failed to load questions. Is the backend running?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadQuestions();
  }, []);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30">
      <Navbar />

      <div className="pt-16 flex h-[calc(100vh-4rem)]">
        {/* Sidebar - Hidden on mobile, visible on lg screens */}
        <Sidebar
          totalQuestions={questions.length}
          currentQuestionIndex={currentQuestionIndex}
          onSelectQuestion={setCurrentQuestionIndex}
          answers={answers}
          questions={questions}
        />

        {/* Main Content */}
        <main className="flex-1 relative overflow-y-auto p-4 sm:p-8 lg:p-12">
          {/* Background blobs */}
          <div className="fixed top-20 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
          <div className="fixed bottom-0 left-64 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10 pb-20">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-40 space-y-4">
                <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
                <p className="text-slate-500 animate-pulse">Loading questions...</p>
              </div>
            ) : error ? (
              <div className="p-6 text-center rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-200 mt-20">
                <p>{error}</p>
              </div>
            ) : currentQuestion ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-slate-200">
                    Question {currentQuestionIndex + 1}
                    <span className="text-slate-500 text-lg font-normal ml-2">/ {questions.length}</span>
                  </h1>
                </div>

                <QuestionCard
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  selectedAnswer={answers[currentQuestion.id]}
                />

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${currentQuestionIndex === 0
                        ? 'opacity-0 pointer-events-none'
                        : 'bg-white/5 hover:bg-white/10 active:scale-95 text-slate-300'
                      }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={currentQuestionIndex === questions.length - 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${currentQuestionIndex === questions.length - 1
                        ? 'opacity-50 cursor-not-allowed bg-white/5 text-slate-500' // Or hide if we want "Submit"
                        : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg shadow-cyan-500/20 active:scale-95'
                      }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-slate-500">No questions found.</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
