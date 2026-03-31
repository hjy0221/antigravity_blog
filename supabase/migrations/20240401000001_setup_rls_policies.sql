-- ================================================
-- 조회(SELECT) 관련 RLS 정책 (세분화 버전)
-- ================================================

-- 기존의 단순 정책이 있다면 먼저 삭제 후 재생성합니다.
DROP POLICY IF EXISTS "Allow public read-only access for categories" ON public.categories;
DROP POLICY IF EXISTS "Allow public read-only access for posts" ON public.posts;


-- ────────────────────────────────────────────────
-- [categories 테이블] 조회 RLS 정책
-- ────────────────────────────────────────────────

-- 1. 비로그인(anon) 사용자도 카테고리 목록 전체 조회 가능
CREATE POLICY "categories: anon can read all"
    ON public.categories
    FOR SELECT
    TO anon
    USING (true);

-- 2. 로그인(authenticated) 사용자도 카테고리 목록 전체 조회 가능
CREATE POLICY "categories: authenticated can read all"
    ON public.categories
    FOR SELECT
    TO authenticated
    USING (true);


-- ────────────────────────────────────────────────
-- [posts 테이블] 조회 RLS 정책
-- ────────────────────────────────────────────────

-- 1. 비로그인(anon) 사용자도 모든 게시글 조회 가능
--    (블로그 글은 공개 콘텐츠이므로 누구나 읽을 수 있음)
CREATE POLICY "posts: anon can read all"
    ON public.posts
    FOR SELECT
    TO anon
    USING (true);

-- 2. 로그인(authenticated) 사용자는 모든 게시글 조회 가능
CREATE POLICY "posts: authenticated can read all"
    ON public.posts
    FOR SELECT
    TO authenticated
    USING (true);

-- ※ 참고: 만약 나중에 본인이 작성한 글만 수정/삭제 가능한 정책을 추가하려면
--   아래와 같이 auth.uid() 를 활용한 정책을 INSERT/UPDATE/DELETE 에 추가하면 됩니다.
--
-- 예시 (쓰기 정책 - 현재는 비활성):
-- CREATE POLICY "posts: author can insert"
--     ON public.posts FOR INSERT TO authenticated
--     WITH CHECK (auth.uid() = author_id);
--
-- CREATE POLICY "posts: author can update own"
--     ON public.posts FOR UPDATE TO authenticated
--     USING (auth.uid() = author_id);
--
-- CREATE POLICY "posts: author can delete own"
--     ON public.posts FOR DELETE TO authenticated
--     USING (auth.uid() = author_id);
