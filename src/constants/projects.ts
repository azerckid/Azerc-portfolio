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
    frontendTech?: string[];
    backendTech?: string[];
    features: string[];
    stats?: { label: string; value: string }[];
}

export const PROJECTS: Project[] = [
    {
        id: 'ai-agent-studio',
        title: 'AI Agent Lab.',
        category: 'AI',
        description: 'LangGraph, CrewAI 등 최첨단 프레임워크와 Turso 벡터 DB 기반의 RAG 시스템을 결합한 24개 이상의 AI 프로젝트 아카이브입니다. 전체 코드베이스를 분석하여 최적의 솔루션을 제시하는 지능형 AI 검색 엔진을 탑재했습니다.',
        longDescription: '최신 AI 에이전트 기술의 정점을 실험하는 종합 플랫폼입니다. LangGraph의 순환 그래프 제어와 CrewAI의 협업 모델을 넘어, Turso(Vector Search)와 Gemini 2.0 Flash를 연동한 실전 RAG 시스템을 구축했습니다. 이를 통해 24개 프로젝트의 소스코드와 문서를 실시간으로 검색하고 답변을 생성하는 "지능형 어시스턴트" 기능을 제공하며, React 19와 Tailwind v4 기반의 대시보드에서 모든 로직을 투명하게 분석할 수 있습니다.',
        thumbnailUrl: '/assets/illustrations/ai-studio.png',
        liveUrl: 'https://langgraph-lab-eight.vercel.app/',
        repoUrl: 'https://github.com/azerckid/Langgraph-lab',
        techStack: ['Turso (Vector DB)', 'RAG System', 'Gemini 2.0 Flash', 'LangGraph', 'CrewAI', 'Python', 'React 19', 'Tailwind CSS 4'],
        features: ['AI-powered RAG Search', '24+ Specialized Agents', 'Interactive Code Browser', 'Vector Knowledge Base', 'Automated Project Scanning'],
        stats: [
            { label: 'Agents', value: '24+' },
            { label: 'Search', value: 'Semantic' },
            { label: 'Model', value: 'Gemini 2.0' }
        ]
    },
    {
        id: 'chat-bot-choonsim',
        title: 'AI Agent Choonsim',
        category: 'AI',
        description: 'LangGraph 기반의 상태 제어 기술을 활용하여 정교한 에이전트 워크플로우를 구현한 AI 챗봇입니다. 블록체인 X402 결제 엔진을 부가적으로 통합하여 투명한 유료 AI 서비스 아키텍처를 완성했습니다.',
        longDescription: 'LangGraph의 상태 관리(State Management)와 순환 그래프(Cyclic Graph) 제어를 통해 단순 대화 그 이상의 고도화된 답변 생성을 수행하는 AI 에이전트입니다. 여기에 블록체인 X402 결제 시스템을 결합하여, 사용자가 토큰을 통해 AI 기능을 결제하고 검증받는 실전 비즈니스 모델을 구현했습니다.',
        thumbnailUrl: '/assets/illustrations/choonsim_10.jpg',
        liveUrl: 'https://chat-bot-choonsim.vercel.app/home',
        repoUrl: 'https://github.com/azerckid/CHAT_BOT_choonsim',
        techStack: ['LangGraph', 'NEAR Protocol', 'Blockchain X402', 'Google Generative AI', 'React Router v7', 'Zod', 'Tailwind CSS 4'],
        features: ['LangGraph Agent Workflow', 'X402 Payment System', 'Persona-based AI Chat', 'Real-time Streaming', 'Web3 Wallet Connectivity'],
        stats: [
            { label: 'Engine', value: 'LangGraph' },
            { label: 'Payment', value: 'X402' },
            { label: 'Latency', value: 'Low' }
        ]
    },
    {
        id: 'c-stay-blog',
        title: 'AI-Tweet',
        category: 'AI',
        description: 'Next.js 15 SSR 최적화와 AI 기반 콘텐츠 생성 보조 기능을 탑재한 풀스택 블로그로, 현대적인 서버 사이드 아키텍처를 통해 검색 엔진 최적화와 로딩 성능을 극대화했습니다.',
        longDescription: 'React Router v7에서 Next.js 15로의 전환을 통해 서버 사이드 렌더링(SSR) 성능을 극대화한 현대적인 블로그입니다. AI가 게시물 요약 및 태그 생성을 보조하며, SEO 최적화와 Rich Text 에디터 등 전문적인 콘텐츠 관리를 위한 기능을 제공합니다.',
        thumbnailUrl: '/assets/illustrations/fullstack-blog.png',
        liveUrl: 'https://c-stay-blog-01.vercel.app/',
        repoUrl: 'https://github.com/azerckid/C_Stay-blog-01',
        techStack: ['React Router v7', 'AI Content Assist', 'Lucide', 'Better Auth', 'Tailwind CSS 4'],
        features: ['AI Writing Assistant', 'SEO Optimized SSR', 'Modern Rich Text Editor', 'Hybrid Routing Architecture'],
        stats: [
            { label: 'SEO', value: '99+' },
            { label: 'Framework', value: 'Next 15' },
            { label: 'Auth', value: 'Better' }
        ]
    },
    {
        id: 'bondbase',
        title: 'BondBase',
        category: 'Blockchain',
        description: '실물 채권(RWA)의 상태를 온체인에서 실시간으로 추적하는 탈중앙화 ESG 금융 플랫폼입니다. 오프체인의 채권 데이터를 온체인 원장에 동기화하여 투명한 자본 흐름을 보장합니다.',
        longDescription: 'ESG(환경, 사회, 지배구조) 채권의 투명성을 위해 설계된 핀테크 DApp입니다. 오프체인의 채권 데이터를 "Relayer Bot"을 통해 온체인 원장에 기록하여, 투자자들이 자금의 흐름과 영향을 실시간으로 불변하는 블록체인상에서 확인할 수 있게 합니다.',
        thumbnailUrl: '/assets/illustrations/blockchain-bondbase.png',
        liveUrl: 'https://blockchain-bond-base.vercel.app/',
        repoUrl: 'https://github.com/namhyeongseog/BLOCKCHAIN_BOND-BASE',
        techStack: ['Solidity', 'Ethers.js', 'React Router v7', 'Smart Contracts', 'Drizzle ORM'],
        frontendTech: ['React Router v7', 'Drizzle ORM', 'Zod', 'Tailwind CSS 4'],
        backendTech: ['Solidity', 'Ethers.js', 'Smart Contracts'],
        features: ['On-chain ESG Tracking', 'Automated Relayer Sync', 'Transparent Ledger', 'Smart Contract Audited'],
        stats: [
            { label: 'Audit', value: 'Passed' },
            { label: 'Sync', value: 'Real-time' },
            { label: 'Assets', value: 'RWA' }
        ]
    },
    {
        id: 'choonsim-metaverse',
        title: 'MOGAME Metaverse',
        category: '3D',
        description: 'React Three Fiber와 WebGL 기술로 구현된 브라우저 인터랙티브 가상 세계입니다. 실시간 소켓 통신 환경과 절차적 월드 생성 엔진을 통해 몰입형 멀티플레이어 경험을 제공합니다.',
        longDescription: 'React Three Fiber와 WebGL 기술을 활용하여 웹 브라우저만으로 접속 가능한 3D 가상 세계입니다. 절차적(Procedural) 월드 생성 기술과 실시간 소켓 통신을 통해 다중 사용자가 자신의 아바타로 자유롭게 상호작용하고 탐험할 수 있는 몰입형 경험을 제공합니다.',
        thumbnailUrl: '/assets/illustrations/ai-choonsim.png',
        liveUrl: 'https://choonsim-metaverse.vercel.app/',
        repoUrl: 'https://github.com/azerckid/choonsim-metaverse',
        techStack: ['Next.js 15', 'Three.js', 'React Three Fiber', 'WebGL', 'Tailwind CSS'],
        features: ['Real-time Multiplayer', 'Procedural 3D World', 'Avatar Customization', 'Browser-based VR Experience'],
        stats: [
            { label: 'Render', value: '60fps' },
            { label: 'Users', value: 'Multi' },
            { label: 'Engine', value: 'WebGL' }
        ]
    },
    {
        id: 'threejs-lab',
        title: 'Three.js Graphics Lab',
        category: '3D',
        description: '고성능 GLSL 커스텀 셰이더와 물리 엔진 시뮬레이션의 한계를 실험하는 그래픽 연구소입니다. 입자 시스템과 실시간 라이팅 등 브라우저 환경에서 구현 가능한 웹 그래픽의 정점을 실현합니다.',
        longDescription: '웹 그래픽 기술의 정점을 실험하기 위한 테크니컬 쇼케이스입니다. 커스텀 셰이더(GLSL)를 통한 시각 효과, 입자 시스템(Particle System), 그리고 Rapier 기반의 물리 엔진 시뮬레이션 등 다양한 3D 그래픽 기술을 모듈 단위로 테스트하고 시연합니다.',
        thumbnailUrl: '/assets/illustrations/3d-graphics-lab.png',
        liveUrl: 'https://threejs-lab-orcin.vercel.app/',
        repoUrl: 'https://github.com/azerckid/threejs-lab',
        techStack: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'Rapier Physics', 'Next.js'],
        features: ['Custom GLSL Shaders', 'Physics Engine Integration', 'High-performance Rendering', 'Interactive 3D Demos'],
        stats: [
            { label: 'Shaders', value: 'GLSL' },
            { label: 'Physics', value: 'Rapier' },
            { label: 'Demos', value: '10+' }
        ]
    }
];
