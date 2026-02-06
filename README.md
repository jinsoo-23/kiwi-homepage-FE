# Kiwi Homepage Frontend

Kiwi LMS 제품 홈페이지 프론트엔드

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State Management**: TanStack Query (React Query)
- **Form**: React Hook Form + Zod
- **i18n**: next-intl

## 시작하기

### 환경 설정

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

### 설치 및 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행 (포트 5002)
yarn dev

# 프로덕션 빌드
yarn build

# 프로덕션 실행
yarn start
```

## 프로젝트 구조

```
├── app/
│   ├── [locale]/           # 다국어 페이지 (ko, en)
│   │   ├── page.tsx        # 메인 페이지
│   │   └── privacy-policy/ # 개인정보 처리방침
│   └── admin/              # 관리자 페이지
│       ├── login/          # 로그인
│       └── inquiries/      # 문의 관리
├── components/
│   ├── layout/             # 레이아웃 컴포넌트
│   ├── sections/           # 섹션 컴포넌트
│   └── ui/                 # UI 컴포넌트
├── lib/
│   └── api/                # API 클라이언트
├── contexts/               # React Context
├── i18n/                   # 다국어 설정
└── messages/               # 번역 파일
```

## 주요 기능

### 공개 페이지
- 제품 소개 (Hero, Features, CTA)
- 문의 폼
- 광고성 정보 수신 동의 변경
- 개인정보 처리방침

### 관리자 페이지 (/admin)
- JWT 인증 (HttpOnly Cookie)
- 문의 목록 조회
  - 페이지네이션 (5, 10, 25개)
  - 검색 (이름, 이메일, 기업명)
  - 필터 (상태, 광고 수신 동의)
- 문의 상세 조회
- 상태 변경 / 삭제
- 엑셀 다운로드

## 스크립트

```bash
yarn dev      # 개발 서버
yarn build    # 프로덕션 빌드
yarn start    # 프로덕션 실행
yarn lint     # ESLint 검사
```
