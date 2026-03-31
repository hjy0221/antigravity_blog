import { Metadata } from 'next';
import WriteEditor from './WriteEditor';

export const metadata: Metadata = {
  title: 'Write | DevLog',
  description: '새 블로그 글을 작성하세요.',
};

export default function WritePage() {
  return <WriteEditor />;
}
