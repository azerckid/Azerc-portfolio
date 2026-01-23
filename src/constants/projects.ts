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
    stats?: { label: string; value: string }[];
}

export const PROJECTS: Project[] = [
    {
        id: 'ai-agent-studio',
        title: 'AI Agent Lab.',
        category: 'AI',
        description: 'LangGraph, CrewAI, Gemini 등 최첨단 에이전트 프레임워크를 활용하여 개발된 20개 이상의 실전 AI 프로젝트 아카이브입니다. 자율 에이전트의 사고 과정(Chain-of-Thought)을 시각화하고 코드 로직을 실시간으로 분석할 수 있는 통합 엔지니어링 대시보드를 제공합니다.',
        longDescription: '최신 AI 에이전트 기술의 정점을 실험하는 종합 아카이브입니다. LangGraph의 순환 그래프 제어, CrewAI의 멀티 에이전트 협업, Gemini 및 OpenAI의 멀티모달 기능을 모두 포함합니다. React 19와 Tailwind v4 기반의 "실험실 대시보드"를 통해 실시간 상태 모니터링과 코드 로직 분석(Code Browser)이 가능한 연구 플랫폼입니다.',
        thumbnailUrl: '/assets/illustrations/ai-studio.png',
        liveUrl: 'https://langgraph-lab-eight.vercel.app/',
        repoUrl: 'https://github.com/azerckid/Langgraph-lab',
        techStack: ['LangGraph', 'CrewAI', 'Google Gemini', 'OpenAI', 'Python', 'React 19', 'Tailwind CSS 4'],
        features: ['20+ Specialized Agents', 'Multi-Model Ecosystem', 'Cyclic State Graph', 'Interactive Code Browser', 'Automated Project Scanning'],
        stats: [
            { label: 'Agents', value: '24+' },
            { label: 'Models', value: 'Multi' },
            { label: 'Runtime', value: 'Edge' }
        ]
    },
    {
        id: 'chat-bot-choonsim',
        title: 'AI Agent Choonsim',
        category: 'AI',
        description: 'NEAR 프로토콜 기반의 토큰 결제 시스템이 결합된 하이브리드 AI 페르소나 챗봇.',
        longDescription: '사용자가 암호화폐 토큰(CHOCO)을 사용하여 프리미엄 AI 페르소나와 대화할 수 있는 "Token-gated" 서비스 모델입니다. Vercel AI SDK를 활용한 초저지연 스트리밍 채팅과 NEAR 블록체인 스마트 컨트랙트를 통한 투명한 결제 검증 시스템이 결합되었습니다.',
        thumbnailUrl: '/assets/illustrations/choonsim_10.jpg',
        liveUrl: 'https://chat-bot-choonsim.vercel.app/home',
        repoUrl: 'https://github.com/azerckid/CHAT_BOT_choonsim',
        techStack: ['Next.js', 'Vercel AI SDK', 'OpenAI', 'NEAR Protocol', 'Rust Smart Contract', 'Tailwind CSS'],
        features: ['Token-based Payment System', 'Persona-based AI Chat', 'Real-time Streaming', 'Web3 Wallet Integration', 'Zero-latency Edge Runtime'],
        stats: [
            { label: 'Network', value: 'NEAR' },
            { label: 'Payment', value: 'CHOCO' },
            { label: 'Latency', value: 'Low' }
        ]
    },
    {
        id: 'c-stay-blog',
        title: 'AI-Tweet',
        category: 'AI',
        description: 'AI 기반 콘텐츠 생성 보조 및 Next.js SSR 최적화가 적용된 풀스택 블로그 플랫폼.',
        longDescription: 'React Router v7에서 Next.js 15로의 전환을 통해 서버 사이드 렌더링(SSR) 성능을 극대화한 현대적인 블로그입니다. AI가 게시물 요약 및 태그 생성을 보조하며, SEO 최적화와 Rich Text 에디터 등 전문적인 콘텐츠 관리를 위한 기능을 제공합니다.',
        thumbnailUrl: '/assets/illustrations/fullstack-blog.png',
        liveUrl: 'https://c-stay-blog-01.vercel.app/',
        repoUrl: 'https://github.com/azerckid/C_Stay-blog-01',
        techStack: ['Next.js 15', 'React Router v7', 'AI Content Assist', 'Lucide', 'Better Auth'],
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
        description: '실물 채권의 상태를 온체인에서 실시간으로 투명하게 추적하는 탈중앙화 ESG 금융 플랫폼.',
        longDescription: 'ESG(환경, 사회, 지배구조) 채권의 투명성을 위해 설계된 핀테크 DApp입니다. 오프체인의 채권 데이터를 "Relayer Bot"을 통해 온체인 원장에 기록하여, 투자자들이 자금의 흐름과 영향을 실시간으로 불변하는 블록체인상에서 확인할 수 있게 합니다.',
        thumbnailUrl: '/assets/illustrations/blockchain-bondbase.png',
        liveUrl: 'https://blockchain-bond-base.vercel.app/',
        repoUrl: 'https://github.com/namhyeongseog/BLOCKCHAIN_BOND-BASE',
        techStack: ['Solidity', 'Ethers.js', 'React Router v7', 'Smart Contracts', 'Drizzle ORM'],
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
        description: '별도의 설치 없이 브라우저에서 실행되는 고성능 WebGL 기반 멀티플레이어 메타버스.',
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
        description: '고성능 GLSL 셰이더와 물리 엔진의 한계를 실험하는 WebGL 인터랙티브 그래픽 연구소.',
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
