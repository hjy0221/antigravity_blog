-- posts 테이블에 author_id, status 컬럼 추가
ALTER TABLE public.posts
    ADD COLUMN IF NOT EXISTS author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published'));

-- ────────────────────────────────────────────────
-- [posts 테이블] 쓰기 RLS 정책 추가
-- ────────────────────────────────────────────────

-- 로그인한 사용자: 자신의 글 INSERT 가능
CREATE POLICY "posts: authenticated can insert own"
    ON public.posts
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = author_id);

-- 로그인한 사용자: 자신의 글 UPDATE 가능
CREATE POLICY "posts: authenticated can update own"
    ON public.posts
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = author_id);

-- 로그인한 사용자: 자신의 글 DELETE 가능
CREATE POLICY "posts: authenticated can delete own"
    ON public.posts
    FOR DELETE
    TO authenticated
    USING (auth.uid() = author_id);
