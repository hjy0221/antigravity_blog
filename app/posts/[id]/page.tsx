'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  ArrowLeft,
  Calendar,
  Tag,
  Share2,
  Link2,
  Globe,
  AtSign,
  Loader2,
  User,
} from 'lucide-react';

export default function PostDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const supabase = createClient();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shareToastVisible, setShareToastVisible] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      setIsLoading(true);
      const { data } = await supabase
        .from('posts')
        .select('*, categories(name)')
        .eq('id', id)
        .single();
      setPost(data);
      setIsLoading(false);
    }
    if (id) fetchPost();
  }, [id, supabase]);

  const formattedDate = post
    ? new Date(post.created_at).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  // 링크 복사 공유
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareToastVisible(true);
    setTimeout(() => setShareToastVisible(false), 2000);
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(post?.title ?? '');
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black font-sans">
      <Navbar />

      <main className="flex-1">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-48 text-zinc-500">
            <Loader2 className="mb-4 animate-spin text-blue-600" size={48} />
            <p className="text-lg font-medium">글을 불러오는 중입니다...</p>
          </div>
        ) : !post ? (
          <div className="flex flex-col items-center justify-center py-48 text-zinc-500">
            <p className="mb-4 text-xl font-bold">글을 찾을 수 없습니다.</p>
            <Link href="/" className="text-blue-600 hover:underline">홈으로 돌아가기</Link>
          </div>
        ) : (
          <>
            {/* 상단 헤더 영역 (다크 배경) */}
            <section className="relative overflow-hidden bg-zinc-900 pb-0 pt-12 text-white dark:bg-zinc-950">
              {/* 배경 광 효과 */}
              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-600 blur-[120px]" />
                <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-indigo-700 blur-[120px]" />
              </div>

              <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* 뒤로가기 */}
                <Link
                  href="/"
                  className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                >
                  <ArrowLeft size={16} />
                  목록으로 돌아가기
                </Link>

                {/* 카테고리 뱃지 */}
                {post.categories && (
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600/20 px-3 py-1 text-xs font-semibold text-blue-400">
                      <Tag size={11} />
                      {post.categories.name}
                    </span>
                  </div>
                )}

                {/* 제목 */}
                <h1 className="mb-8 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                  {post.title}
                </h1>

                {/* 저자 정보 + 날짜 + 공유 버튼 행 */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pb-0 pt-6">
                  {/* 저자 정보 */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/30 text-blue-400">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Cheers Blog</p>
                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <Calendar size={11} />
                        {formattedDate}
                      </div>
                    </div>
                  </div>

                  {/* 공유 버튼 그룹 */}
                  <div className="flex items-center gap-2">
                    <span className="mr-1 flex items-center gap-1 text-xs text-zinc-500">
                      <Share2 size={13} /> 공유하기
                    </span>
                    <button
                      onClick={handleCopyLink}
                      title="링크 복사"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-all hover:border-white/30 hover:text-white"
                    >
                      <Link2 size={15} />
                    </button>
                    <button
                      onClick={handleTwitterShare}
                      title="X(트위터)로 공유"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-all hover:border-white/30 hover:text-white"
                    >
                      <AtSign size={15} />
                    </button>
                    <button
                      onClick={handleFacebookShare}
                      title="페이스북으로 공유"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-all hover:border-white/30 hover:text-white"
                    >
                      <Globe size={15} />
                    </button>
                  </div>
                </div>
              </div>

              {/* 썸네일 이미지 (헤더에서 내용 영역으로 이어지는 느낌) */}
              <div className="relative z-10 mx-auto mt-10 max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="relative aspect-[16/7] w-full overflow-hidden rounded-t-2xl shadow-2xl">
                  <Image
                    src={
                      post.image_url ||
                      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop'
                    }
                    alt={post.title}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </section>

            {/* 본문 영역 */}
            <section className="bg-zinc-50 dark:bg-zinc-900 min-h-[400px]">
              <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-b-2xl bg-white px-8 py-12 shadow-sm dark:bg-zinc-900 dark:shadow-none border-x border-b border-zinc-100 dark:border-zinc-800">
                  {/* 요약 (리드 문장) */}
                  {post.summary && (
                    <p className="mb-10 border-l-4 border-blue-500 pl-5 text-lg font-medium leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {post.summary}
                    </p>
                  )}

                  {/* 본문 내용 */}
                  <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-blue-600 prose-code:rounded prose-code:bg-zinc-100 prose-code:px-1 dark:prose-code:bg-zinc-800">
                    {post.content
                      ? post.content.split('\n').map((line: string, i: number) => (
                          <p key={i} className="mb-4 leading-8 text-zinc-700 dark:text-zinc-300">
                            {line}
                          </p>
                        ))
                      : (
                        <p className="leading-8 text-zinc-500 dark:text-zinc-400">
                          아직 작성된 본문 내용이 없습니다.
                        </p>
                      )}
                  </div>

                  {/* 하단 태그 + 공유 재확인 */}
                  <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-100 pt-8 dark:border-zinc-800">
                    {post.categories && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        <Tag size={13} />
                        {post.categories.name}
                      </span>
                    )}

                    <div className="flex items-center gap-2 ml-auto">
                      <span className="flex items-center gap-1 text-xs text-zinc-400">
                        <Share2 size={13} /> 공유하기
                      </span>
                      <button
                        onClick={handleCopyLink}
                        title="링크 복사"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-all hover:border-blue-400 hover:text-blue-600 dark:border-zinc-700 dark:hover:border-blue-500"
                      >
                        <Link2 size={15} />
                      </button>
                      <button
                        onClick={handleTwitterShare}
                        title="X(트위터)로 공유"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-all hover:border-blue-400 hover:text-blue-600 dark:border-zinc-700 dark:hover:border-blue-500"
                      >
                        <AtSign size={15} />
                      </button>
                      <button
                        onClick={handleFacebookShare}
                        title="페이스북으로 공유"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-all hover:border-blue-400 hover:text-blue-600 dark:border-zinc-700 dark:hover:border-blue-500"
                      >
                        <Globe size={15} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 다시 목록으로 */}
                <div className="py-12 text-center">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-50 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
                  >
                    <ArrowLeft size={16} />
                    목록으로 돌아가기
                  </Link>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* 링크 복사 토스트 알림 */}
      <div
        className={`fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white shadow-xl transition-all duration-300 dark:bg-zinc-50 dark:text-zinc-900 ${
          shareToastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        🔗 링크가 클립보드에 복사되었습니다!
      </div>

      <Footer />
    </div>
  );
}
