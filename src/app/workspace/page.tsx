import Link from "next/link";

import { IssueCard } from "@/components/IssueCard";

export default function WorkspacePage() {
  const issues = [
    {
      id: 1,
      title: "Implement OAuth 2.0 Authentication Flow",
      description: "Configure Supabase Auth with Google and GitHub providers as per Section 3.2 of the technical specification. Ensure JWT secret management follows security protocols.",
      labels: ["Backend", "High Priority"],
      status: "Draft"
    },
    {
      id: 2,
      title: "Design Normalized PostgreSQL Schema",
      description: "Map extracted entities (Users, Projects, Documents) to a relational structure. Include migrations for the 'Issues' table with GitHub sync fields.",
      labels: ["Database"],
      status: "Draft",
      isHighlighted: true
    },
    {
      id: 3,
      title: "Integrate Space Grotesk Typography System",
      description: "Setup Tailwind CSS configuration for 'display' and 'body' font families. Ensure fluid scaling across breakpoints.",
      labels: ["UI/UX"],
      status: "Draft"
    }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-sans">
      <div className="min-h-screen flex flex-col bg-white dark:bg-background-dark">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between border-b dark:bg-background-dark/80 backdrop-blur-md px-8 py-4 sticky top-0 z-50 bg-white/95 border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="size-10 rounded-lg flex items-center justify-center text-white bg-primary">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-primary">AI Workspace</h2>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <a className="text-sm font-semibold text-primary" href="#">Projects</a>
              <a className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" href="#">Documents</a>
              <a className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" href="#">Settings</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
              <input className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 w-64" placeholder="Search workspace..." type="text"/>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 overflow-hidden">
              <span className="material-symbols-outlined text-[18px]">sync_alt</span>
              Sync to GitHub
            </button>
            <div className="size-10 rounded-full border-2 border-primary/20 overflow-hidden">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3YTBLa0anwykr6qkc4V5pxdzik-YgfyHbKA-HWfQrkQO60tJeaUIt6O-IW_VAnTDuhQQTDpXMhb2UkbNkHno-8Y3kM13DrSa9Dvzbr2lKfCZ3lkqStvKJkT9EVQQ_E6M5DS3v5Veng_bolmgfV5edCIYCqy9a63_yzdDCQbQqSiNXNZg73GQ9OBXdyrtwdlOXcPd48A2t95MnK_WGC0_YtN9XXSRIAyifg1Ae_4ZUY-_GvKYl8zJ1ptlfkj160re7FK0-ars9F11l" alt="Profile" />
            </div>
          </div>
        </header>

        <main className="flex-1 flex overflow-hidden h-[calc(100vh-73px)]">
          {/* Left Sidebar: Document Management */}
          <aside className="w-80 border-r border-slate-200 dark:border-white/10 dark:bg-slate-900/40 p-6 flex flex-col gap-8 overflow-y-auto bg-white dark:bg-background-dark">
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Upload Center</h3>
              <div className="group relative flex flex-col items-center justify-center border-2 border-dashed border-primary/20 rounded-xl p-8 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white text-center">New Document</p>
                <p className="text-xs text-slate-500 text-center mt-1">PDF or DOCX (max 20MB)</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Current File</h3>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase">Analyzed</span>
              </div>
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-primary/5 shadow-sm">
                <div className="flex items-start gap-3 mb-4">
                  <div className="size-10 bg-red-50 text-red-500 rounded flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined font-thin">description</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate dark:text-white">Project_Specs_v2.pdf</p>
                    <p className="text-[11px] text-slate-400 italic">Extracted 24 issues</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] font-medium dark:text-slate-300">
                    <span>Analysis Progress</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: "100%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Quick Links</h3>
              <div className="grid grid-cols-1 gap-1">
                <a className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary font-bold rounded-lg text-sm" href="#">
                  <span className="material-symbols-outlined text-[20px]">task_alt</span>
                  Drafted Issues
                </a>
                <a className="flex items-center gap-3 px-3 py-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm transition-colors" href="#">
                  <span className="material-symbols-outlined text-[20px]">flag</span>
                  Milestones
                </a>
                <a className="flex items-center gap-3 px-3 py-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm transition-colors" href="#">
                  <span className="material-symbols-outlined text-[20px]">history</span>
                  History
                </a>
              </div>
            </div>
          </aside>

          {/* Main Stage */}
          <section className="flex-1 overflow-y-auto p-8 bg-slate-50 dark:bg-background-dark/30">
            <div className="max-w-4xl mx-auto space-y-10">
              {/* Section: Drafted Issues */}
              <div>
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2 dark:text-white">Drafted Issues</h1>
                    <p className="text-slate-500">AI has identified these potential tasks from your document.</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 border border-slate-200 dark:border-white/10 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors">
                      <span className="material-symbols-outlined">filter_list</span>
                    </button>
                    <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 dark:text-white font-bold rounded-lg text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Approve All</button>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  {issues.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
                </div>
              </div>

              {/* Section: Milestones */}
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-6 dark:text-white">Milestones Extraction</h2>
                <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-primary/10">
                  {/* Milestone 1 */}
                  <div className="relative">
                    <div className="absolute -left-[27px] top-1 size-5 rounded-full bg-primary border-4 border-white dark:border-background-dark shadow-sm z-10"></div>
                    <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-primary/5 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-primary">Phase 1: Project Foundation</h4>
                        <span className="text-xs font-medium text-slate-400">Target: Q3 2024</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Establishment of repository structure, CI/CD pipelines, and core authentication modules.</p>
                      <div className="mt-4 flex gap-2">
                        <div className="size-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold dark:text-white">JD</div>
                        <div className="size-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold dark:text-white">AL</div>
                      </div>
                    </div>
                  </div>
                  {/* Milestone 2 */}
                  <div className="relative opacity-60">
                    <div className="absolute -left-[27px] top-1 size-5 rounded-full bg-primary border-4 border-white dark:border-background-dark shadow-sm z-10"></div>
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold dark:text-white">Phase 2: MVP Feature Set</h4>
                        <span className="text-xs font-medium text-slate-400">Target: Q4 2024</span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Completion of the AI analysis engine and integration with GitHub Issues API.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right Status Panel */}
          <aside className="w-72 border-l border-slate-200 dark:border-white/10 dark:bg-slate-900/40 p-6 hidden xl:flex flex-col gap-6 overflow-y-auto bg-white dark:bg-background-dark">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Workspace Health</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl text-white grainy-gradient shadow-lg shadow-primary/20 overflow-hidden">
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">Synced to</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="material-symbols-outlined text-lg">code</span>
                  <p className="text-sm font-bold truncate">acme-corp/ai-workspace</p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-[10px] font-medium opacity-80">Last synced 2m ago</p>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-primary/5 shadow-sm space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Extraction Quality</span>
                  <span className="font-bold text-green-500">98%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Active Contributors</span>
                  <span className="font-bold dark:text-white">12</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Pending Approvals</span>
                  <span className="font-bold text-amber-500">18</span>
                </div>
              </div>
            </div>
            <div className="flex-1"></div>
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
              <p className="text-xs font-bold text-primary mb-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                AI Tip
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "Extracted issues are mapped to 'Requirement' blocks in your PDF. Review the priority levels for accuracy."
              </p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
