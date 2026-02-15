import Link from"next/link";

interface Repository {
 id: number;
 name: string;
 full_name: string;
 description: string | null;
 html_url: string;
 updated_at: string;
 stargazers_count: number;
 language: string | null;
 owner: {
 login: string;
 avatar_url: string;
 };
}

export function RepositoryCard({ repo }: { repo: Repository }) {
 const lastUpdated = new Date(repo.updated_at).toLocaleDateString(undefined, {
 month: 'short',
 day: 'numeric',
 });

 return (
 <Link
 href={`/workspace?repo=${repo.full_name}`}
 className="bg-white rounded-xl border border-primary/10 p-6 flex flex-col group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
 >
 <div className="flex items-start justify-between mb-4">
 <div className="size-12 bg-primary/5 rounded-lg flex items-center justify-center text-primary">
 <span className="material-symbols-outlined text-3xl">
 {repo.language === 'TypeScript' || repo.language === 'JavaScript' ? 'terminal' : 'account_tree'}
 </span>
 </div>
 <div className="flex gap-2">
 <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">
 Active
 </span>
 </div>
 </div>
 <h3 className="text-lg font-bold text-[#101019] mb-1 group-hover:text-primary transition-colors truncate">
 {repo.name}
 </h3>
 <p className="text-xs text-[#57578e] mb-2 truncate">
 {repo.owner.login}
 </p>
 <p className="text-sm text-[#57578e] mb-6 flex items-center gap-1">
 <span className="material-symbols-outlined text-xs">history</span>
 Updated: {lastUpdated}
 </p>
 <div className="mt-auto pt-6 border-t border-primary/5 flex items-center justify-between">
 <div className="flex items-center gap-2 text-[#57578e]">
 <span className="material-symbols-outlined text-sm">star</span>
 <span className="text-xs font-medium">{repo.stargazers_count}</span>
 {repo.language && (
 <span className="text-[10px] ml-2 px-1.5 py-0.5 bg-gray-100 rounded">
 {repo.language}
 </span>
 )}
 </div>
 <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg grainy-gradient opacity-90 hover:opacity-100 transition-opacity flex items-center gap-1 overflow-hidden">
 Automate
 <span className="material-symbols-outlined text-sm">bolt</span>
 </button>
 </div>
 </Link>
 );
}
