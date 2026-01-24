# 01_RAG_SYSTEM_IMPLEMENTATION_PLAN.md - RAG 시스템 구현 계획서

## 1. 프로젝트 개요

### 1.1. 목적
AI Agent Lab 프로젝트(24개 AI 에이전트 아카이브)에 RAG(Retrieval-Augmented Generation) 시스템을 구축하여, 사용자가 자연어로 질문하면 관련 프로젝트 코드와 문서를 검색하고 LLM이 이를 참조하여 정확한 답변을 생성하는 지능형 검색 시스템을 구현합니다.

### 1.2. 핵심 가치
- **실용적 유스케이스**: "24개 AI 프로젝트를 학습한 AI 어시스턴트"
- **기술 차별화**: LangGraph + RAG의 최신 기술 스택 조합
- **포트폴리오 임팩트**: 실제 코드베이스를 검색하는 실전 RAG 시스템

### 1.3. 대상 프로젝트
- **프로젝트명**: AI Agent Lab (Langgraph-lab)
- **라이브 URL**: https://langgraph-lab-eight.vercel.app/
- **데이터 규모**: 24개 AI 에이전트 프로젝트 (약 240개 파일 추정)
- **현재 기능**: Interactive Code Browser, Automated Project Scanning

---

## 2. RAG 시스템 아키텍처

### 2.1. 구현 전략: 2-Phase Approach

#### **Phase 1: Simple RAG** (벡터 DB 없이)
- **목표**: RAG 핵심 개념 구현 및 프로토타입 검증
- **기간**: 1-2주
- **기술 스택**:
  - LangGraph (워크플로우 오케스트레이션)
  - Google Gemini / OpenAI (LLM)
  - TF-IDF / BM25 (키워드 기반 검색)
  - React 19 + Tailwind CSS 4 (UI)

#### **Phase 2: Semantic RAG** (벡터 DB 활용) - 선택 사항
- **목표**: 의미 기반 검색으로 정확도 향상
- **기간**: 추가 1-2주
- **기술 스택**:
  - Supabase Vector (pgvector) 또는 Pinecone
  - OpenAI Embeddings (text-embedding-3-small)
  - LangChain Document Loaders

---

## 3. Phase 1: Simple RAG 상세 설계

### 3.1. 시스템 플로우

```
[사용자 질문]
    ↓
[1. Query Processing]
    - 질문 분석 및 키워드 추출
    - 카테고리 분류 (LangGraph, CrewAI, Gemini 등)
    ↓
[2. Document Retrieval]
    - 프로젝트 메타데이터 검색 (projects.ts)
    - 관련 코드 파일 로드
    - 청크 단위로 분할
    ↓
[3. Context Ranking]
    - TF-IDF 스코어링
    - Top-K 문서 선택 (K=5)
    ↓
[4. LLM Generation]
    - 검색된 컨텍스트 + 질문을 프롬프트에 포함
    - LLM 답변 생성
    ↓
[5. Response Formatting]
    - 답변 + 참조 소스 표시
    - 코드 스니펫 하이라이팅
```

### 3.2. 데이터 준비

#### 3.2.1. 프로젝트 메타데이터 확장
현재 `src/constants/projects.ts`를 확장하여 검색 가능한 필드 추가:

```typescript
export interface Project {
  // 기존 필드
  id: string;
  title: string;
  category: 'AI' | 'Blockchain' | '3D' | 'Full-Stack';
  description: string;
  techStack: string[];
  features: string[];
  
  // RAG용 추가 필드
  keywords?: string[];           // 검색 키워드
  codeFiles?: string[];          // 주요 코드 파일 경로
  documentation?: string;        // 프로젝트 설명 문서
  useCases?: string[];          // 사용 사례
}
```

#### 3.2.2. 문서 청킹 전략
- **청크 크기**: 500-1000 토큰
- **오버랩**: 100 토큰 (문맥 유지)
- **청크 단위**:
  - 코드 파일: 함수/클래스 단위
  - 문서: 섹션 단위
  - README: 헤딩 단위

