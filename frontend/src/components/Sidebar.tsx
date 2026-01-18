interface SidebarProps {
    totalQuestions: number;
    currentQuestionIndex: number;
    onSelectQuestion: (index: number) => void;
    answers: Record<string, string>; // Map of questionId -> selectedOption
    questions: { id: string }[];
}

export default function Sidebar({
    totalQuestions,
    currentQuestionIndex,
    onSelectQuestion,
    answers,
    questions
}: SidebarProps) {
    return (
        <aside className="fixed left-0 top-16 bottom-0 w-72 bg-slate-900/50 backdrop-blur-xl border-r border-white/5 p-6 hidden lg:block overflow-y-auto">
            <div className="space-y-6">
                <div>
                    <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                        Questions
                    </h2>
                    <div className="grid grid-cols-4 gap-3">
                        {Array.from({ length: totalQuestions }).map((_, idx) => {
                            const isActive = currentQuestionIndex === idx;
                            const questionId = questions[idx]?.id;
                            const isAnswered = answers[questionId];

                            let baseClasses = "relative flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 border";

                            if (isActive) {
                                baseClasses += " bg-cyan-500 text-white border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)] scale-110 z-10";
                            } else if (isAnswered) {
                                baseClasses += " bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20";
                            } else {
                                baseClasses += " bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:border-white/20";
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => onSelectQuestion(idx)}
                                    className={baseClasses}
                                >
                                    {idx + 1}
                                    {isAnswered && !isActive && (
                                        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                    <h3 className="text-xs font-semibold text-slate-500 mb-2">Legend</h3>
                    <div className="space-y-2 text-xs text-slate-400">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-cyan-500" />
                            <span>Current</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/30" />
                            <span>Answered</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-white/5 border border-white/10" />
                            <span>Unanswered</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
