"use client";

import { useState } from "react";
import Link from "next/link";
import { UserNav } from "@/components/UserNav";
import { Sidebar } from "@/components/Sidebar";
import { WorkspaceManager } from "./WorkspaceManager";

export function WorkspaceLayout({ 
  issues, 
  milestones, 
  repoFullName 
}: { 
  issues: any[], 
  milestones: any[], 
  repoFullName: string 
}) {
  const [showDocInput, setShowDocInput] = useState(false);

  return (
    <div className="bg-background-light text-slate-900 min-h-screen font-sans">
      <div className="min-h-screen flex flex-col bg-white">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between border-b backdrop-blur-md px-8 py-4 sticky top-0 z-50 bg-white/95 border-slate-200">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="size-10 rounded-lg flex items-center justify-center text-white bg-primary">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-primary">AI Workspace</h2>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link className="text-sm font-semibold text-primary" href="/repositories">Repositories</Link>
              <button 
                onClick={() => setShowDocInput(true)}
                className="text-sm font-medium text-slate-500 hover:text-primary transition-colors"
              >
                Documents
              </button>
              <a className="text-sm font-medium text-slate-500 hover:text-primary transition-colors" href="#">Settings</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 overflow-hidden">
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              <span className="hidden sm:inline">Push Changes</span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <UserNav />
          </div>
        </header>

        <main className="flex-1 flex overflow-hidden h-[calc(100vh-73px)]">
          {/* Left Sidebar */}
          <aside className="w-80 border-r border-slate-200 p-6 flex flex-col gap-8 overflow-y-auto bg-white">
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Current Scope</h3>
              <div className="p-4 rounded-xl text-white grainy-gradient shadow-lg shadow-primary/20 overflow-hidden">
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">Repository</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="material-symbols-outlined text-lg">code</span>
                  <p className="text-sm font-bold truncate">{repoFullName}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">AI Source Document</h3>
              <div 
                onClick={() => setShowDocInput(true)}
                className="group relative flex flex-col items-center justify-center border-2 border-dashed border-primary/20 rounded-xl p-8 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
              >
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">upload_file</span>
                </div>
                <p className="text-sm font-bold text-slate-900 text-center">Update Analysis</p>
                <p className="text-xs text-slate-500 text-center mt-1">Re-scan PRD/Specs</p>
              </div>
            </div>
            
            <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400 uppercase tracking-widest">Stats</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Live Issues</span>
                  <span className="font-bold">{issues.length}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Milestones</span>
                  <span className="font-bold">{milestones.length}</span>
                </div>
              </div>
            </div>

            <div className="mt-auto p-4 bg-primary/5 rounded-xl border border-primary/10">
              <p className="text-xs font-bold text-primary mb-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                AI Status
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed italic">
                Scanning your PRD for potential task updates...
              </p>
            </div>
          </aside>

          {/* Main Stage */}
          <section className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
            <div className="max-w-5xl mx-auto">
              <WorkspaceManager 
                initialIssues={issues} 
                initialMilestones={milestones}
                repoName={repoFullName}
                showDocInput={showDocInput}
                setShowDocInput={setShowDocInput}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
