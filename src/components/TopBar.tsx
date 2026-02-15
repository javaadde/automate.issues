import { UserNav } from"./UserNav";

export function TopBar() {
 return (
 <header className="h-20 bg-white/80 backdrop-blur-md border-b border-primary/10 flex items-center justify-between px-8 z-30">
 <div className="flex items-center gap-4 flex-1">
 <div className="relative w-full max-w-md">
 <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#57578e] text-xl">
 search
 </span>
 <input
 className="w-full pl-10 pr-4 py-2 bg-[#e9e9f1] border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-sm"
 placeholder="Search repositories..."
 type="text"
 />
 </div>
 </div>
 <div className="flex items-center gap-4">
 <button className="size-10 flex items-center justify-center text-[#57578e] hover:bg-primary/5 rounded-full relative">
 <span className="material-symbols-outlined">notifications</span>
 <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full ring-2 ring-white"></span>
 </button>
 <div className="h-8 w-px bg-primary/10 mx-2"></div>
 <UserNav />
 </div>
 </header>
 );
}
