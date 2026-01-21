"use client"

import { ArrowRight, Code2, Cpu, Globe2 } from "lucide-react";
import { PROJECTS } from "@/constants/projects";
import { ProjectCard } from "@/components/features/ProjectCard";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Background3D = dynamic(() => import("@/components/shared/Background3D"), {
  ssr: false,
});

export default function Home() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <Badge variant="outline" className="w-fit border-secondary/30 text-secondary">CAPABILITIES</Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              Technical <br />
              <span className="text-secondary italic">Excellence</span>
            </h2>
            <p className="text-foreground/60 text-lg leading-relaxed">
              Expertise in modern frontend frameworks, scalable backend architectures, and specialized technology integrations.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              {["Next.js 15", "React Router v7", "TypeScript", "Tailwind CSS v4", "Solidity", "Three.js", "LangGraph", "AI SDK", "Drizzle ORM", "Better Auth"].map((skill) => (
                <Badge key={skill} variant="secondary" className="px-4 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="glass rounded-[2rem] p-10 h-[400px] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent" />
            <div className="relative z-10 text-center">
              <Globe2 size={80} className="mx-auto mb-6 text-secondary animate-pulse" />
              <p className="text-sm font-mono opacity-50">SCALABLE ARCHITECTURE</p>
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
                <a href="mailto:azerc@example.com" className="text-xl font-medium hover:text-primary transition-colors flex items-center gap-2">
                  azerc@example.com <ArrowRight size={20} className="-rotate-45" />
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

            <div className="flex flex-col gap-4 p-8 glass rounded-3xl border-white/5">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono opacity-50">NAME</label>
                  <input type="text" className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-primary/50" placeholder="Your Name" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono opacity-50">EMAIL</label>
                  <input type="email" className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-primary/50" placeholder="Email Address" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono opacity-50">MESSAGE</label>
                <textarea rows={4} className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-primary/50 resize-none" placeholder="Tell me about your project" />
              </div>
              <Button size="lg" className="w-full mt-4 rounded-xl font-bold text-lg">
                Send Message
              </Button>
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
