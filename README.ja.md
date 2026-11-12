# 🚀 Cheers Blog

[日本語](README.ja.md) · [English](README.md) · [한국어](README.ko.md)

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
