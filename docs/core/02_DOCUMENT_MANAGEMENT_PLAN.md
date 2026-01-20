# 02_DOCUMENT_MANAGEMENT_PLAN.md - 문서 관리 계획

## 1. 개요
본 프로젝트의 모든 문서는 체계적인 관리와 추적 가능성을 위해 `docs/` 디렉토리 하위의 7개 핵심 카테고리로 분류하여 관리합니다.

## 2. 디렉토리 구조 및 역할

1. **`docs/core/`**: 시스템 전반의 설계 기초, DB 스키마, 표준 규칙 및 기획서.
   - 예시: `01_PLAN.md`, `02_DOCUMENT_MANAGEMENT_PLAN.md`
2. **`docs/features/`**: 개별 기능(AI 가이드, 3D 뷰어 등)에 대한 상세 명세서.
3. **`docs/roadmap/`**: 향후 구현 계획 및 전략적 제안서.
4. **`docs/reports/`**: 검증 리포트, 테스트 결과 및 히스토리.
5. **`docs/guides/`**: 개발자 및 운영자를 위한 실무 가이드 및 트러블슈팅.
6. **`docs/stitch/`**: 각 화면별 UI/UX 상세 디자인 및 플로우차트.
7. **`docs/archive/`**: 과거 이력 보관용 (직접 참조 금지).

## 3. 문서 작성 원칙

### 3.1. [Document Prefix Numbering Rule]
- 모든 파일명 앞에는 생성 순서를 나타내는 2자리 숫자를 접두어로 붙입니다.
- 예: `01_PLAN.md`, `02_STRUCTURE.md`

### 3.2. [Strict Document Integrity Rule]
- 문서를 업데이트할 때 기존 내용을 삭제하거나 덮어쓰지 않고, 새로운 정보를 추가하거나 증분 업데이트를 수행하여 히스토리를 보존합니다.

### 3.3. 한국어 사용 원칙
- 모든 기획 및 기술 문서의 본문은 한국어로 작성하여 소통의 명확성을 높입니다. (단, 코드명이나 기술 용어는 영어 병기)

---
**Last Updated**: 2026-01-20
**Approved by**: AI Agent Antigravity
