import Link from "next/link";

export default function RepositoriesPage() {
  const repos = [
    { name: "acme-org/web-app", status: "Active", lastSynced: "2m ago", icon: "terminal", members: 5 },
    { name: "personal/portfolio-v2", status: "Idle", lastSynced: "1h ago", icon: "layers", members: 1 },
    { name: "dev-team/api-gateway", status: "Active", lastSynced: "15m ago", icon: "api", members: 2 },
    { name: "data-science/ml-models", status: "Paused", lastSynced: "1d ago", icon: "database", members: 1 },
    { name: "frontend/design-system", status: "Active", lastSynced: "5m ago", icon: "brush", members: 3 },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#101019] font-sans antialiased min-h-screen">
      <div className="grainy-overlay"></div>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 flex-shrink-0 bg-white dark:bg-background-dark border-r border-primary/10 flex flex-col z-40">
          <div className="p-6 flex items-center gap-3">
            <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white grainy-gradient overflow-hidden">
              <span className="material-symbols-outlined">auto_mode</span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-primary">GitFlow</h1>
              <p className="text-[10px] uppercase tracking-widest text-[#57578e] font-semibold">Automation Suite</p>
            </div>
          </div>
          <nav className="flex-1 px-4 py-4 flex flex-col gap-1">
            <a className="flex items-center gap-3 px-4 py-3 text-[#57578e] hover:bg-primary/5 hover:text-primary rounded-lg transition-all duration-200" href="#">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="text-sm font-medium">Dashboard</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-lg grainy-gradient shadow-lg shadow-primary/20" href="#">
              <span className="material-symbols-outlined leading-none">account_tree</span>
              <span className="text-sm font-medium">Repositories</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-[#57578e] hover:bg-primary/5 hover:text-primary rounded-lg transition-all duration-200" href="#">
              <span className="material-symbols-outlined">bolt</span>
              <span className="text-sm font-medium">Workflows</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 text-[#57578e] hover:bg-primary/5 hover:text-primary rounded-lg transition-all duration-200" href="#">
              <span className="material-symbols-outlined">terminal</span>
              <span className="text-sm font-medium">Logs</span>
            </a>
            <div className="my-4 border-t border-primary/5"></div>
            <a className="flex items-center gap-3 px-4 py-3 text-[#57578e] hover:bg-primary/5 hover:text-primary rounded-lg transition-all duration-200" href="#">
              <span className="material-symbols-outlined">settings</span>
              <span className="text-sm font-medium">Settings</span>
            </a>
          </nav>
          <div className="p-4 mt-auto">
            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
              <p className="text-xs font-semibold text-primary mb-1">PRO PLAN</p>
              <p className="text-[11px] text-[#57578e] mb-3">You've used 12 of 20 repositories.</p>
              <div className="w-full bg-white dark:bg-slate-800 rounded-full h-1.5 mb-3 overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "60%" }}></div>
              </div>
              <button className="w-full py-2 bg-white dark:bg-slate-700 text-primary dark:text-white text-xs font-bold rounded-lg border border-primary/20 hover:bg-primary hover:text-white transition-colors">
                Upgrade
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {/* Header */}
          <header className="h-20 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 flex items-center justify-between px-8 z-30">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-full max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#57578e] text-xl">search</span>
                <input className="w-full pl-10 pr-4 py-2 bg-[#e9e9f1] dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-sm" placeholder="Search repositories..." type="text"/>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="size-10 flex items-center justify-center text-[#57578e] hover:bg-primary/5 rounded-full relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              </button>
              <div className="h-8 w-px bg-primary/10 mx-2"></div>
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold dark:text-white">Alex Rivera</p>
                  <p className="text-[10px] text-[#57578e]">Developer</p>
                </div>
                <div className="size-10 rounded-full border-2 border-primary/20 overflow-hidden">
                   <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB69kN1ykrK2_Z6OaADztjCzayG9aJr6U0Xo9lj290KeTuUls3RsroUu8y-D6Dl4YU93qekBA-6CCPCozyGNA1-DsSxsGWgkjEY8_TB0pvNfMQ0gDzMCjtQ9JUKM1KHz7a5figaSj02KQYQcfA6WUv95cP1vOfEmI2i0nNuIudquo8y7nw6Jx17sZ-Syfmw6k73UAEU3BdlS0F-VC_8vxlhhHDE3KED8xjvVKFn78dCdLttiG28SQq8PKPKOOj78KMI3QhDfOUv6Dxu"/>
                </div>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-8 bg-background-light dark:bg-background-dark/50">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-[#101019] dark:text-white">Connected Repositories</h2>
                  <p className="text-[#57578e] mt-1">Manage and automate your synchronized GitHub projects</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl grainy-gradient shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform overflow-hidden">
                  <span className="material-symbols-outlined">add_circle</span>
                  <span>Connect New Repo</span>
                </button>
              </div>

              {/* Filters/Tabs */}
              <div className="flex items-center gap-6 border-b border-primary/10 mb-8 overflow-x-auto whitespace-nowrap">
                <button className="pb-4 text-sm font-bold text-primary border-b-2 border-primary relative">
                  All Repositories
                  <span className="ml-2 px-2 py-0.5 bg-primary/10 rounded-full text-[10px]">12</span>
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
                {repos.map((repo, idx) => (
                  <Link href="/workspace" key={idx} className="bg-white dark:bg-background-dark rounded-xl border border-primary/10 p-6 flex flex-col group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="size-12 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-3xl">{repo.icon}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 ${repo.status === 'Active' ? 'bg-green-100 text-green-700' : repo.status === 'Idle' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'} text-[10px] font-bold rounded uppercase`}>
                          {repo.status}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-[#101019] dark:text-white mb-1 group-hover:text-primary transition-colors">{repo.name}</h3>
                    <p className="text-sm text-[#57578e] mb-6 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">history</span>
                      Last synced: {repo.lastSynced}
                    </p>
                    <div className="mt-auto pt-6 border-t border-primary/5 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[...Array(Math.min(repo.members, 3))].map((_, i) => (
                          <div key={i} className="size-6 rounded-full border-2 border-white dark:border-background-dark bg-slate-200 overflow-hidden">
                            <img alt="Team" src={`https://i.pravatar.cc/150?u=${repo.name}${i}`} />
                          </div>
                        ))}
                        {repo.members > 3 && (
                          <div className="size-6 rounded-full bg-primary/10 border-2 border-white dark:border-background-dark flex items-center justify-center text-[8px] font-bold text-primary">+{repo.members - 3}</div>
                        )}
                      </div>
                      <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg grainy-gradient opacity-90 hover:opacity-100 transition-opacity flex items-center gap-1 overflow-hidden">
                        Automate
                        <span className="material-symbols-outlined text-sm">bolt</span>
                      </button>
                    </div>
                  </Link>
                ))}

                {/* Add New Card */}
                <div className="rounded-xl border-2 border-dashed border-primary/20 p-6 flex flex-col items-center justify-center text-center hover:bg-primary/5 hover:border-primary/40 cursor-pointer transition-all group min-h-[220px]">
                  <div className="size-14 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl">add</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#101019] dark:text-white">Add Repository</h3>
                  <p className="text-sm text-[#57578e]">Connect another GitHub project to start automating</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
