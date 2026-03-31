import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Tag } from 'lucide-react';

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    summary: string;
    image_url: string;
    created_at: string;
    categories: {
      name: string;
    } | null;
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/posts/${post.id}`} className="group block overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={post.image_url || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=600&auto=format&fit=crop'}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {post.categories && (
          <div className="absolute left-4 top-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-900 backdrop-blur-sm dark:bg-black/80 dark:text-zinc-50">
              <Tag size={12} className="text-blue-600" />
              {post.categories.name}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-2 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <Calendar size={12} />
          {formattedDate}
        </div>
        <h3 className="mb-2 text-xl font-bold text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {post.summary}
        </p>
      </div>
    </Link>
  );
}
