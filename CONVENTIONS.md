# 프로젝트 네이밍 컨벤션

## 폴더 구조

```
linus-kiwi-homepage/
├── app/                    # Next.js App Router
├── components/
│   ├── layout/            # 레이아웃 컴포넌트 (Header, Footer)
│   ├── sections/          # 페이지 섹션별 컴포넌트
│   │   └── {section-name}/ # 섹션 폴더 (kebab-case)
│   └── ui/                # 재사용 가능한 UI 컴포넌트
├── lib/
│   ├── data/              # 정적 데이터
│   ├── hooks/             # 커스텀 훅
│   └── types/             # 타입 정의
└── public/                # 정적 파일
```

## 네이밍 규칙

### 폴더명: `kebab-case`

```
✅ components/sections/hero-section/
✅ lib/data/
❌ components/sections/heroSection/
```

### 컴포넌트 파일: `PascalCase.tsx`

```
✅ HeroSection.tsx
✅ ContactForm.tsx
✅ Button.tsx
❌ hero-section.tsx
❌ contactForm.tsx
```

### 유틸리티/데이터 파일: `camelCase.ts`

```
✅ countryCodes.ts
✅ scrollAnimation.ts
✅ utils.ts
❌ country-codes.ts
❌ scroll-animation.ts
```

### 타입/스키마 파일: `camelCase.ts`

```
✅ formSchema.ts
✅ partnerTypes.ts
❌ form-schema.ts
```

### 훅 파일: `use` + `camelCase.ts`

```
✅ useScrollAnimation.ts
✅ useMediaQuery.ts
❌ use-scroll-animation.ts
```

### 상수: `UPPER_SNAKE_CASE`

```typescript
✅ export const COUNTRY_CODES = [...]
✅ export const MAX_FILE_SIZE = 1024
❌ export const countryCodes = [...]
```

## 배럴 파일 (index.ts)

각 폴더에 `index.ts`를 생성하여 export를 통합합니다.

```typescript
// components/ui/index.ts
export { Button } from "./Button";
export { Card } from "./Card";
export { Container } from "./Container";
```

**사용 예시:**

```typescript
// ✅ 권장
import { Button, Card } from "@/components/ui";

// ❌ 비권장 (index.ts가 있는 경우)
import { Button } from "@/components/ui/Button";
```

## 컴포넌트 네이밍 패턴

### 섹션 컴포넌트

`{Feature}Section.tsx` 형식을 사용합니다.

```
✅ HeroSection.tsx
✅ ContactSection.tsx
✅ PartnersCarouselSection.tsx
```

### 하위 컴포넌트

섹션의 하위 컴포넌트는 섹션명을 prefix로 사용합니다.

```
hero/
├── HeroSection.tsx        # 메인 섹션
├── HeroCTAButtons.tsx     # 하위 컴포넌트
└── index.ts
```

## Import 순서

1. React/Next.js
2. 외부 라이브러리
3. 내부 컴포넌트 (`@/components/`)
4. 유틸리티/훅 (`@/lib/`)
5. 타입
6. 스타일

```typescript
import { useState } from "react";
import Image from "next/image";

import { motion } from "framer-motion";

import { Button, Container } from "@/components/ui";
import { useScrollAnimation } from "@/lib/hooks";
import { Partner } from "@/lib/types";
```

---

## Git 컨벤션

### 커밋 메시지: Conventional Commits (한글)

```
<type>: <subject>

[optional body]
```

**타입:**

| 타입 | 설명 |
|------|------|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서 수정 |
| `style` | 코드 포맷팅, 세미콜론 누락 등 (기능 변경 X) |
| `refactor` | 코드 리팩토링 |
| `test` | 테스트 코드 추가/수정 |
| `chore` | 빌드, 패키지 매니저 설정 등 |

**예시:**

```
feat: 로그인 기능 추가
fix: 헤더 스크롤 버그 수정
refactor: ContactForm 컴포넌트 분리
docs: README 업데이트
chore: ESLint 설정 추가
```

### 브랜치 네이밍: `type/description`

```
✅ feature/login
✅ bugfix/header-scroll
✅ refactor/contact-form
✅ hotfix/critical-bug
❌ login-feature
❌ fix_header
```

**브랜치 타입:**

| 타입 | 설명 |
|------|------|
| `feature` | 새로운 기능 개발 |
| `bugfix` | 버그 수정 |
| `hotfix` | 긴급 버그 수정 |
| `refactor` | 리팩토링 |
| `docs` | 문서 작업 |

---

## CSS/Tailwind 컨벤션

### 스타일 방식: Tailwind 전용

- `className`에 Tailwind 클래스만 사용
- 복잡한 스타일은 CVA(class-variance-authority) 활용
- `cn()` 유틸리티로 조건부 클래스 결합

### 클래스 순서: 자동 정렬 (prettier-plugin-tailwindcss)

Prettier가 자동으로 정렬합니다. 수동 작성 시 참고:

```
레이아웃 → 크기 → 여백 → 타이포그래피 → 배경 → 테두리 → 효과
```

```tsx
// ✅ 정렬된 순서
className="flex items-center w-full p-4 text-lg bg-white border rounded-lg shadow-md"
```

### 반응형: 모바일 우선 (Mobile First)

```tsx
// ✅ 모바일 → md → lg 순서
className="w-[200px] md:w-[280px] lg:w-[334px]"
className="text-base md:text-xl lg:text-2xl"

// ❌ 역순
className="lg:w-[334px] md:w-[280px] w-[200px]"
```

### 조건부 스타일: cn() 유틸리티

```tsx
import { cn } from "@/lib/utils";

// ✅ cn() 사용
className={cn(
  "base-styles",
  isActive && "active-styles",
  variant === "primary" && "primary-styles"
)}
```

---

## 이미지/에셋 컨벤션

### 폴더 구조: 용도별 분리

```
public/
├── icons/          # 아이콘 (SVG)
├── images/         # 일반 이미지 (PNG, JPG, WebP)
├── logos/          # 로고 파일
└── videos/         # 비디오 파일 (필요시)
```

### 파일명: `kebab-case`

```
✅ hero-preview.svg
✅ partner-logo.png
✅ contact-bg.webp
❌ heroPreview.svg
❌ partner_logo.png
```

### 네이밍 패턴

```
{용도}-{설명}.{확장자}
```

**예시:**

```
icons/
├── arrow-right.svg
├── check-circle.svg
└── menu-hamburger.svg

images/
├── hero-background.webp
├── intro-preview.png
└── contact-map.jpg

logos/
├── kiwi-logo.svg
├── linus-logo.svg
└── partner-zoom.svg
```

### 이미지 최적화

- **아이콘**: SVG 사용 (벡터)
- **사진**: WebP 우선, 폴백으로 PNG/JPG
- **로고**: SVG 사용
- Next.js `<Image>` 컴포넌트 활용
