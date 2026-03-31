'use client';

import './write.css';
import { useState, useEffect, useRef, useTransition } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { saveDraft, publishPost } from './actions';
import { 
  Save, 
  Send, 
  Loader2, 
  Eye, 
  EyeOff, 
  User,
  Hash,
  Bold,
  Italic,
  Code,
  Link as LinkIcon,
  List,
  Quote,
  Heading1,
  Heading2,
} from 'lucide-react';

type User = {
  id: string;
  email?: string;
};

// 마크다운 미리보기 렌더러 (간단 버전)
function renderMarkdown(text: string): string {
  return text
    .replace(/^### (.+)$/gm, '<h3 class="md-h3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="md-h2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="md-h1">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="md-inline-code">$1</code>')
    .replace(/```([\s\S]*?)```/g, '<pre class="md-code-block"><code>$1</code></pre>')
    .replace(/^> (.+)$/gm, '<blockquote class="md-blockquote">$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li class="md-li">$1</li>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a class="md-link" href="$2" target="_blank">$1</a>')
    .replace(/\n\n/g, '</p><p class="md-p">')
    .replace(/^(?!<[hHbBpPlLcC])(.+)$/gm, '<p class="md-p">$1</p>');
}

export default function WriteEditor() {
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postId, setPostId] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [lineCount, setLineCount] = useState(20);
  const [isSaving, startSaving] = useTransition();
  const [isPublishing, startPublishing] = useTransition();
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumberRef = useRef<HTMLDivElement>(null);

  const supabase = createClient();

  // 사용자 인증 상태 확인 (로그인 안 해도 에디터 사용 가능)
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user ?? null);
    });
  }, []);

  // 라인 번호 동기화
  useEffect(() => {
    const lines = content.split('\n').length;
    setLineCount(Math.max(lines, 20));
  }, [content]);

  // 텍스트영역 스크롤과 라인번호 스크롤 동기화
  const handleScroll = () => {
    if (textareaRef.current && lineNumberRef.current) {
      lineNumberRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // 토스트 메시지 자동 소멸
  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  // 마크다운 단축키 삽입
  const insertMarkdown = (prefix: string, suffix: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText = content.substring(0, start) + prefix + selectedText + suffix + content.substring(end);
    setContent(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 0);
  };

  // Tab 키 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textareaRef.current!.selectionStart;
      const end = textareaRef.current!.selectionEnd;
      const newContent = content.substring(0, start) + '  ' + content.substring(end);
      setContent(newContent);
      setTimeout(() => {
        textareaRef.current!.setSelectionRange(start + 2, start + 2);
      }, 0);
    }
  };

  // Save Draft 핸들러
  const handleSaveDraft = () => {
    startSaving(async () => {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (postId) formData.append('postId', postId);

      const result = await saveDraft(null, formData);
      if (result.error) {
        showToast('error', result.error);
      } else {
        if (result.postId) setPostId(result.postId);
        showToast('success', result.message || '임시저장 완료!');
      }
    });
  };

  // Publish 핸들러
  const handlePublish = () => {
    startPublishing(async () => {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (postId) formData.append('postId', postId);

      const result = await publishPost(null, formData);
      if (result.error) {
        showToast('error', result.error);
      }
      // 성공 시 redirect가 server action에서 처리됨
    });
  };

  const userHandle = user?.email?.split('@')[0] || '익명';

  return (
    <div className="write-page">
      {/* 네비게이션 바 */}
      <nav className="write-nav">
        <div className="write-nav-inner">
          <Link href="/" className="write-logo">
            Dev<span className="write-logo-accent">Log</span>
          </Link>

          <div className="write-nav-links">
            <Link href="/" className="write-nav-link">Home</Link>
            <Link href="/write" className="write-nav-link write-nav-link--active">Writing</Link>
            <Link href="/" className="write-nav-link">Community</Link>
          </div>

          <div className="write-nav-actions">
            <button onClick={handleSaveDraft} disabled={isSaving} className="write-btn-secondary">
              {isSaving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              Save Draft
            </button>
            <button onClick={handlePublish} disabled={isPublishing} className="write-btn-primary">
              {isPublishing ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
              Publish
            </button>
          </div>
        </div>
      </nav>

      {/* 제목 영역 */}
      <div className="write-header">
        <div className="write-header-inner">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled Masterpiece..."
            className="write-title-input"
            maxLength={100}
          />
          <div className="write-meta-row">
            <div className="write-editing-as">
              <span className="write-editing-label">EDITING AS</span>
              <span className="write-editing-user">
                <User size={13} />
                @{userHandle}
              </span>
            </div>
            <div className="write-toolbar">
              <button onClick={() => insertMarkdown('# ')} className="write-tool-btn" title="제목 1">
                <Heading1 size={16} />
              </button>
              <button onClick={() => insertMarkdown('## ')} className="write-tool-btn" title="제목 2">
                <Heading2 size={16} />
              </button>
              <button onClick={() => insertMarkdown('**', '**')} className="write-tool-btn" title="굵게">
                <Bold size={16} />
              </button>
              <button onClick={() => insertMarkdown('*', '*')} className="write-tool-btn" title="기울임">
                <Italic size={16} />
              </button>
              <button onClick={() => insertMarkdown('`', '`')} className="write-tool-btn" title="인라인 코드">
                <Code size={16} />
              </button>
              <button onClick={() => insertMarkdown('```\n', '\n```')} className="write-tool-btn" title="코드 블록">
                <Hash size={16} />
              </button>
              <button onClick={() => insertMarkdown('[링크텍스트](', ')')} className="write-tool-btn" title="링크">
                <LinkIcon size={16} />
              </button>
              <button onClick={() => insertMarkdown('- ')} className="write-tool-btn" title="목록">
                <List size={16} />
              </button>
              <button onClick={() => insertMarkdown('> ')} className="write-tool-btn" title="인용">
                <Quote size={16} />
              </button>
              <div className="write-tool-divider" />
              <button
                onClick={() => setIsPreview(!isPreview)}
                className={`write-tool-btn write-preview-btn ${isPreview ? 'write-preview-btn--active' : ''}`}
                title={isPreview ? '에디터 보기' : '미리보기'}
              >
                {isPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                {isPreview ? '편집' : '미리보기'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 에디터 본문 */}
      <div className="write-body">
        {isPreview ? (
          <div className="write-preview">
            <div
              className="write-preview-content"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(content || '*내용을 입력하면 여기에 미리보기가 표시됩니다.*'),
              }}
            />
          </div>
        ) : (
          <div className="write-editor-wrapper">
            {/* 라인 번호 */}
            <div ref={lineNumberRef} className="write-line-numbers" aria-hidden="true">
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i + 1} className="write-line-number">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* 텍스트 에디터 */}
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onScroll={handleScroll}
              onKeyDown={handleKeyDown}
              placeholder={`# The Architecture of Silence\n\nIn the modern web, we often find ourselves overwhelmed by noise. Every button competes for attention, and every shadow demands to be seen.`}
              className="write-textarea"
              spellCheck={false}
            />
          </div>
        )}
      </div>

      {/* 토스트 알림 */}
      {toast && (
        <div className={`write-toast write-toast--${toast.type}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
