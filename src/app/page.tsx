"use client"

import { ArrowRight, Code2, Cpu, Globe2 } from "lucide-react";
import { PROJECTS } from "@/constants/projects";
import { ProjectCard } from "@/components/features/ProjectCard";
import dynamic from "next/dynamic";

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
            <a href="#projects" className="px-8 py-4 rounded-full bg-foreground text-background font-bold hover:scale-105 transition-transform flex items-center gap-2 no-underline">
              Explore Projects <ArrowRight size={20} />
            </a>
            <button className="px-8 py-4 rounded-full glass font-bold hover:bg-white/5 transition-colors">
              Get in Touch
            </button>
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
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Selected <span className="text-primary italic">Works</span>
          </h2>
          <p className="text-foreground/60 max-w-xl">
            A curation of my most complex and impactful developments spanning across AI, Blockchain, and Graphics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* Footer Space Filler */}
      <div className="py-20" />
    </div>
  );
}
