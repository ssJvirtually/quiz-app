import { CloudLightning } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                            <CloudLightning className="w-6 h-6 text-cyan-400" />
                        </div>
                        <span className="text-lg font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
                            Cloud Cert Prep
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Placeholder for user profile or stats */}
                        <div className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
                            Practice Mode
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
