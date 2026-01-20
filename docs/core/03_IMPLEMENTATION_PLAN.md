# 03_IMPLEMENTATION_PLAN.md - 개발 구현 계획서

## 1. 개요
본 문서는 `01_PLAN.md`에서 정의한 AZERC Portfolio 프로젝트를 실제로 구축하기 위한 구체적인 기술적 접근 방식과 구현 단계를 정의합니다.

## 2. 기술 스택 상세 (Technology Stack)

### 2.1. Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 (Alpha/Beta 활용 고려)
- **Component Library**: shadcn/ui (Tailwind v4 호환 설정)
- **Animation**: Framer Motion (Scroll-triggered animations, Layout transitions)
- **3D Graphics**: React Three Fiber (R3F), Drei

### 2.2. Backend & Data
- **Logic**: Next.js Server Components & Route Handlers
- **DB (Optional/Future)**: SQLite with Drizzle ORM (프로젝트 데이터 관리용)
- **Validation**: Zod (데이터 스키마 검증)

## 3. 핵심 아키텍처 디자인

### 3.1. 컴포넌트 구조
- `/components/ui`: 최하단 공통 UI (버튼, 입력창 등)
- `/components/shared`: 전역 레이아웃 구성 요소 (Header, Footer, Navigation)
- `/components/features`: 기능별 핵심 컴포넌트 (ProjectCard, ThreeScene, AIChat)

### 3.2. 데이터 모델링 (Project Object)
```typescript
interface Project {
  id: string;
  title: string;
  category: 'AI' | 'Blockchain' | '3D' | 'Full-Stack';
  description: string;
  thumbnailUrl: string;
  liveUrl: string;
  repoUrl?: string;
  techStack: string[];
  architectureDiagram?: string; // Mermaid string
  features: string[];
}
```

## 4. 단계별 구현 세부 사항

### Phase 1: Environment & Foundation
- [ ] Next.js 15 프로젝트 초기화
- [ ] Tailwind CSS v4 및 디자인 토큰(Color, Font) 설정
- [ ] 기본 레이아웃 (Glassmorphism 적용된 Header/Footer) 구축

### Phase 2: Core Showcase Page
- [ ] 메인 히어로 섹션 (Three.js 기반의 배경 또는 오브젝트)
- [ ] 프로젝트 그리드 레이아웃 구현
- [ ] 개별 프로젝트 상세 카드 UI (Hover 효과 및 마이크로 인터랙션)

### Phase 3: Project Detail & Story
- [ ] 개별 프로젝트 상세 페이지 (Dynamic Routes: `/project/[id]`)
- [ ] Mermaid.js 통합을 통한 아키텍처 다이어그램 가시화
- [ ] 개발 과정 및 트러블슈팅 콘텐츠 구성

### Phase 4: AI Assistant Integration
- [ ] 포트폴리오 안내용 AI 챗봇 인터페이스 구축
- [ ] 프로젝트 데이터를 기반으로 한 RAG(Retrieval-Augmented Generation) 기초 구현

## 5. 성능 및 품질 기준
- **Vercel Performance Checklist**:
  - `React.lazy`를 활용한 3D 컴포넌트 지연 로딩
  - 이미지 최적화 (`next/image`)
  - 폰트 최적화 (`next/font`)
  - LCP(Largest Contentful Paint) 2.5초 이내 달성 목표

---
**Last Updated**: 2026-01-20
**Version**: 1.0.0
