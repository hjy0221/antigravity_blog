# 🚀 Cheers Blog

[日本語](https://github.com/hjy0221/antigravity_blog#%E6%97%A5%E6%9C%AC%E8%AA%9E) · [English](https://github.com/hjy0221/antigravity_blog#english) · [한국어](https://github.com/hjy0221/antigravity_blog#%ED%95%9C%EA%B5%AD%EC%96%B4)

## 日本語

> **Next.js＆Supabaseで構築した強力で美しいプライベートブログプラットフォーム**

思考を記録し、貴重な情報を共有するために最適化されたブログサービスです。 **Next.js 15+（App Router）**と**Supabase**の強力な機能を組み合わせて、迅速で信頼性の高いユーザーエクスペリエンスを提供します。

---

## ✨ コア機能

- 📝 **強力なマークダウンエディタ** - リアルタイムプレビューと豊富なテキストスタイリングをサポートする専用エディタ
- 🔐 **セキュリティ認証（Supabase Auth）** - 安全な電子メールログインと会員登録システム
- 🗂️ **インテリジェントカテゴリ管理** - 柔軟なカテゴリベースのポスト分類とナビゲーション
- 🔍 **リアルタイム検索フィルタリング** - タイトルとコンテンツを組み合わせたリアルタイム検索とフィルタリング機能
- 🎨 **プレミアムデザイン＆ダークモード** - エレガントなレイアウトと目の快適なダークモードの自動同期
- ⚡ **高性能サーバーサイドロジック** - Server Actionsを使用した効率的なデータ処理

---

## 🛠️ 技術スタック

|エリア|技術
|---|---|
| **Frontend** | `Next.js 15+`、`React 19`、`Tailwind CSS v4` |
| **Backend** | `Supabase`（Auth、Database、Storage）|
| **Language** | `TypeScript` |
| **Icons** | `Lucide React` |
| **Styling** | `Vanilla CSS (Modern Layouts)` |

---

## 📁 プロジェクト構造

```text
blog/
├── app/                  # Next.js App Router 핵심 로직
│   ├── login/            # 인증 관련 페이지
│   ├── posts/            # 포스트 상세 조회
│   └── write/            # 포스트 작성 창 (마크다운 에디터)
├── components/           # 재사용 가능한 UI 컴포넌트
│   ├── BlogCard.tsx      # 포스트 미리보기 카드
│   ├── Navbar.tsx        # 상단 네비게이션바
│   └── Footer.tsx        # 하단 정보 푸터
├── supabase/             # 인프라 설정 (마이그레이션 & 시드)
│   ├── migrations/       # DB 스키마 롤업
│   └── seed.sql          # 초기 데이터 설정
├── utils/                # 유틸리티 (Supabase 클라이언트 등)
└── public/               # 이미지 및 정적 리소스
```

---

## 🚀クイックスタートガイド

### 1. 環境設定

ルートディレクトリに`.env.local`ファイルを作成し、次の情報を入力します。

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### 2. パッケージのインストールと実行

```bash
# 의존성 설치
npm install

# 로컬 개발 서버 구동
npm run dev
```

ブラウザで`http://localhost:3000`にアクセスしてブログを確認してください。

---

## 🏗️ データベースの初期化

Supabase SQL Editorで、次のファイルの内容を順次実行してテーブルとポリシーを設定します。

1. `supabase/migrations/20240401000000_create_blog_tables.sql`
2. `supabase/migrations/20240401000001_setup_rls_policies.sql`
3. `supabase/migrations/20240401000002_add_author_and_status.sql`
4. `supabase/seed.sql`（サンプルデータ用）

---

## 📄ライセンス

このプロジェクトはMITライセンスに従います。

---

**Crafted with ❤️ by hjy0221**

## English

> **Powerful and beautiful personal blogging platform built with Next.js & Supabase**

This is a blog service optimized for recording thoughts and sharing valuable information. By combining the powerful features of **Next.js 15+ (App Router)** and **Supabase**, it provides a fast and stable user experience.

---

## ✨ Core features

- 📝 **Powerful Markdown Editor** — Dedicated editor with real-time preview and rich text styling
- 🔐 **Security Authentication (Supabase Auth)** — Secure email login and membership registration system
- 🗂️ **Intelligent category management** — Flexible category-based post classification and navigation
- 🔍 **Real-time search filtering** — Real-time search and filtering functions encompassing title and content
- 🎨 **Premium Design & Dark Mode** — Elegant layout and automatic sync to eye-friendly dark mode
- ⚡ **High-performance server-side logic** — Efficient data processing using Server Actions

---

## 🛠️ Technology Stack

| area | Technology |
|---|---|
| **Frontend** | `Next.js 15+`, `React 19`, `Tailwind CSS v4` |
| **Backend** | `Supabase` (Auth, Database, Storage) |
| **Language** | `TypeScript` |
| **Icons** | `Lucide React` |
| **Styling** | `Vanilla CSS (Modern Layouts)` |

---

## 📁 Project Structure

```text
blog/
├── app/                  # Next.js App Router 핵심 로직
│   ├── login/            # 인증 관련 페이지
│   ├── posts/            # 포스트 상세 조회
│   └── write/            # 포스트 작성 창 (마크다운 에디터)
├── components/           # 재사용 가능한 UI 컴포넌트
│   ├── BlogCard.tsx      # 포스트 미리보기 카드
│   ├── Navbar.tsx        # 상단 네비게이션바
│   └── Footer.tsx        # 하단 정보 푸터
├── supabase/             # 인프라 설정 (마이그레이션 & 시드)
│   ├── migrations/       # DB 스키마 롤업
│   └── seed.sql          # 초기 데이터 설정
├── utils/                # 유틸리티 (Supabase 클라이언트 등)
└── public/               # 이미지 및 정적 리소스
```

---

## 🚀 Quick Start Guide

### 1. Environment settings

Create a `.env.local` file in the root directory and enter the following information:

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### 2. Install and run the package

```bash
# 의존성 설치
npm install

# 로컬 개발 서버 구동
npm run dev
```

Visit `http://localhost:3000` in your browser to check out the blog.

---

## 🏗️ Database initialization

Set tables and policies by sequentially executing the contents of the following files in Supabase SQL Editor:

1.`supabase/migrations/20240401000000_create_blog_tables.sql`
2.`supabase/migrations/20240401000001_setup_rls_policies.sql`
3.`supabase/migrations/20240401000002_add_author_and_status.sql`
4. `supabase/seed.sql` (for sample data)

---

## 📄 License

This project follows the MIT License.

---

**Crafted with ❤️ by hjy0221**

## 한국어

> **Next.js & Supabase로 구축한 강력하고 아름다운 개인 블로그 플랫폼**

생각을 기록하고, 가치 있는 정보를 나누는 데 최적화된 블로그 서비스입니다. **Next.js 15+ (App Router)**와 **Supabase**의 강력한 기능을 결합하여, 빠르고 안정적인 사용자 경험을 제공합니다.

---

## ✨ 핵심 기능

- 📝 **강력한 마크다운 에디터** — 실시간 미리보기와 풍부한 텍스트 스타일링을 지원하는 전용 에디터
- 🔐 **보안 인증 (Supabase Auth)** — 안전한 이메일 로그인과 회원가입 시스템
- 🗂️ **지능형 카테고리 관리** — 유연한 카테고리 기반의 포스트 분류 및 탐색
- 🔍 **실시간 검색 필터링** — 제목과 내용을 아우르는 실시간 검색 및 필터링 기능
- 🎨 **프리미엄 디자인 & 다크 모드** — 우아한 레이아웃과 눈이 편안한 다크 모드 자동 동기화
- ⚡ **고성능 서버 사이드 로직** — Server Actions를 이용한 효율적인 데이터 처리

---

## 🛠️ 기술 스택

| 영역 | 기술 |
|---|---|
| **Frontend** | `Next.js 15+`, `React 19`, `Tailwind CSS v4` |
| **Backend** | `Supabase` (Auth, Database, Storage) |
| **Language** | `TypeScript` |
| **Icons** | `Lucide React` |
| **Styling** | `Vanilla CSS (Modern Layouts)` |

---

## 📁 프로젝트 구조

```text
blog/
├── app/                  # Next.js App Router 핵심 로직
│   ├── login/            # 인증 관련 페이지
│   ├── posts/            # 포스트 상세 조회
│   └── write/            # 포스트 작성 창 (마크다운 에디터)
├── components/           # 재사용 가능한 UI 컴포넌트
│   ├── BlogCard.tsx      # 포스트 미리보기 카드
│   ├── Navbar.tsx        # 상단 네비게이션바
│   └── Footer.tsx        # 하단 정보 푸터
├── supabase/             # 인프라 설정 (마이그레이션 & 시드)
│   ├── migrations/       # DB 스키마 롤업
│   └── seed.sql          # 초기 데이터 설정
├── utils/                # 유틸리티 (Supabase 클라이언트 등)
└── public/               # 이미지 및 정적 리소스
```

---

## 🚀 빠른 시작 가이드

### 1. 환경 설정

루트 디렉토리에 `.env.local` 파일을 생성하고 다음 정보를 입력합니다:

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### 2. 패키지 설치 및 실행

```bash
# 의존성 설치
npm install

# 로컬 개발 서버 구동
npm run dev
```

브라우저에서 `http://localhost:3000`에 접속하여 블로그를 확인하세요.

---

## 🏗️ 데이터베이스 초기화

Supabase SQL Editor에서 다음 파일들의 내용을 순차적으로 실행하여 테이블과 정책을 설정합니다:

1. `supabase/migrations/20240401000000_create_blog_tables.sql`
2. `supabase/migrations/20240401000001_setup_rls_policies.sql`
3. `supabase/migrations/20240401000002_add_author_and_status.sql`
4. `supabase/seed.sql` (샘플 데이터용)

---

## 📄 라이선스

이 프로젝트는 MIT License를 따릅니다.

---

**Crafted with ❤️ by hjy0221**
