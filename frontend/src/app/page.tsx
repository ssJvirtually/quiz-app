'use client';

import { useEffect, useState } from 'react';
import { fetchQuestions, Question } from '@/lib/api';
import QuestionCard from '@/components/QuestionCard';
import { CloudLightning, Loader2 } from 'lucide-react';

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <main className="min-h-screen p-4 sm:p-8 lg:p-12 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-10 relative z-10">
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg mb-4">
            <CloudLightning className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
            Cloud Cert Prep
          </h1>
          <p className="text-slate-400 text-lg max-w-lg mx-auto leading-relaxed">
            Master your cloud certification with our premium adaptive practice questions.
          </p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
            <p className="text-slate-500 animate-pulse">Loading questions...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-200">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {questions.map((q) => (
              <QuestionCard key={q.id} question={q} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
