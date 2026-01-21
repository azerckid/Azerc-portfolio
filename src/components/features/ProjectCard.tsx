"use client"

import { Project } from "@/constants/projects";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
        >
            <Card className="group relative flex flex-col rounded-3xl overflow-hidden border border-glass-border bg-glass-bg backdrop-blur-md hover:border-primary/50 transition-all duration-500 h-full">
                {/* Image Section */}
                <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                        src={project.thumbnailUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Dark overlay removed to showcase bright illustrations */}
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60" /> */}

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-white/10 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-tighter">
                            {project.category}
                        </Badge>
                    </div>
                </div>

                <CardHeader className="p-6 pb-2">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                </CardHeader>

                <CardContent className="p-6 pt-0 flex-1">
                    <p className="text-sm text-foreground/60 line-clamp-2 mb-4">
                        {project.description}
                    </p>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-[10px] bg-primary/5 text-primary border-primary/20">
                                {tech}
                            </Badge>
                        ))}
                        {project.techStack.length > 3 && (
                            <span className="text-[10px] text-foreground/40 px-1 py-0.5">+{project.techStack.length - 3}</span>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 border-t border-glass-border/30 mt-auto">
                    <div className="flex items-center justify-between w-full mt-4">
                        <div className="flex items-center gap-4">
                            <Link
                                href={project.liveUrl}
                                target="_blank"
                                className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                            >
                                Live <ExternalLink size={14} />
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
                        </div>

                        <Button size="icon" variant="ghost" className="rounded-full glass hover:bg-white/10 group/btn">
                            <ArrowRight size={16} className="-rotate-45 group-hover/btn:rotate-0 transition-transform" />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
