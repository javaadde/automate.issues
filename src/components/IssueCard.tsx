'use client';

import { useState } from "react";

export function IssueCard({ issue }: { issue: any }) {
  const [isApproved, setIsApproved] = useState(false);

  return (
    <div className={`group bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow ${issue.isHighlighted ? 'border-l-4 border-l-primary/30' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {issue.labels.map((label: string, lidx: number) => (
              <span key={lidx} className={`px-2 py-0.5 ${label === 'High Priority' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'} text-[10px] font-bold rounded uppercase`}>
                {label}
              </span>
            ))}
            {isApproved && (
              <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] font-bold rounded uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-[10px]">check_circle</span>
                Approved
              </span>
            )}
          </div>
          <h4 className="text-lg font-bold mb-1 dark:text-white">{issue.title}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{issue.description}</p>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
            <span className="material-symbols-outlined">delete</span>
          </button>
          <button 
            onClick={() => setIsApproved(!isApproved)}
            className={`ml-2 px-4 py-2 ${isApproved ? 'bg-slate-100 dark:bg-slate-800 text-slate-500' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'} font-bold rounded-lg text-sm transition-all`}
          >
            {isApproved ? 'Revoke' : 'Approve'}
          </button>
        </div>
      </div>
    </div>
  );
}
