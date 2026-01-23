"use client"

import { ArrowRight, Code2, Cpu, Globe2, Zap, ShieldCheck, Layers } from "lucide-react";
import { PROJECTS } from "@/constants/projects";
import { ProjectCard } from "@/components/features/ProjectCard";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Background3D = dynamic(() => import("@/components/shared/Background3D"), {
  ssr: false,
});

export default function Home() {
  const triggerConsultation = (category: string) => {
    const message = `[${category}] 분야에 대한 전문 상담을 진행하고 싶습니다. 관련 기술셋과 협업 프로세스에 대해 알려주세요.`;
    const event = new CustomEvent("open-ai-concierge", { detail: { message } });
    window.dispatchEvent(event);
  };

  const SKILL_GROUPS = [
    {
      name: "AI Intelligence",
      icon: <Zap size={18} className="text-primary" />,
      skills: ["LangGraph", "AI SDK", "Gemini API", "Vector DB"]
    },
    {
      name: "On-Chain System",
      icon: <ShieldCheck size={18} className="text-secondary" />,
      skills: ["Solidity", "Smart Contract", "Ethers.js", "Foundry"]
    },
    {
      name: "Immersive 3D",
      icon: <Globe2 size={18} className="text-accent" />,
      skills: ["Three.js", "R3F", "GLSL", "Framer Motion"]
    },
    {
      name: "Core Architecture",
      icon: <Layers size={18} className="text-foreground/80" />,
      skills: ["Next.js 15", "TypeScript", "Drizzle ORM", "Better Auth"]
    }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-20 relative">
        {/* Background 3D & Glows */}
        <Background3D />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] -z-10 animate-pulse" />

        <section className="relative z-10 max-w-5xl w-full text-center flex flex-col items-center gap-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="text-primary/90">The Nexus of Innovation</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Crafting the <br />
            <span className="text-gradient">Future Framework</span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-foreground/60 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            Full-Stack integration of <span className="text-foreground font-semibold">AI Agents</span>,
            <span className="text-foreground font-semibold"> Blockchain Transparency</span>, and
            <span className="text-foreground font-semibold"> Interactive 3D Engines</span>.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-400">
            <Button asChild size="lg" className="rounded-full px-8 font-bold hover:scale-105 transition-transform">
              <a href="#projects" className="flex items-center gap-2 no-underline">
                Explore Projects <ArrowRight size={20} />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 glass font-bold">
              Get in Touch
            </Button>
          </div>

          {/* Tech Badges */}
          <div className="flex justify-center gap-8 mt-16 opacity-40 animate-in fade-in duration-1000 delay-500">
            <div className="flex flex-col items-center gap-2">
              <Cpu size={32} />
              <span className="text-xs font-mono">INTELLIGENCE</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Globe2 size={32} />
              <span className="text-xs font-mono">ECOSYSTEM</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Code2 size={32} />
              <span className="text-xs font-mono">PRECISION</span>
            </div>
          </div>
        </section>
      </main>

      {/* Projects Showcase Section */}
      <section id="projects" className="w-full max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col gap-4 mb-16">
          <Badge variant="outline" className="w-fit border-primary/30 text-primary">PORTFOLIO</Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Selected <span className="text-primary italic">Works</span>
          </h2>
          <p className="text-foreground/60 max-w-xl text-lg">
            A curation of my most complex and impactful developments spanning across AI, Blockchain, and Graphics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* Full-Stack Capabilities Section */}
      <section id="skills" className="w-full max-w-7xl mx-auto px-6 py-32 border-t border-glass-border/30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Badge variant="outline" className="w-fit border-secondary/30 text-secondary">CAPABILITIES</Badge>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]">
                Technical <br />
                <span className="text-secondary italic">Excellence</span>
              </h2>
            </div>
            <p className="text-foreground/60 text-lg leading-relaxed max-w-xl">
              단일 스택에 국한되지 않는 융합적 기술 설계. <br />
              복잡한 비즈니스 로직을 현대적인 엔지니어링으로 풀어냅니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {SKILL_GROUPS.map((group) => (
                <div key={group.name} className="flex flex-col gap-4 p-5 glass rounded-2xl border-white/5 group hover:border-secondary/20 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 text-secondary group-hover:scale-110 transition-transform">
                      {group.icon}
                    </div>
                    <h4 className="font-bold text-sm tracking-tight">{group.name}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span key={skill} className="text-[11px] font-mono px-2 py-1 rounded bg-white/5 opacity-50 border border-white/5">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-[3rem] p-10 h-[500px] flex items-center justify-center relative overflow-hidden self-center border-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/5" />

            {/* Decorative Orbit Rings */}
            <div className="absolute w-[300px] h-[300px] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-[400px] h-[400px] border border-dashed border-white/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />

            <div className="relative z-10 text-center flex flex-col items-center">
              <div className="w-24 h-24 rounded-full glass border-white/10 flex items-center justify-center mb-8 animate-pulse shadow-[0_0_50px_rgba(var(--secondary),0.2)]">
                <Globe2 size={48} className="text-secondary" />
              </div>
              <h3 className="text-xl font-bold tracking-widest mb-2">TECHNICAL NEXUS</h3>
              <p className="text-[10px] font-mono opacity-40 uppercase tracking-[0.3em]">Scalable Architecture Optimized</p>

              {/* Floating Tech Dots */}
              <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary/40 animate-ping" />
              <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-secondary/40 animate-ping [animation-delay:1s]" />
              <div className="absolute top-2/3 left-1/2 w-1.5 h-1.5 rounded-full bg-accent/40 animate-ping [animation-delay:2s]" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full max-w-7xl mx-auto px-6 py-32 border-t border-glass-border/30">
        <div className="glass rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-primary/10 blur-[100px] rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <Badge variant="outline" className="w-fit border-accent/30 text-accent">CONTACT</Badge>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Let's build the <br />
                  <span className="text-accent italic">Next Big Thing</span>
                </h2>
              </div>
              <p className="text-foreground/60 text-lg">
                혁신적인 기술 통합이나 프로젝트 협업에 관심이 있으신가요? <br />
                언제든지 메시지를 남겨주세요.
              </p>

              <div className="flex flex-col gap-4 mt-4">
                <a href="mailto:azerckid@gmail.com" className="text-xl font-medium hover:text-primary transition-colors flex items-center gap-2">
                  azerckid@gmail.com <ArrowRight size={20} className="-rotate-45" />
                </a>
                <div className="flex gap-4">
                  {["GitHub", "LinkedIn", "Twitter"].map((social) => (
                    <button key={social} className="text-sm font-bold opacity-40 hover:opacity-100 transition-opacity">
                      {social}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  id: "ai",
                  title: "AI Intelligent Agent",
                  description: "LangGraph 및 LLM 통합 에이전트 구축 상담",
                  icon: <Zap size={24} className="text-primary" />,
                  color: "border-primary/20 bg-primary/5 hover:border-primary/50"
                },
                {
                  id: "web3",
                  title: "Web3 & Blockchain",
                  description: "스마트 컨트랙트 및 온체인 인프라 설계 지문",
                  icon: <ShieldCheck size={24} className="text-secondary" />,
                  color: "border-secondary/20 bg-secondary/5 hover:border-secondary/50"
                },
                {
                  id: "fullstack",
                  title: "Modern Full-Stack",
                  description: "고성능 UI/UX 및 차세대 프레임워크 도입 전략",
                  icon: <Layers size={24} className="text-accent" />,
                  color: "border-accent/20 bg-accent/5 hover:border-accent/50"
                }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => triggerConsultation(item.title)}
                  className={`flex items-center gap-6 p-6 rounded-2xl border transition-all duration-300 text-left group ${item.color}`}
                >
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-sm opacity-60">{item.description}</p>
                  </div>
                  <ArrowRight size={20} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </button>
              ))}

              <div className="mt-4 p-6 rounded-2xl border border-dashed border-white/10 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono opacity-50 uppercase tracking-widest">AI Agent is ready for Briefing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-glass-border/10">
        <p className="text-sm text-foreground/40 font-mono">
          © 2026 AZERC. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-8 text-xs font-mono opacity-40">
          <span>DESIGNED WITH PRECISION</span>
          <span>BUILT WITH NEXT.JS 15</span>
        </div>
      </footer>
    </div>
  );
}
