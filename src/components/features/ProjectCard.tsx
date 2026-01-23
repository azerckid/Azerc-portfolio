"use client"

import { Project } from "@/constants/projects";
import { ExternalLink, Github, ArrowRight, Twitter, X, CheckCircle, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
    project: Project;
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
            >
                <Card className="group relative flex flex-col p-0 rounded-3xl overflow-hidden border border-glass-border bg-glass-bg backdrop-blur-md hover:border-primary/50 transition-all duration-500">
                    {/* Image Section - Forced to Top */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-white mt-0 border-b border-glass-border/30">
                        <Image
                            src={project.thumbnailUrl}
                            alt={project.title}
                            fill
                            className="object-cover scale-100 transition-transform duration-700 group-hover:scale-110 object-center"
                        />
                        {/* Dark overlay removed to showcase bright illustrations */}
                        {/* <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60" /> */}

                        <div className="absolute top-4 left-4 flex flex-row gap-1.5 flex-wrap">
                            {/* 1. AI Badge */}
                            {(project.category === 'AI' || project.techStack.some(t => ['AI', 'LLM', 'OpenAI', 'Gemini'].some(k => t.includes(k)))) && (
                                <Badge variant="secondary" className="bg-purple-600/90 hover:bg-purple-600 border border-purple-400/50 text-white px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide shadow-md backdrop-blur-sm">
                                    AI
                                </Badge>
                            )}
                            {/* 2. Blockchain Badge */}
                            {(project.category === 'Blockchain' || project.techStack.some(t => ['Solidity', 'Web3', 'Blockchain', 'NEAR'].some(k => t.includes(k)))) && (
                                <Badge variant="secondary" className="bg-blue-600/90 hover:bg-blue-600 border border-blue-400/50 text-white px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide shadow-md backdrop-blur-sm">
                                    BLOCKCHAIN
                                </Badge>
                            )}
                            {/* 3. 3D Badge */}
                            {(project.category === '3D' || project.techStack.some(t => ['Three.js', 'WebGL', 'R3F'].some(k => t.includes(k)))) && (
                                <Badge variant="secondary" className="bg-orange-600/90 hover:bg-orange-600 border border-orange-400/50 text-white px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide shadow-md backdrop-blur-sm">
                                    3D / WEBGL
                                </Badge>
                            )}
                        </div>
                    </div>

                    <CardHeader className="p-6 pt-0 pb-0">
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors flex items-center gap-2">
                            {project.title}
                            {project.id === 'c-stay-blog' && (
                                <Twitter size={20} className="text-blue-400 fill-current" />
                            )}
                        </h3>
                    </CardHeader>

                    <CardContent className="p-6 pt-0 pb-0">
                        <p className="text-sm text-foreground/60 line-clamp-2 mb-4 h-10 min-h-[2.5rem]">
                            {project.description}
                        </p>

                        {/* Key Features Preview */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.features.map((feature, i) => (
                                <span key={i} className="text-[10px] font-medium bg-secondary/50 text-secondary-foreground px-2 py-0.5 rounded-md border border-secondary">
                                    {feature}
                                </span>
                            ))}
                        </div>


                        {/* Tech Stack Chips */}
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                                <Badge key={tech} variant="outline" className="text-[10px] bg-primary/5 text-primary border-primary/20">
                                    {tech}
                                </Badge>
                            ))}
                        </div>

                        {/* Project Stats - Integrated with bottom bar */}
                        {project.stats && (
                            <div className="mt-2 pt-2 border-t border-glass-border/10 grid grid-cols-3 gap-4">
                                {project.stats.map((stat, i) => (
                                    <div key={i} className="flex flex-col items-center gap-0.5 text-center">
                                        <span className="text-[10px] uppercase tracking-wider text-foreground/30 font-bold">
                                            {stat.label}
                                        </span>
                                        <span className="text-sm font-bold text-foreground/80">
                                            {stat.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="px-6 !pt-0 pb-2 border-t border-glass-border/10">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-6">
                                <Link
                                    href={project.liveUrl}
                                    target="_blank"
                                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:opacity-80 transition-opacity"
                                >
                                    project <ExternalLink size={14} />
                                </Link>
                                {project.repoUrl && (
                                    <Link
                                        href={project.repoUrl}
                                        target="_blank"
                                        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground/40 hover:text-foreground transition-all"
                                    >
                                        github <Github size={14} />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>

            {/* Detail Modal */}
            <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                    <Dialog.Content className="fixed left-[50%] top-[50%] z-[9999] grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background/95 backdrop-blur-xl p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-3xl overflow-hidden ring-1 ring-white/10">

                        {/* Modal Header Image */}
                        <div className="relative h-48 w-full overflow-hidden bg-muted">
                            <Image
                                src={project.thumbnailUrl}
                                alt={project.title}
                                fill
                                className="object-cover opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

                            <Dialog.Close className="absolute right-4 top-4 rounded-full bg-black/20 p-2 text-white hover:bg-black/40 backdrop-blur-sm transition-colors ring-1 ring-white/20 cursor-pointer z-10">
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close</span>
                            </Dialog.Close>

                            <div className="absolute bottom-4 left-6">
                                <Badge variant="secondary" className="backdrop-blur-md bg-white/10 text-white border-white/20 mb-2">
                                    {project.category}
                                </Badge>
                                <Dialog.Title className="text-2xl font-bold text-foreground tracking-tight">
                                    {project.title}
                                </Dialog.Title>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="px-6 pb-6 space-y-6 overflow-y-auto max-h-[60vh]">

                            {/* Stats/Quick Info */}
                            <div className="flex gap-4 text-xs text-muted-foreground border-b border-border/50 pb-4">
                                <div className="flex items-center gap-1">
                                    <CheckCircle size={14} className="text-green-500" />
                                    <span>Verified Integration</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Info size={14} className="text-blue-500" />
                                    <span>Latest Version</span>
                                </div>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">
                                {/* Description Section */}
                                <div className="space-y-3 sm:col-span-2">
                                    <h4 className="text-sm font-semibold text-foreground">Project Overview</h4>
                                    <Dialog.Description className="text-sm text-muted-foreground leading-relaxed">
                                        {project.longDescription || project.description}
                                    </Dialog.Description>
                                </div>

                                {/* Features List */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-foreground">Key Features</h4>
                                    <ul className="space-y-2">
                                        {project.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                                <div className="mt-1 h-1 w-1 rounded-full bg-primary" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Tech Stack */}
                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-foreground">Technology Stack</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
                                            <Badge key={tech} variant="outline" className="text-xs py-1">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                                <Button asChild className="flex-1 gap-2 cursor-pointer" size="sm">
                                    <Link href={project.liveUrl} target="_blank">
                                        Visit Live Demo <ExternalLink size={14} />
                                    </Link>
                                </Button>
                                {project.repoUrl && (
                                    <Button asChild variant="secondary" className="flex-1 gap-2 cursor-pointer" size="sm">
                                        <Link href={project.repoUrl} target="_blank">
                                            View Code <Github size={14} />
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    );
}
