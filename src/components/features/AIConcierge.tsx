"use client"

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare, X, SendHorizontal, Bot, User,
    Sparkles, RefreshCcw, Plus, ArrowUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@ai-sdk/react";
import { cn } from "@/lib/utils";

export function AIConcierge() {
    const [isOpen, setIsOpen] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    const { messages, append, status, setMessages, error }: any = useChat({
        api: "/api/chat",
        initialMessages: [
            {
                id: "welcome",
                role: "assistant",
                content: "안녕하세요! 모든 통신 연결이 최적화되었습니다. 무엇을 도와드릴까요?",
            },
        ] as any,
        onError: (err: Error) => {
            console.error("Chat Error:", err);
        }
    } as any);

    const isLoading = status === "submitted" || status === "streaming";

    const handleLocalSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!chatInput.trim() || isLoading) return;

        const userMessage = chatInput;
        setChatInput("");
        try {
            await append({ role: 'user', content: userMessage });
        } catch (err: any) {
            console.error("Send Message Error:", err);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleLocalSubmit();
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="mb-4 w-[400px] md:w-[440px]"
                    >
                        <Card className="border-zinc-200 bg-white shadow-2xl rounded-[2rem] overflow-hidden border">
                            <CardHeader className="p-4 border-b border-zinc-100 flex flex-row items-center justify-between bg-zinc-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800 shadow-sm">
                                        <Bot size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-[13px] font-bold text-zinc-900 tracking-tight">AI Concierge</h4>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm" />
                                            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Gemini 2.0 Active</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-0.5">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => setMessages([{ id: "welcome", role: "assistant", content: "안녕하세요! 모든 통신 연결이 최적화되었습니다. 무엇을 도와드릴까요?" }])}
                                        className="h-8 w-8 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100"
                                    >
                                        <RefreshCcw size={14} />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => setIsOpen(false)}
                                        className="h-8 w-8 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100"
                                    >
                                        <X size={16} />
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent className="p-0 h-[480px] bg-white text-zinc-900">
                                <ScrollArea className="h-full px-4 py-6" viewportRef={scrollRef}>
                                    <div className="flex flex-col gap-8">
                                        {messages.map((msg: any) => (
                                            <div
                                                key={msg.id}
                                                className={cn(
                                                    "flex gap-4",
                                                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-8 h-8 rounded-full flex items-center justify-center border shrink-0 mt-0.5",
                                                    msg.role === "user"
                                                        ? "bg-zinc-100 border-zinc-200"
                                                        : "bg-zinc-900 border-zinc-800"
                                                )}>
                                                    {msg.role === "user" ? <User size={14} className="text-zinc-600" /> : <Bot size={14} className="text-white" />}
                                                </div>
                                                <div
                                                    className={cn(
                                                        "max-w-[85%] text-[14px] leading-[1.6]",
                                                        msg.role === "user"
                                                            ? "bg-zinc-100 text-zinc-900 font-bold p-3.5 rounded-2xl rounded-tr-none border border-zinc-200"
                                                            : "text-zinc-800 py-1 font-medium"
                                                    )}
                                                >
                                                    {msg.content}
                                                </div>
                                            </div>
                                        ))}
                                        {isLoading && (
                                            <div className="flex gap-4">
                                                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                                                    <Bot size={14} className="text-white" />
                                                </div>
                                                <div className="flex items-center gap-1.5 py-2">
                                                    <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce" />
                                                    <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                                                    <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                                                </div>
                                            </div>
                                        )}
                                        {error && (
                                            <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100">
                                                오류: {error.message}
                                            </div>
                                        )}
                                    </div>
                                </ScrollArea>
                            </CardContent>

                            <CardFooter className="p-4 border-t border-zinc-100 bg-zinc-50/50">
                                <div className="relative w-full group">
                                    <div className="relative rounded-2xl border border-zinc-200 bg-white p-2 transition-all focus-within:border-zinc-400 focus-within:ring-1 focus-within:ring-zinc-200">
                                        <textarea
                                            rows={1}
                                            value={chatInput}
                                            onChange={(e) => setChatInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="무엇이든 물어보세요..."
                                            className="w-full min-h-[44px] max-h-[120px] bg-transparent pl-3 pr-12 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none resize-none scrollbar-hide"
                                        />
                                        <div className="flex items-center justify-between px-1 pb-1">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 rounded-xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100"
                                                type="button"
                                            >
                                                <Plus size={16} />
                                            </Button>
                                            <Button
                                                onClick={() => handleLocalSubmit()}
                                                disabled={!chatInput.trim() || isLoading}
                                                size="icon"
                                                className={cn(
                                                    "h-10 w-10 rounded-xl transition-all shadow-md",
                                                    chatInput.trim()
                                                        ? "bg-zinc-900 text-white hover:scale-105"
                                                        : "bg-zinc-100 text-zinc-400"
                                                )}
                                            >
                                                <ArrowUp size={20} strokeWidth={3} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 border overflow-hidden group",
                    isOpen
                        ? "bg-white border-white text-black"
                        : "bg-zinc-900 border-white/10 text-white hover:border-primary/50"
                )}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} className="relative z-10" />}
            </motion.button>
        </div>
    );
}