### 3.3. LangGraph 워크플로우 설계

```python
from langgraph.graph import StateGraph, END

# 상태 정의
class RAGState(TypedDict):
    query: str                    # 사용자 질문
    keywords: List[str]           # 추출된 키워드
    retrieved_docs: List[Dict]    # 검색된 문서
    context: str                  # LLM에 전달할 컨텍스트
    answer: str                   # 최종 답변
    sources: List[str]            # 참조 소스

# 워크플로우 구성
workflow = StateGraph(RAGState)

# 노드 추가
workflow.add_node("extract_keywords", extract_keywords_node)
workflow.add_node("retrieve_documents", retrieve_documents_node)
workflow.add_node("rank_documents", rank_documents_node)
workflow.add_node("generate_answer", generate_answer_node)

# 엣지 연결
workflow.add_edge("extract_keywords", "retrieve_documents")
workflow.add_edge("retrieve_documents", "rank_documents")
workflow.add_edge("rank_documents", "generate_answer")
workflow.add_edge("generate_answer", END)

# 시작점 설정
workflow.set_entry_point("extract_keywords")
```

### 3.4. 핵심 컴포넌트 구현

#### 3.4.1. Document Retriever
```python
def retrieve_documents_node(state: RAGState) -> RAGState:
    """프로젝트 메타데이터와 코드 파일에서 관련 문서 검색"""
    keywords = state["keywords"]
    
    # 1. 프로젝트 필터링
    relevant_projects = filter_projects_by_keywords(keywords)
    
    # 2. 코드 파일 로드
    documents = []
    for project in relevant_projects:
        for file_path in project["codeFiles"]:
            content = load_file(file_path)
            chunks = split_into_chunks(content)
            documents.extend(chunks)
    
    state["retrieved_docs"] = documents
    return state
```

#### 3.4.2. TF-IDF Ranker
```python
from sklearn.feature_extraction.text import TfidfVectorizer

def rank_documents_node(state: RAGState) -> RAGState:
    """TF-IDF로 문서 순위 매기기"""
    query = state["query"]
    docs = state["retrieved_docs"]
    
    # TF-IDF 벡터화
    vectorizer = TfidfVectorizer()
    doc_texts = [doc["content"] for doc in docs]
    tfidf_matrix = vectorizer.fit_transform([query] + doc_texts)
    
    # 코사인 유사도 계산
    from sklearn.metrics.pairwise import cosine_similarity
    similarities = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()
    
    # Top-K 선택
    top_k_indices = similarities.argsort()[-5:][::-1]
    top_docs = [docs[i] for i in top_k_indices]
    
    # 컨텍스트 생성
    context = "\n\n---\n\n".join([
        f"[{doc['project']}] {doc['file']}\n{doc['content']}"
        for doc in top_docs
    ])
    
    state["context"] = context
    state["sources"] = [doc["file"] for doc in top_docs]
    return state
```

#### 3.4.3. LLM Answer Generator
```python
def generate_answer_node(state: RAGState) -> RAGState:
    """LLM을 사용하여 답변 생성"""
    query = state["query"]
    context = state["context"]
    
    prompt = f"""
당신은 AI Agent Lab의 24개 프로젝트를 학습한 전문 어시스턴트입니다.
아래 프로젝트 코드와 문서를 참고하여 질문에 답변해주세요.

# 참고 자료
{context}

# 질문
{query}

# 답변 지침
1. 제공된 코드와 문서를 기반으로 정확하게 답변하세요.
2. 코드 예시를 포함하여 구체적으로 설명하세요.
3. 어떤 프로젝트를 참조했는지 명시하세요.
4. 확실하지 않은 경우 "제공된 자료에서는 찾을 수 없습니다"라고 답변하세요.
"""
    
    # LLM 호출 (Gemini 또는 OpenAI)
    answer = llm.generate(prompt)
    
    state["answer"] = answer
    return state
```

### 3.5. UI 컴포넌트 설계

