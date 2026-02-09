# ===========================================
# Stage 1: Dependencies
# ===========================================
FROM node:20-alpine AS deps

# libc6-compat: Alpine에서 일부 npm 패키지 호환성을 위해 필요
RUN apk add --no-cache libc6-compat

WORKDIR /app

# 의존성 파일 복사
COPY package.json yarn.lock ./

# 의존성 설치
RUN yarn install --frozen-lockfile

# ===========================================
# Stage 2: Builder
# ===========================================
FROM node:20-alpine AS builder

WORKDIR /app

# deps 스테이지에서 node_modules 복사
COPY --from=deps /app/node_modules ./node_modules

# 소스 코드 복사
COPY . .

# 환경 변수 (빌드 시 필요한 PUBLIC 변수)
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Next.js 텔레메트리 비활성화
ENV NEXT_TELEMETRY_DISABLED=1

# 빌드
RUN yarn build

# ===========================================
# Stage 3: Runner (Production)
# ===========================================
FROM node:20-alpine AS runner

WORKDIR /app

# 프로덕션 환경 설정
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 보안: non-root 사용자 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# public 폴더 복사 (있는 경우)
COPY --from=builder /app/public ./public

# standalone 빌드 결과물 복사
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# non-root 사용자로 전환
USER nextjs

# 포트 노출
EXPOSE 3000

# 환경 변수로 포트 설정 가능
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 실행
CMD ["node", "server.js"]
