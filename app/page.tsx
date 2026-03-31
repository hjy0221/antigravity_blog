'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { Search, Loader2 } from 'lucide-react';

export default function Home() {
  const supabase = createClient();
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 데이터 가져오기
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // 카테고리 불러오기
        const { data: catData } = await supabase.from('categories').select('*').order('name');
        setCategories(catData || []);

        // 글 목록 불러오기 (카테고리 정보 포함)
        let query = supabase
          .from('posts')
          .select('*, categories(name)')
          .order('created_at', { ascending: false });

        if (selectedCategory) {
          query = query.eq('category_id', selectedCategory);
        }

        const { data: postData } = await query;
        setPosts(postData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [selectedCategory, supabase]);

  // 검색 필터링
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black font-sans">
      <Navbar />

      <main className="flex-1">
        {/* 히어로 영역 */}
        <section className="relative overflow-hidden bg-zinc-900 py-24 text-white dark:bg-zinc-950">
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-600 blur-[120px]" />
            <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-indigo-600 blur-[120px]" />
          </div>
          
          <div className="container relative z-10 mx-auto max-w-7xl px-4 text-center">
            <span className="mb-4 inline-block rounded-full bg-blue-600/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400">
              Welcome to Cheers Blog
            </span>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
              생각을 <span className="text-blue-500">기록</span>하고,<br />
              정보를 <span className="text-blue-500">나눕니다</span>.
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-zinc-400">
              개발, 디자인, 일상 등 다양한 이야기를 한눈에 만나보세요. 
              최신 트렌드와 깊이 있는 통찰을 여러분과 함께합니다.
            </p>
          </div>
        </section>

        {/* 필터 및 검색 바 */}
        <section className="border-b border-zinc-200 bg-zinc-50/50 py-8 dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
              {/* 카테고리 탭 */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    selectedCategory === null
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-white text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
                  }`}
                >
                  전체
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-white text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* 검색창 */}
              <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input
                  type="text"
                  placeholder="제목 또는 내용 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-zinc-200 bg-white py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-blue-400"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 블로그 포스트 리스트 */}
        <section className="container mx-auto max-w-7xl px-4 py-16">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 text-zinc-500">
              <Loader2 className="mb-4 animate-spin text-blue-600" size={48} />
              <p className="text-lg font-medium">데이터를 불러오는 중입니다...</p>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-xl font-medium text-zinc-500">해당하는 조건의 블로그 글이 없습니다.</p>
            </div>
          )}
          
          {/* 하단 더보기(페이지네이션-데모) */}
          {!isLoading && filteredPosts.length > 0 && (
            <div className="mt-16 flex justify-center">
              <button className="rounded-full border border-zinc-200 bg-white px-8 py-3 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-50 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800">
                블로그 글 더 보기
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
