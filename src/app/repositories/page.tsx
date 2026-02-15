import { auth } from"@/auth";
import { Sidebar } from"@/components/Sidebar";
import { TopBar } from"@/components/TopBar";
import { RepositoryCard } from"@/components/RepositoryCard";
import { getGitHubRepos } from"@/lib/github";
import { redirect } from"next/navigation";

export default async function RepositoriesPage() {
 const session = await auth();

 if (!session) {
 redirect("/");
 }

 // @ts-ignore
 const repos = await getGitHubRepos(session.accessToken);

 return (
 <div className="bg-background-light text-[#101019] font-sans antialiased min-h-screen">
 <div className="grainy-overlay"></div>
 <div className="flex h-screen overflow-hidden">
 <Sidebar />

 {/* Main Content */}
 <main className="flex-1 flex flex-col overflow-hidden relative">
 <TopBar />

 {/* Content Area */}
 <div className="flex-1 overflow-y-auto p-8 bg-background-light">
 <div className="max-w-6xl mx-auto">
 <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
 <div>
 <h2 className="text-3xl font-bold tracking-tight text-[#101019]">Connected Repositories</h2>
 <p className="text-[#57578e] mt-1">Manage and automate your synchronized GitHub projects</p>
 </div>
 <button className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl grainy-gradient shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform overflow-hidden whitespace-nowrap">
 <span className="material-symbols-outlined">add_circle</span>
 <span>Connect New Repo</span>
 </button>
 </div>

 {/* Filters/Tabs */}
 <div className="flex items-center gap-6 border-b border-primary/10 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
 <button className="pb-4 text-sm font-bold text-primary border-b-2 border-primary relative">
 All Repositories
 <span className="ml-2 px-2 py-0.5 bg-primary/10 rounded-full text-[10px]">{repos.length}</span>
 </button>
 <button className="pb-4 text-sm font-medium text-[#57578e] border-b-2 border-transparent hover:text-primary transition-colors">
 Active
 </button>
 <button className="pb-4 text-sm font-medium text-[#57578e] border-b-2 border-transparent hover:text-primary transition-colors">
 Paused
 </button>
 <button className="pb-4 text-sm font-medium text-[#57578e] border-b-2 border-transparent hover:text-primary transition-colors">
 Error
 </button>
 </div>

 {/* Repository Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {repos.map((repo: any) => (
 <RepositoryCard key={repo.id} repo={repo} />
 ))}

 {/* Add New Card */}
 <div className="rounded-xl border-2 border-dashed border-primary/20 p-6 flex flex-col items-center justify-center text-center hover:bg-primary/5 hover:border-primary/40 cursor-pointer transition-all group min-h-[220px]">
 <div className="size-14 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
 <span className="material-symbols-outlined text-3xl">add</span>
 </div>
 <h3 className="text-lg font-bold text-[#101019]">Add Repository</h3>
 <p className="text-sm text-[#57578e]">Connect another GitHub project to start automating</p>
 </div>
 </div>

 {repos.length === 0 && (
 <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-primary/10">
 <span className="material-symbols-outlined text-5xl text-primary/20 mb-4">search_off</span>
 <p className="text-[#57578e] font-medium">No repositories found. Try connecting a new one.</p>
 </div>
 )}
 </div>
 </div>
 </main>
 </div>
 </div>
 );
}
