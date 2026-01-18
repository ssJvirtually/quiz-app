import { RotateCw, CheckCircle2 } from 'lucide-react';

interface ResultCardProps {
    score: number;
    total: number;
    onRestart: () => void;
}

export default function ResultCard({ score, total, onRestart }: ResultCardProps) {
    const percentage = Math.round((score / total) * 100);

    let message = "Keep Practicing!";
    let colorClass = "text-slate-400";

    if (percentage >= 90) {
        message = "Outstanding!";
        colorClass = "text-emerald-400";
    } else if (percentage >= 70) {
        message = "Great Job!";
        colorClass = "text-cyan-400";
    } else if (percentage >= 50) {
        message = "Good Effort!";
        colorClass = "text-blue-400";
    }

    return (
        <div className="glass-card max-w-lg mx-auto p-8 rounded-3xl text-center space-y-8 animate-in zoom-in-95 duration-500">
            <div className="space-y-2">
                <h2 className={`text-3xl font-bold ${colorClass}`}>{message}</h2>
                <p className="text-slate-400">You completed the quiz!</p>
            </div>

            <div className="relative inline-flex items-center justify-center">
                <svg className="w-48 h-48 transform -rotate-90">
                    <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        className="text-slate-800"
                    />
                    <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 88}
                        strokeDashoffset={2 * Math.PI * 88 * (1 - percentage / 100)}
                        className={`${percentage >= 70 ? 'text-emerald-500' : 'text-cyan-500'} transition-all duration-1000 ease-out`}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-extrabold text-slate-100">{percentage}%</span>
                    <span className="text-slate-500 text-sm font-medium mt-1">{score} / {total} Correct</span>
                </div>
            </div>

            <div className="pt-6 border-t border-white/5">
                <button
                    onClick={onRestart}
                    className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 active:scale-[0.98] border border-white/10 text-slate-200 font-bold flex items-center justify-center gap-2 transition-all"
                >
                    <RotateCw className="w-4 h-4" />
                    Restart Quiz
                </button>
            </div>
        </div>
    );
}
