"use client";

import { useState, useMemo } from "react";
import { IssueCard } from "../IssueCard";
import { analyzeProjectDoc } from "@/app/actions/analyze";
import { syncToGitHub } from "@/app/actions/github";
import { motion, AnimatePresence } from "framer-motion";

interface Issue {
  id: string | number;
  title: string;
  description: string;
  labels: string[];
  status: "Draft" | "Open" | "Closed";
  milestoneId?: string | number | null;
  parentId?: string | number | null;
  type: "existing" | "draft";
}

interface Milestone {
  id: string | number;
  title: string;
  description?: string;
  due_on?: string;
}

export function WorkspaceManager({ 
  initialIssues, 
  initialMilestones, 
  repoName 
}: { 
  initialIssues: any[], 
  initialMilestones: any[],
  repoName: string
}) {
  const [issues, setIssues] = useState<Issue[]>(() => {
    return initialIssues.map(i => ({
      id: i.id,
      title: i.title,
      description: i.body || "No description provided.",
      labels: i.labels.map((l: any) => typeof l === 'string' ? l : l.name),
      status: (i.state === 'open' ? "Open" : "Closed") as "Open" | "Closed",
      milestoneId: i.milestone?.id || null,
      type: "existing"
    }));
  });

  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());
  const [approvedIds, setApprovedIds] = useState<Set<string | number>>(new Set());
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [showDocInput, setShowDocInput] = useState(false);
  const [docText, setDocText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleSelection = (id: string | number) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
      // Select children
      issues.filter(i => i.parentId === id).forEach(child => newSelected.add(child.id));
    }
    setSelectedIds(newSelected);
  };

  const toggleMilestone = (milestoneId: string | number) => {
    const milestoneIssues = issues.filter(i => i.milestoneId === milestoneId);
    const allSelected = milestoneIssues.length > 0 && milestoneIssues.every(i => selectedIds.has(i.id));
    
    const newSelected = new Set(selectedIds);
    if (allSelected) {
      milestoneIssues.forEach(i => newSelected.delete(i.id));
    } else {
      milestoneIssues.forEach(i => newSelected.add(i.id));
    }
    setSelectedIds(newSelected);
  };

  const selectAll = () => {
    if (selectedIds.size === issues.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(issues.map(i => i.id)));
    }
  };

  const handleAIAnalysis = async () => {
    if (!docText.trim()) return;
    setIsLoading(true);
    setLoadingText("Gemini is analyzing your document...");
    setShowDocInput(false);

    try {
      const formData = new FormData();
      formData.append("text", docText);
      const result = await analyzeProjectDoc(formData);

      if (result.success && result.data) {
        const { milestones: newMilestones, issues: newIssues } = result.data;
        setMilestones(prev => [...prev, ...newMilestones]);
        setIssues(prev => [...prev, ...newIssues]);
      } else {
        alert(result.error || "Failed to analyze document");
      }
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred during analysis.");
    } finally {
      setIsLoading(false);
      setDocText("");
    }
  };

  const handleSync = async () => {
    if (selectedIds.size === 0) return;
    setIsLoading(true);
    setLoadingText("Syncing approved tasks to GitHub...");

    const selectedIssues = issues.filter(i => selectedIds.has(i.id));
    const milestoneIds = new Set(selectedIssues.map(i => i.milestoneId).filter(Boolean));
    const selectedMilestones = milestones.filter(m => milestoneIds.has(m.id));

    try {
      const result = await syncToGitHub(repoName, {
        milestones: selectedMilestones,
        issues: selectedIssues
      });

      if (result.success) {
        setShowSuccess(true);
        setApprovedIds(prev => new Set([...Array.from(prev), ...Array.from(selectedIds)]));
        setSelectedIds(new Set());
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        alert(result.error || "Failed to sync to GitHub");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to sync to GitHub");
    } finally {
      setIsLoading(false);
    }
  };

  const issuesByMilestone = useMemo(() => {
    const grouped: Record<string, Issue[]> = { unassigned: [] };
    milestones.forEach(m => grouped[m.id] = []);
    
    issues.forEach(issue => {
      if (issue.milestoneId && grouped[issue.milestoneId]) {
        grouped[issue.milestoneId].push(issue);
      } else {
        grouped.unassigned.push(issue);
      }
    });
    return grouped;
  }, [issues, milestones]);

  return (
    <div className="space-y-8 relative">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="size-20 border-4 border-primary/10 border-t-primary rounded-full animate-spin mb-6"></div>
            <h2 className="text-2xl font-bold text-primary mb-2">{loadingText}</h2>
            <p className="text-slate-500 max-w-xs italic animate-pulse">This usually takes about 10-15 seconds...</p>
          </motion.div>
        )}

        {showDocInput && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <div className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl border border-primary/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                   <span className="material-symbols-outlined text-primary">auto_awesome</span>
                   Analyze Project Document
                </h3>
                <button onClick={() => setShowDocInput(false)} className="size-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                   <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <p className="text-slate-500 mb-4 text-sm">Paste your PRD, requirement list, or project notes below. Gemini will extract milestones and issues automatically.</p>
              <textarea 
                value={docText}
                onChange={(e) => setDocText(e.target.value)}
                placeholder="Example: We need to build a login page. Milestone 1 is Auth Setup. Issues: 1. Setup NextAuth. 2. Configure Providers..."
                className="w-full h-64 p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 transition-all resize-none mb-6 text-sm"
              />
              <div className="flex gap-3">
                <button 
                  onClick={handleAIAnalysis}
                  className="flex-1 bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20"
                >
                  <span className="material-symbols-outlined">psychology</span>
                  Analyze with Gemini
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {showSuccess && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-green-500 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl border border-white/20 flex items-center gap-3"
          >
            <span className="material-symbols-outlined">check_circle</span>
            Synced to GitHub successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between gap-4">
         <div className="flex-1">
            <h2 className="text-2xl font-bold">Issue Planner</h2>
            <p className="text-sm text-slate-500">Analyze documentation and sync approved tasks to GitHub.</p>
         </div>
         <button 
           onClick={() => setShowDocInput(true)}
           className="px-6 py-3 bg-white border border-primary/20 text-primary font-bold rounded-xl flex items-center gap-2 hover:bg-primary/5 transition-colors shadow-sm"
         >
           <span className="material-symbols-outlined">add_circle</span>
           Add Document
         </button>
      </div>

      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-primary/10 flex items-center justify-between shadow-sm">
        <label className="flex items-center gap-2 cursor-pointer group">
          <div 
            onClick={selectAll}
            className={`size-5 rounded border ${selectedIds.size === issues.length ? 'bg-primary border-primary' : 'border-slate-300'} flex items-center justify-center transition-all`}
          >
            {selectedIds.size === issues.length && <span className="material-symbols-outlined text-white text-[14px]">check</span>}
          </div>
          <span className="text-sm font-medium">
            {selectedIds.size > 0 ? `${selectedIds.size} selected` : 'Select All'}
          </span>
        </label>
        
        {selectedIds.size > 0 && (
          <div className="flex items-center gap-2">
            <button 
              onClick={handleSync}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold rounded-lg text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">sync</span>
              Sync to GitHub
            </button>
          </div>
        )}
      </div>

      <div className="space-y-12">
        {milestones.map(milestone => {
          const mIssues = issuesByMilestone[milestone.id] || [];
          const allSelected = mIssues.length > 0 && mIssues.every(i => selectedIds.has(i.id));
          
          return (
            <section key={milestone.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    onClick={() => toggleMilestone(milestone.id)}
                    className={`size-6 rounded border cursor-pointer flex items-center justify-center transition-all ${allSelected ? 'bg-primary border-primary' : 'border-slate-300'}`}
                  >
                    {allSelected && <span className="material-symbols-outlined text-white text-[16px]">check</span>}
                  </div>
                  <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">flag</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{milestone.title}</h3>
                    {milestone.due_on && (
                      <p className="text-xs text-slate-500 font-medium">Target: {new Date(milestone.due_on).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid gap-3 pl-14 relative">
                <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-slate-100"></div>
                {mIssues.map(issue => (
                  <InteractiveIssueCard 
                    key={issue.id} 
                    issue={issue}
                    isSelected={selectedIds.has(issue.id)}
                    isApproved={approvedIds.has(issue.id)}
                    onSelect={() => toggleSelection(issue.id)}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {issuesByMilestone.unassigned?.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-xl font-bold pl-4 border-l-4 border-slate-300">Unassigned issues</h3>
            <div className="grid gap-3">
              {issuesByMilestone.unassigned.map(issue => (
                <InteractiveIssueCard 
                  key={issue.id} 
                  issue={issue}
                  isSelected={selectedIds.has(issue.id)}
                  isApproved={approvedIds.has(issue.id)}
                  onSelect={() => toggleSelection(issue.id)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function InteractiveIssueCard({ issue, isSelected, isApproved, onSelect }: any) {
  return (
    <div 
      className={`group bg-white border rounded-2xl p-4 transition-all duration-200 cursor-pointer flex gap-4 
        ${isSelected ? 'border-primary ring-2 ring-primary/10 translate-x-1' : 'border-slate-200 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5'} 
        ${isApproved ? 'bg-green-50/50 grayscale-[0.5] opacity-80' : ''}`}
      onClick={() => onSelect()}
    >
      <div className="flex-shrink-0 pt-1">
        <div className={`size-5 rounded border ${isSelected ? 'bg-primary border-primary' : 'border-slate-300'} flex items-center justify-center transition-all`}>
          {isSelected && <span className="material-symbols-outlined text-white text-[14px]">check</span>}
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 text-[10px] font-bold uppercase tracking-wider">
          {issue.type === 'draft' ? (
            <span className="text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">auto_awesome</span>
              AI Draft
            </span>
          ) : (
            <span className="text-slate-400">Existing</span>
          )}
          {isApproved && (
            <span className="text-green-600 flex items-center gap-1 ml-auto">
              <span className="material-symbols-outlined text-xs">check_circle</span>
              Synced
            </span>
          )}
        </div>
        <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{issue.title}</h4>
        <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">{issue.description}</p>
        
        {issue.labels?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {issue.labels.map((label: string, idx: number) => (
              <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-black rounded border border-slate-200 uppercase">
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
