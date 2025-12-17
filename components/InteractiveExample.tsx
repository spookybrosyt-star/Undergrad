
import React, { useState } from 'react';
import { ChevronDown, Zap } from 'lucide-react';

interface InteractiveExampleProps {
  title: string;
  problem: string;
  steps: string[];
}

const InteractiveExample: React.FC<InteractiveExampleProps> = ({ title, problem, steps }) => {
  const [visibleSteps, setVisibleSteps] = useState(0);

  const showNext = () => {
    if (visibleSteps < steps.length) setVisibleSteps(prev => prev + 1);
  };

  return (
    <div className="glass-card rounded-2xl border-white/5 overflow-hidden my-10 shadow-lg">
      <div className="p-5 bg-white/5 border-b border-white/5 flex items-center gap-3">
        <div className="p-2 bg-rose-600/10 rounded-lg text-rose-500 border border-rose-600/20">
          <Zap size={18} fill="currentColor" />
        </div>
        <h3 className="font-bold text-white text-lg tracking-tight">Example: {title}</h3>
      </div>
      
      <div className="p-8">
        <div className="text-2xl font-mono bg-neutral-900 border border-white/5 p-8 rounded-xl text-center text-rose-300 mb-10 shadow-inner">
          {problem}
        </div>

        <div className="space-y-6">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={`transition-all duration-500 transform ${
                idx < visibleSteps ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden'
              }`}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center font-bold text-white text-xs shadow-md shadow-rose-600/20">
                  {idx + 1}
                </div>
                <div className="pt-1 text-neutral-300 leading-relaxed text-lg">
                  {step}
                </div>
              </div>
              {idx < steps.length - 1 && idx < visibleSteps && (
                <div className="ml-4 h-6 border-l-2 border-white/5 my-2"></div>
              )}
            </div>
          ))}
        </div>

        {visibleSteps < steps.length && (
          <button
            onClick={showNext}
            className="mt-10 w-full py-4 bg-white/5 hover:bg-white/10 border border-white/5 text-neutral-400 hover:text-white rounded-xl flex items-center justify-center gap-2 transition-all font-bold text-xs uppercase tracking-widest click-effect"
          >
            Show Next Step <ChevronDown size={16} />
          </button>
        )}
        
        {visibleSteps === steps.length && (
          <div className="mt-10 text-center text-emerald-400 font-bold text-xs uppercase tracking-widest bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10 animate-in fade-in">
            Example Complete
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveExample;
