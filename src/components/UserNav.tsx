"use client";

import { signOut, useSession } from"next-auth/react";

export function UserNav() {
 const { data: session } = useSession();

 if (!session?.user) return null;

 return (
 <div className="flex items-center gap-3">
 <div className="text-right hidden sm:block">
 <p className="text-xs font-bold">
 {session.user.name}
 </p>
 <button 
 onClick={() => signOut({ callbackUrl:"/" })}
 className="text-[10px] text-primary hover:underline font-bold uppercase tracking-wider block ml-auto"
 >
 Sign Out
 </button>
 </div>
 <div className="size-10 rounded-full border-2 border-primary/20 overflow-hidden">
 <img
 alt={session.user.name ||"User"}
 className="w-full h-full object-cover"
 src={session.user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.name ||"U")}&background=2d2db9&color=fff`}
 />
 </div>
 </div>
 );
}
