import Link from"next/link";

export function Sidebar() {
 return (
 <aside className="w-64 flex-shrink-0 bg-white border-r border-primary/10 flex flex-col z-40">
 <div className="p-6 flex items-center gap-3">
 <Link href="/" className="flex items-center gap-3">
 <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white grainy-gradient overflow-hidden">
 <span className="material-symbols-outlined">auto_mode</span>
 </div>
 <div>
 <h1 className="text-lg font-bold tracking-tight text-primary">GitFlow</h1>
 <p className="text-[10px] uppercase tracking-widest text-[#57578e] font-semibold">Automation Suite</p>
 </div>
 </Link>
 </div>
 <nav className="flex-1 px-4 py-4 flex flex-col gap-1">
 <Link className="flex items-center gap-3 px-4 py-3 text-[#57578e] hover:bg-primary/5 hover:text-primary rounded-lg transition-all duration-200" href="#">
 <span className="material-symbols-outlined text-xl">dashboard</span>
 <span className="text-sm font-medium">Dashboard</span>
 </Link>
 <Link className="flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-lg grainy-gradient shadow-lg shadow-primary/20" href="/repositories">
 <span className="material-symbols-outlined leading-none text-xl">account_tree</span>
 <span className="text-sm font-medium">Repositories</span>
 </Link>
 <Link className="flex items-center gap-3 px-4 py-3 text-[#57578e] hover:bg-primary/5 hover:text-primary rounded-lg transition-all duration-200" href="#">
 <span className="material-symbols-outlined text-xl">bolt</span>
 <span className="text-sm font-medium">Workflows</span>
 </Link>
 <Link className="flex items-center gap-3 px-4 py-3 text-[#57578e] hover:bg-primary/5 hover:text-primary rounded-lg transition-all duration-200" href="#">
 <span className="material-symbols-outlined text-xl">terminal</span>
 <span className="text-sm font-medium">Logs</span>
 </Link>
 <div className="my-4 border-t border-primary/5"></div>
 <Link className="flex items-center gap-3 px-4 py-3 text-[#57578e] hover:bg-primary/5 hover:text-primary rounded-lg transition-all duration-200" href="#">
 <span className="material-symbols-outlined text-xl">settings</span>
 <span className="text-sm font-medium">Settings</span>
 </Link>
 </nav>
 <div className="p-4 mt-auto">
 <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
 <p className="text-xs font-semibold text-primary mb-1">PRO PLAN</p>
 <p className="text-[11px] text-[#57578e] mb-3">You've used 12 of 20 repositories.</p>
 <div className="w-full bg-white rounded-full h-1.5 mb-3 overflow-hidden">
 <div className="bg-primary h-full rounded-full" style={{ width:"60%" }}></div>
 </div>
 <button className="w-full py-2 bg-white text-primary text-xs font-bold rounded-lg border border-primary/20 hover:bg-primary hover:text-white transition-colors">
 Upgrade
 </button>
 </div>
 </div>
 </aside>
 );
}
