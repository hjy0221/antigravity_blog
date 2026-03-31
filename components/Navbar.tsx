'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { LogIn, LogOut, PenLine } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsLoggedIn(!!user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">
            Cheers<span className="text-blue-600">.</span>Blog
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/write"
            className="flex items-center gap-1.5 rounded-full bg-blue-600/10 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-600/20 dark:text-blue-400"
          >
            <PenLine size={15} />
            글쓰기
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <LogOut size={16} />
              로그아웃
            </button>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <LogIn size={16} />
              로그인
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
