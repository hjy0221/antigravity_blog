export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50 py-12 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} Cheers Blog. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <a href="#" className="hover:text-blue-600 transition-colors">이용약관</a>
            <a href="#" className="hover:text-blue-600 transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-blue-600 transition-colors">문의하기</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