#### 3.5.1. RAG Search Interface
```typescript
// src/components/features/RAGSearchPanel.tsx

interface RAGSearchPanelProps {
  onSearch: (query: string) => void;
}

export function RAGSearchPanel({ onSearch }: RAGSearchPanelProps) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RAGResult | null>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    const response = await fetch('/api/rag/search', {
      method: 'POST',
      body: JSON.stringify({ query })
    });
    const data = await response.json();
    setResult(data);
    setIsLoading(false);
  };

  return (
    <div className="rag-search-panel">
      <div className="search-input-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="AI 프로젝트에 대해 질문하세요... (예: LangGraph에서 상태를 어떻게 관리하나요?)"
          className="search-input"
        />
        <button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? '검색 중...' : '검색'}
        </button>
      </div>

      {result && (
        <div className="search-result">
          <div className="answer-section">
            <h3>답변</h3>
            <ReactMarkdown>{result.answer}</ReactMarkdown>
          </div>

          <div className="sources-section">
            <h3>참조 소스</h3>
            <ul>
              {result.sources.map((source, idx) => (
                <li key={idx}>
                  <a href={`/projects/${source.projectId}?file=${source.file}`}>
                    {source.project} - {source.file}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="code-snippets">
            <h3>관련 코드</h3>
            {result.codeSnippets.map((snippet, idx) => (
              <CodeBlock key={idx} code={snippet.content} language={snippet.language} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

#### 3.5.2. 대시보드 통합
기존 AI Agent Lab 대시보드에 새로운 "RAG Search" 탭 추가:

```typescript
// src/app/page.tsx 수정

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'rag'>('overview');

  return (
    <div className="dashboard">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">프로젝트 개요</TabsTrigger>
          <TabsTrigger value="code">코드 브라우저</TabsTrigger>
          <TabsTrigger value="rag">AI 검색</TabsTrigger> {/* 새로 추가 */}
        </TabsList>

        <TabsContent value="overview">
          <ProjectOverview />
        </TabsContent>

        <TabsContent value="code">
          <CodeBrowser />
        </TabsContent>

        <TabsContent value="rag">
          <RAGSearchPanel /> {/* 새로 추가 */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

---

## 4. API 엔드포인트 설계

### 4.1. POST /api/rag/search

**요청:**
```json
{
  "query": "LangGraph에서 순환 그래프를 어떻게 구현하나요?",
  "topK": 5,
  "includeCode": true
}
```

**응답:**
```json
{
  "answer": "LangGraph에서 순환 그래프는 `add_conditional_edges()`를 사용하여 구현합니다...",
  "sources": [
    {
      "projectId": "langgraph-cyclic-agent",
      "project": "Cyclic Agent Example",
      "file": "src/graph.py",
      "relevanceScore": 0.92
    }
  ],
  "codeSnippets": [
    {
      "content": "workflow.add_conditional_edges(\n    'agent',\n    should_continue,\n    {...}\n)",
      "language": "python",
      "file": "src/graph.py",
      "lineStart": 45,
      "lineEnd": 50
    }
  ],
  "processingTime": "1.2s"
}
```

### 4.2. GET /api/rag/suggestions

자동 완성 제안:
```json
{
  "suggestions": [
    "LangGraph에서 상태를 어떻게 관리하나요?",
    "CrewAI와 LangGraph의 차이점은?",
    "멀티모달 에이전트 구현 예제 보여줘"
  ]
}
```

---

## 5. 구현 로드맵

### 5.1. Week 1: 데이터 준비 및 기본 검색
- [ ] 프로젝트 메타데이터 확장 (`projects.ts`)
- [ ] 코드 파일 스캐닝 스크립트 작성
- [ ] 문서 청킹 로직 구현
- [ ] TF-IDF 기반 검색 엔진 구현

### 5.2. Week 2: LangGraph 워크플로우 구현
- [ ] RAG 상태 그래프 설계
- [ ] 각 노드 함수 구현 (retrieve, rank, generate)
- [ ] LLM 통합 (Gemini/OpenAI)
- [ ] 에러 핸들링 및 폴백 로직

### 5.3. Week 3: UI 개발
- [ ] RAG Search Panel 컴포넌트 구현
- [ ] 대시보드 탭 통합
- [ ] 로딩 상태 및 스트리밍 UI
- [ ] 참조 소스 링크 연결

### 5.4. Week 4: 테스트 및 최적화
- [ ] 검색 정확도 테스트 (10개 샘플 질문)
- [ ] 응답 속도 최적화 (< 3초 목표)
- [ ] UI/UX 개선
- [ ] 문서화 및 데모 준비

---

## 6. 성공 지표 (KPI)

### 6.1. 기술적 지표
- **검색 정확도**: Top-5 결과에 관련 문서 포함률 > 80%
- **응답 속도**: 평균 응답 시간 < 3초
- **커버리지**: 24개 프로젝트 중 검색 가능한 프로젝트 비율 > 90%

### 6.2. 사용자 경험 지표
- **답변 품질**: 코드 예시 포함 여부
- **참조 정확성**: 제공된 소스가 실제 관련 있는지
- **UI 반응성**: 로딩 상태 명확성

### 6.3. 포트폴리오 임팩트
- **기술 차별화**: LangGraph + RAG 조합 시연
- **실용성**: 실제 코드베이스 검색 가능
- **확장성**: Phase 2로 업그레이드 가능한 구조

---

## 7. Phase 2: Semantic RAG (선택 사항)

### 7.1. 업그레이드 시점
다음 조건 중 하나 이상 충족 시:
- Phase 1 검색 정확도 < 70%
- 의미 기반 검색 필요성 증가 (예: "상태 관리" vs "state management")
- 데이터 규모 증가 (프로젝트 > 50개)

### 7.2. 추가 구현 사항
- **벡터 DB 선택**: Supabase Vector (무료 티어)
- **임베딩 모델**: OpenAI text-embedding-3-small
- **마이그레이션**:
  1. 모든 문서 청크를 임베딩으로 변환
  2. Supabase Vector 테이블에 저장
  3. 검색 로직을 벡터 유사도 검색으로 변경

### 7.3. 예상 개선 효과
- 검색 정확도: 80% → 95%
- 다국어 지원 가능 (임베딩 공간에서 언어 무관)
- 동의어/유사어 자동 매칭

---

## 8. 리스크 및 대응 방안

### 8.1. 리스크
| 리스크 | 영향도 | 대응 방안 |
|--------|--------|-----------|
| LLM API 비용 초과 | 중 | 캐싱 전략, 무료 티어 활용 (Gemini) |
| 검색 정확도 낮음 | 고 | 키워드 가중치 조정, Phase 2 조기 전환 |
| 응답 속도 느림 | 중 | 청크 크기 최적화, 병렬 처리 |
| 프로젝트 스캔 실패 | 중 | 수동 메타데이터 입력 폴백 |

### 8.2. 기술적 제약
- **데이터 최신성**: 프로젝트 업데이트 시 재스캔 필요
- **멀티모달 제한**: 코드와 텍스트만 지원 (이미지/비디오 제외)
- **컨텍스트 길이**: LLM 토큰 제한 (Gemini: 32K, GPT-4: 128K)

---

## 9. 참고 자료

### 9.1. 기술 문서
- [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)
- [RAG Best Practices (LangChain)](https://python.langchain.com/docs/use_cases/question_answering/)
- [TF-IDF in Python (scikit-learn)](https://scikit-learn.org/stable/modules/feature_extraction.html#tfidf-term-weighting)

### 9.2. 유사 프로젝트
- [Cursor AI Code Search](https://cursor.sh/)
- [GitHub Copilot Chat](https://github.com/features/copilot)
- [Sourcegraph Cody](https://sourcegraph.com/cody)

---

## 10. 문서 이력

| 버전 | 날짜 | 작성자 | 변경 사항 |
|------|------|--------|-----------|
| 1.0 | 2026-01-24 | AI Agent Antigravity | 초안 작성 |

---

**Last Updated**: 2026-01-24  
**Status**: Draft  
**Next Review**: Phase 1 완료 후
