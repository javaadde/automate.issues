import { auth } from"@/auth";
import Link from"next/link";
import { SignInButton } from"@/components/SignInButton";
import { UserNav } from"@/components/UserNav";

export default async function Home() {
 const session = await auth();

 return (
 <div className="bg-background-light font-sans text-[#101019] selection:bg-primary selection:text-white min-h-screen">
 {/* Top Navigation */}
 <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
 <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-xl rounded-full border border-gray-200 shadow-sm transition-all duration-300">
 <div className="flex items-center gap-2">
 <div className="bg-primary p-1.5 rounded-lg">
 <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
 </div>
 <span className="text-xl font-bold tracking-tight">GitAuto AI</span>
 </div>
 <div className="hidden md:flex items-center gap-8">
 <Link className="text-sm font-medium hover:text-primary transition-colors" href="#workflow">Workflow</Link>
 <Link className="text-sm font-medium hover:text-primary transition-colors" href="#features">Features</Link>
 <Link className="text-sm font-medium hover:text-primary transition-colors" href="#pricing">Pricing</Link>
 </div>
 <div className="flex items-center gap-4">
 {session ? (
 <>
 <Link href="/repositories" className="bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2">
 Dashboard
 <span className="material-symbols-outlined text-sm">arrow_forward</span>
 </Link>
 <div className="hidden sm:block">
 <UserNav />
 </div>
 </>
 ) : (
 <>
 <SignInButton className="hidden sm:block text-sm font-semibold px-4 py-2 hover:opacity-80 transition-opacity">Log In</SignInButton>
 <SignInButton provider="github" className="bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2">
 <span className="material-symbols-outlined text-sm">terminal</span>
 Connect GitHub
 </SignInButton>
 </>
 )}
 </div>
 </nav>
 </header>

 <main className="pt-24 overflow-x-hidden">
 {/* Hero Section */}
 <section className="px-6 py-12 md:py-20">
 <div className="max-w-7xl mx-auto grainy-gradient rounded-xl md:rounded-[2.5rem] overflow-hidden p-8 md:p-20 relative text-white">
 <div className="relative z-10 max-w-3xl">
 <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8 overflow-hidden">
 <span className="material-symbols-outlined text-sm">auto_awesome</span>
 <span className="text-xs font-bold uppercase tracking-wider italic">Now with GPT-4o Power</span>
 </div>
 <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
 Turn Docs into Dev-Ready GitHub Issues <span className="text-white/70 italic underline decoration-white/30 decoration-4 underline-offset-8">Instantly</span>
 </h1>
 <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-xl">
 Eliminate manual project setup. Our AI transforms your PRDs, PDFs, and wireframes into actionable GitHub milestones and tasks in seconds.
 </p>
 <div className="flex flex-col sm:flex-row gap-4">
 <SignInButton provider="github" className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-xl">
 <span className="material-symbols-outlined">add_link</span>
 Connect GitHub
 </SignInButton>
 <SignInButton provider="google" className="bg-black/20 backdrop-blur-md border border-white/20 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-black/30 transition-all">
 <span className="material-symbols-outlined">login</span>
 Continue with Google
 </SignInButton>
 </div>
 </div>
 {/* Abstract Visual Element */}
 <div className="absolute right-0 bottom-0 top-0 w-1/3 hidden lg:block opacity-50 pointer-events-none" style={{ background:"radial-gradient(circle at 70% 50%, rgba(255,255,255,0.2) 0%, transparent 70%)" }}>
 <div className="absolute inset-0 flex items-center justify-center">
 <div className="w-64 h-64 border-2 border-white/20 rounded-full animate-pulse"></div>
 <div className="absolute w-48 h-48 border-2 border-white/10 rounded-full"></div>
 </div>
 </div>
 </div>
 </section>

 {/* Workflow Section */}
 <section className="py-20 px-6">
 <div className="max-w-7xl mx-auto">
 <div className="text-center mb-16">
 <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
 <p className="text-gray-500 max-w-lg mx-auto">Ship features faster by automating the bridge between product management and engineering.</p>
 </div>
 <div className="grid md:grid-cols-3 gap-8 relative">
 {/* Connector line for desktop */}
 <div className="hidden md:block absolute top-1/2 left-0 w-full h-px border-t border-dashed border-primary/30 -translate-y-10 z-0"></div>
 
 {/* Step 1 */}
 <div className="relative z-10 group">
 <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-2 transition-transform h-full">
 <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
 <span className="material-symbols-outlined text-3xl">upload_file</span>
 </div>
 <span className="text-xs font-black text-primary/40 mb-2 block tracking-widest uppercase">Step 01</span>
 <h3 className="text-xl font-bold mb-3">Upload</h3>
 <p className="text-gray-500 leading-relaxed text-sm">Drop your PDF, PRD, or even a messy Doc directly into our dashboard. We support all major file formats.</p>
 </div>
 </div>

 {/* Step 2 */}
 <div className="relative z-10 group">
 <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-2 transition-transform h-full">
 <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
 <span className="material-symbols-outlined text-3xl">auto_awesome</span>
 </div>
 <span className="text-xs font-black text-primary/40 mb-2 block tracking-widest uppercase">Step 02</span>
 <h3 className="text-xl font-bold mb-3">AI Magic</h3>
 <p className="text-gray-500 leading-relaxed text-sm">Our AI parses your document to extract milestones, technical dependencies, and edge cases into structured issues.</p>
 </div>
 </div>

 {/* Step 3 */}
 <div className="relative z-10 group">
 <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-2 transition-transform h-full">
 <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
 <span className="material-symbols-outlined text-3xl">sync_alt</span>
 </div>
 <span className="text-xs font-black text-primary/40 mb-2 block tracking-widest uppercase">Step 03</span>
 <h3 className="text-xl font-bold mb-3">Sync</h3>
 <p className="text-gray-500 leading-relaxed text-sm">Review the generated tasks and push them to your GitHub repository with one click, complete with labels and assignees.</p>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Core Features */}
 <section className="py-20 bg-background-light/50 px-6">
 <div className="max-w-7xl mx-auto">
 <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
 <div className="max-w-xl">
 <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for teams that move fast</h2>
 <p className="text-gray-500">Powerful features to automate the repetitive parts of engineering management.</p>
 </div>
 <button className="text-primary font-bold flex items-center gap-2 hover:underline">
 Explore all features <span className="material-symbols-outlined">arrow_forward</span>
 </button>
 </div>
 <div className="grid md:grid-cols-3 gap-6">
 <div className="p-8 bg-white rounded-3xl border border-gray-200 shadow-sm">
 <span className="material-symbols-outlined text-4xl text-primary mb-6">psychology</span>
 <h4 className="text-xl font-bold mb-4">AI Issue Recommendations</h4>
 <p className="text-gray-500 text-sm leading-relaxed">Our models suggest specific labels, priority levels, and even the right team members for each generated issue based on context.</p>
 </div>
 <div className="p-8 bg-white rounded-3xl border border-gray-200 shadow-sm">
 <span className="material-symbols-outlined text-4xl text-primary mb-6">lightbulb</span>
 <h4 className="text-xl font-bold mb-4">Feature Suggestions</h4>
 <p className="text-gray-500 text-sm leading-relaxed">AI analyzes your doc and suggests missing technical requirements or potential edge cases you might have overlooked in your PRD.</p>
 </div>
 <div className="p-8 bg-white rounded-3xl border border-gray-200 shadow-sm">
 <span className="material-symbols-outlined text-4xl text-primary mb-6">code_blocks</span>
 <h4 className="text-xl font-bold mb-4">Code Review Integration</h4>
 <p className="text-gray-500 text-sm leading-relaxed">Automatically link generated issues to future PRs, ensuring a clean audit trail from the initial requirement to the final code.</p>
 </div>
 </div>
 </div>
 </section>

 {/* CTA Section */}
 <section className="py-20 px-6">
 <div className="max-w-4xl mx-auto bg-primary rounded-[2rem] p-12 text-center text-white relative overflow-hidden">
 <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] -mr-32 -mt-32"></div>
 <div className="relative z-10">
 <h2 className="text-4xl font-bold mb-6">Stop manual task entry today.</h2>
 <p className="text-white/70 mb-10 text-lg">Join 2,000+ engineering teams turning documentation into dev velocity.</p>
 <SignInButton provider="github" className="bg-white text-primary px-10 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl inline-block">
 Start Free with GitHub
 </SignInButton>
 <p className="text-white/40 mt-6 text-sm">No credit card required. Free tier forever for open source.</p>
 </div>
 </div>
 </section>
 </main>

 {/* Footer */}
 <footer className="bg-white border-t border-gray-200 py-16 px-6">
 <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
 <div className="col-span-2">
 <div className="flex items-center gap-2 mb-6">
 <div className="bg-primary p-1 rounded-lg">
 <span className="material-symbols-outlined text-white text-lg">rocket_launch</span>
 </div>
 <span className="text-lg font-bold tracking-tight">GitAuto AI</span>
 </div>
 <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
 Automating the bridge between product ideation and engineering execution using state-of-the-art AI.
 </p>
 <div className="flex items-center gap-4">
 {/* Simple SVG icons for social */}
 <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all">
 <svg className="size-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.599 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
 </a>
 <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all">
 <svg className="size-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
 </a>
 </div>
 </div>
 <div>
 <h6 className="font-bold text-sm mb-6">Product</h6>
 <ul className="space-y-4 text-sm text-gray-500">
 <li><a className="hover:text-primary transition-colors" href="#">Features</a></li>
 <li><a className="hover:text-primary transition-colors" href="#">Integrations</a></li>
 <li><a className="hover:text-primary transition-colors" href="#">Pricing</a></li>
 <li><a className="hover:text-primary transition-colors" href="#">Changelog</a></li>
 </ul>
 </div>
 <div>
 <h6 className="font-bold text-sm mb-6">Resources</h6>
 <ul className="space-y-4 text-sm text-gray-500">
 <li><a className="hover:text-primary transition-colors" href="#">Docs</a></li>
 <li><a className="hover:text-primary transition-colors" href="#">API</a></li>
 <li><a className="hover:text-primary transition-colors" href="#">Community</a></li>
 <li><a className="hover:text-primary transition-colors" href="#">Support</a></li>
 </ul>
 </div>
 <div>
 <h6 className="font-bold text-sm mb-6">Company</h6>
 <ul className="space-y-4 text-sm text-gray-500">
 <li><a className="hover:text-primary transition-colors" href="#">About</a></li>
 <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
 <li><a className="hover:text-primary transition-colors" href="#">Privacy</a></li>
 <li><a className="hover:text-primary transition-colors" href="#">Terms</a></li>
 </ul>
 </div>
 </div>
 <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
 <p className="text-xs text-gray-400">© 2024 GitAuto AI. Built for the future of engineering.</p>
 <div className="flex items-center gap-2">
 <span className="text-xs font-bold text-primary italic">Powered by AI</span>
 <div className="size-2 rounded-full bg-emerald-500"></div>
 <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Systems Operational</span>
 </div>
 </div>
 </footer>
 </div>
 );
}
