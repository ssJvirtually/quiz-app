'use client';

import { useState } from 'react';
import { Question } from '@/lib/api';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuestionCardProps {
    question: Question;
    onAnswer: (questionId: string, answer: string) => void;
    selectedAnswer?: string;
}

export default function QuestionCard({ question, onAnswer, selectedAnswer }: QuestionCardProps) {
    // Local state for immediate feedback/explanation animation,
    // but actual selection state is lifted up or passed down to persist.
    // Actually, let's derive display state from props mostly, but we can keep explanation local if we want,
    // OR we simply show explanation if selectedAnswer is present.

    const isSelected = !!selectedAnswer;
    const isCorrect = selectedAnswer === question.correctAnswer;

    const handleSelect = (option: string) => {
        if (isSelected) return;
        onAnswer(question.id, option);
    };

    return (
        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 transition-all duration-300 hover:shadow-cyan-500/10 hover:shadow-2xl">
            <div className="space-y-4">
                <h3 className="text-xl font-semibold leading-relaxed text-slate-100">
                    {question.questionText}
                </h3>

                <div className="grid gap-3 pt-2">
                    {question.options.map((option) => {
                        const isSelectedOption = selectedAnswer === option;
                        const isCorrectOption = question.correctAnswer === option;

                        let buttonStyle = "glass-button w-full text-left p-4 rounded-xl font-medium transition-all duration-200 border border-white/5";

                        if (isSelected) {
                            if (isCorrectOption) {
                                buttonStyle = "w-full text-left p-4 rounded-xl font-medium bg-emerald-500/20 border-emerald-500/50 text-emerald-100";
                            } else if (isSelectedOption) {
                                buttonStyle = "w-full text-left p-4 rounded-xl font-medium bg-rose-500/20 border-rose-500/50 text-rose-100";
                            } else {
                                buttonStyle = "w-full text-left p-4 rounded-xl font-medium opacity-50 cursor-not-allowed border border-white/5";
                            }
                        } else {
                            buttonStyle += " hover:bg-white/10 hover:scale-[1.01] active:scale-[0.99]";
                        }

                        return (
                            <button
                                key={option}
                                onClick={() => handleSelect(option)}
                                disabled={isSelected}
                                className={buttonStyle}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{option}</span>
                                    {isSelected && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                                    {isSelected && isSelectedOption && !isCorrectOption && <XCircle className="w-5 h-5 text-rose-400" />}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {isSelected && (
                <div className={`p-4 rounded-xl border ${isCorrect ? 'bg-emerald-950/30 border-emerald-500/30' : 'bg-slate-900/50 border-slate-700'} animate-in fade-in slide-in-from-top-2`}>
                    <p className="font-semibold text-sm text-slate-400 mb-1">Explanation</p>
                    <p className="text-slate-200 leading-relaxed text-sm opacity-90">
                        {question.explanation}
                    </p>
                </div>
            )}
        </div>
    );
}
