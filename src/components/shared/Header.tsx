"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Projects", href: "#projects" },
        { name: "Skills", href: "#skills" },
        { name: "About", href: "#about" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${isScrolled ? "glass border-b border-glass-border py-3" : "bg-transparent"
                }`}
        >
            <nav className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="text-2xl font-black tracking-tighter hover:text-primary transition-colors">
                    AZERC<span className="text-primary">.</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button variant="default" className="rounded-full font-bold transition-transform hover:scale-105">
                        Let's Talk
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <Button
                    variant="outline"
                    size="icon"
                    className="md:hidden glass"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </Button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden absolute top-full left-0 right-0 glass border-b border-glass-border overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Button className="mt-2 w-full font-bold" size="lg">
                                Let's Talk
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
