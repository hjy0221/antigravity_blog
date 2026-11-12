# 🚀 Cheers Blog

[日本語](README.ja.md) · [English](README.md) · [한국어](README.ko.md)

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
