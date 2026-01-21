export interface Project {
    id: string;
    title: string;
    category: 'AI' | 'Blockchain' | '3D' | 'Full-Stack';
    description: string;
    longDescription: string;
    thumbnailUrl: string;
    liveUrl: string;
    repoUrl?: string;
    techStack: string[];
    features: string[];
}

export const PROJECTS: Project[] = [
    {
        id: 'ai-agent-studio',
        title: 'AI Agent Studio',
        category: 'AI',
        description: 'Autonomous AI experimentation lab with 20+ specialized agents built on LangGraph.',
        longDescription: 'A comprehensive portfolio showcasing autonomous AI agent workflows. It features specialized agents for research, data harvesting, and financial analysis using Gemini 1.5 Flash and LangGraph.',
        thumbnailUrl: '/assets/illustrations/ai-studio.png?v=2',
        liveUrl: 'https://langgraph-lab-eight.vercel.app/',
        techStack: ['LangGraph', 'Gemini 1.5 Flash', 'CrewAI', 'AutoGen', 'Python'],
        features: ['20+ Specialized Agents', 'Deep Research Workflows', 'Multi-Agent Collaboration']
    },
    {
        id: 'chat-bot-choonsim',
        title: 'AI Agent Choonsim',
        category: 'AI',
        description: 'Intelligent AI assistant platform with personalized chat experiences and LLM integration.',
        longDescription: 'A modern AI chatbot implementation utilizing Vercel AI SDK and advanced LLMs. Optimized for low-latency streaming responses and intuitive UI/UX for complex task management.',
        thumbnailUrl: '/assets/illustrations/ai-choonsim.png?v=2',
        liveUrl: 'https://chat-bot-choonsim.vercel.app/home',
        techStack: ['Next.js', 'Vercel AI SDK', 'OpenAI', 'Tailwind CSS'],
        features: ['Real-time Streaming', 'Context-aware Conversations', 'Custom UI Personas']
    },
    {
        id: 'bondbase',
        title: 'BondBase',
        category: 'Blockchain',
        description: 'Decentralized ESG bond transparency platform with blockchain relayer integration.',
        longDescription: 'A fintech solution focused on ESG transparency. Integrates blockchain for immutable record-keeping of investment impact and real-time status updates via relayer bots.',
        thumbnailUrl: '/assets/illustrations/blockchain-bondbase.png?v=2',
        liveUrl: 'https://blockchain-bond-base.vercel.app/',
        repoUrl: 'https://github.com/namhyeongseog/BondBase',
        techStack: ['Solidity', 'Ethers.js', 'React Router v7', 'Drizzle ORM'],
        features: ['Blockchain Transparency', 'ESG Scoring Engine', 'Real-time Relayer Sync']
    },
    {
        id: 'threejs-lab',
        title: 'Three.js Graphics Lab',
        category: '3D',
        description: 'Interactive 3D visualization engine for procedural materials and character animations.',
        longDescription: 'A high-performance WebGL experimentation lab focusing on Three.js, React Three Fiber, and advanced shader development. Features interactive character models and environmental simulations.',
        thumbnailUrl: '/assets/illustrations/3d-graphics-lab.png?v=2',
        liveUrl: 'https://threejs-lab-orcin.vercel.app/',
        techStack: ['Three.js', 'React Three Fiber', 'Shaders', 'Next.js'],
        features: ['Real-time 3D Rendering', 'Procedural Grass System', 'Character Animation Rigging']
    },
    {
        id: 'c-stay-blog',
        title: 'C-Stay Blog Ecosystem',
        category: 'Full-Stack',
        description: 'High-performance content delivery platform with modern state management.',
        longDescription: 'A full-stack blog platform showcasing the transition from React to React Router v7 and Next.js 15 architectures. Optimized for SEO and fast server-side rendering.',
        thumbnailUrl: '/assets/illustrations/fullstack-blog.png?v=2',
        liveUrl: 'https://c-stay-blog-01.vercel.app/',
        techStack: ['Next.js 15', 'React Router v7', 'Lucide', 'Better Auth'],
        features: ['SSR Optimization', 'Rich Content Management', 'Modern Authentication']
    }
];
