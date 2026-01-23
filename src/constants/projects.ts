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
        title: 'AI Agent Lab.',
        category: 'AI',
        description: 'Autonomous AI experimentation lab with 20+ specialized agents built on LangGraph.',
        longDescription: 'A comprehensive archive of 20+ specialized AI agent projects featuring a unified dashboard interface. Integrating the latest AI stack including LangGraph, OpenAI, and Gemini, it offers a "Laboratory UI" for monitoring code logic and real-time agent status. Features automated project scanning and a sophisticated design system.',
        thumbnailUrl: '/assets/illustrations/ai-studio.png',
        liveUrl: 'https://langgraph-lab-eight.vercel.app/',
        repoUrl: 'https://github.com/azerckid/Langgraph-lab',
        techStack: ['React 19', 'Vite', 'Tailwind CSS 4', 'LangGraph', 'Python', 'OpenAI', 'Gemini'],
        features: ['20+ Specialized Agents', 'Automated Project Scanning', 'In-browser Code Viewer', 'Real-time Metadata Sync', 'Premium Laboratory UI']
    },
    {
        id: 'chat-bot-choonsim',
        title: 'AI Agent Choonsim',
        category: 'AI',
        description: 'Intelligent AI assistant platform with personalized chat experiences and LLM integration.',
        longDescription: 'A modern AI chatbot implementation utilizing Vercel AI SDK and advanced LLMs. Optimized for low-latency streaming responses and intuitive UI/UX for complex task management.',
        thumbnailUrl: '/assets/illustrations/choonsim_10.jpg',
        liveUrl: 'https://chat-bot-choonsim.vercel.app/home',
        techStack: ['Next.js', 'Vercel AI SDK', 'OpenAI', 'Tailwind CSS'],
        features: ['Real-time Streaming', 'Context-aware Conversations', 'Custom UI Personas']
    },
    {
        id: 'c-stay-blog',
        title: 'AI-Tweet',
        category: 'AI',
        description: 'High-performance content delivery platform with modern state management.',
        longDescription: 'A full-stack blog platform showcasing the transition from React to React Router v7 and Next.js 15 architectures. Optimized for SEO and fast server-side rendering.',
        thumbnailUrl: '/assets/illustrations/fullstack-blog.png',
        liveUrl: 'https://c-stay-blog-01.vercel.app/',
        techStack: ['Next.js 15', 'React Router v7', 'Lucide', 'Better Auth'],
        features: ['SSR Optimization', 'Rich Content Management', 'Modern Authentication']
    },
    {
        id: 'bondbase',
        title: 'BondBase',
        category: 'Blockchain',
        description: 'Decentralized ESG bond transparency platform with blockchain relayer integration.',
        longDescription: 'A fintech solution focused on ESG transparency. Integrates blockchain for immutable record-keeping of investment impact and real-time status updates via relayer bots.',
        thumbnailUrl: '/assets/illustrations/blockchain-bondbase.png',
        liveUrl: 'https://blockchain-bond-base.vercel.app/',
        repoUrl: 'https://github.com/namhyeongseog/BondBase',
        techStack: ['Solidity', 'Ethers.js', 'React Router v7', 'Drizzle ORM'],
        features: ['Blockchain Transparency', 'ESG Scoring Engine', 'Real-time Relayer Sync']
    },
    {
        id: 'choonsim-metaverse',
        title: 'MOGAME Metaverse',
        category: '3D',
        description: 'Next-Generation 3D Virtual Social Space built with Next.js 15 & Three.js.',
        longDescription: 'A comprehensive 3D metaverse platform featuring interactive social spaces. Leveraging Next.js 15 and Three.js for a seamless, high-performance web-based virtual reality experience.',
        thumbnailUrl: '/assets/illustrations/ai-choonsim.png',
        liveUrl: 'https://choonsim-metaverse.vercel.app/',
        techStack: ['Next.js 15', 'Three.js', 'React Three Fiber', 'Tailwind CSS'],
        features: ['Virtual Social Space', '3D Avatar Interaction', 'Next-Gen Graphics']
    },
    {
        id: 'threejs-lab',
        title: 'Three.js Graphics Lab',
        category: '3D',
        description: 'Interactive 3D visualization engine for procedural materials and character animations.',
        longDescription: 'A high-performance WebGL experimentation lab focusing on Three.js, React Three Fiber, and advanced shader development. Features interactive character models and environmental simulations.',
        thumbnailUrl: '/assets/illustrations/3d-graphics-lab.png',
        liveUrl: 'https://threejs-lab-orcin.vercel.app/',
        techStack: ['Three.js', 'React Three Fiber', 'Shaders', 'Next.js'],
        features: ['Real-time 3D Rendering', 'Procedural Grass System', 'Character Animation Rigging']
    }
];
