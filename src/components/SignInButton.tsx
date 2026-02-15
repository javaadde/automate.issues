'use client';

import { signIn } from"next-auth/react";
import { useState } from"react";

interface SignInButtonProps {
 className?: string;
 children: React.ReactNode;
 provider?:"github" |"google";
}

export function SignInButton({ className, children, provider }: SignInButtonProps) {
 const [isLoading, setIsLoading] = useState(false);

 const handleSignIn = async () => {
 try {
 setIsLoading(true);
 // If no provider is passed, Auth.js will show the sign-in page with all providers
 // but usually we want to specify one to bypass the extra page.
 await signIn(provider, { callbackUrl:"/repositories" });
 } catch (error) {
 console.error("Sign in error:", error);
 setIsLoading(false);
 }
 };

 return (
 <button 
 onClick={handleSignIn}
 disabled={isLoading}
 className={`${className} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''} transition-all active:scale-95`}
 >
 {isLoading ? (
 <div className="flex items-center gap-2">
 <span className="material-symbols-outlined animate-spin">sync</span>
 Connecting...
 </div>
 ) : (
 children
 )}
 </button>
 );
}
