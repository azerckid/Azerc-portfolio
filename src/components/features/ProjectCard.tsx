"use client"

import { Project } from "@/constants/projects";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectCardProps {
    project: Project;
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative flex flex-col rounded-3xl glass overflow-hidden border border-glass-border hover:border-primary/50 transition-all duration-500"
        >
            {/* Image Section */}
            <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                    src={project.thumbnailUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-widest uppercase">
                    {project.category}
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-1 p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                </h3>
                <p className="text-sm text-foreground/60 line-clamp-2 mb-4 flex-1">
                    {project.description}
                </p>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-md">
                            {tech}
                        </span>
                    ))}
                    {project.techStack.length > 3 && (
                        <span className="text-[10px] text-foreground/40 px-1 py-0.5">+{project.techStack.length - 3}</span>
                    )}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-4">
                    <Link
                        href={project.liveUrl}
                        target="_blank"
                        className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                        Live Demo <ExternalLink size={14} />
                    </Link>
                    {project.repoUrl && (
                        <Link
                            href={project.repoUrl}
                            target="_blank"
                            className="flex items-center gap-1.5 text-xs font-semibold text-foreground/60 hover:text-foreground transition-colors"
                        >
                            Code <Github size={14} />
                        </Link>
                    )}
                    <div className="ml-auto">
                        <button className="p-2 rounded-full glass hover:bg-white/10 transition-colors">
                            <ArrowRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
