-- Insert Initial Categories
INSERT INTO public.categories (id, name) VALUES
    ('11111111-1111-1111-1111-111111111111', '개발'),
    ('22222222-2222-2222-2222-222222222222', '일상'),
    ('33333333-3333-3333-3333-333333333333', '디자인')
ON CONFLICT (id) DO NOTHING;

-- Insert Initial Posts
INSERT INTO public.posts (id, title, summary, content, image_url, category_id, created_at) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '넥스트.js로 블로그 만들기', '현대적이고 빠른 블로그를 Next.js 14 버전을 사용해 만들어 봅니다.', '본문 내용입니다...', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop', '11111111-1111-1111-1111-111111111111', now() - interval '1 day'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Tailwind CSS 완벽 가이드', '복잡한 CSS 작성 없이도 유틸리티 클래스만으로 멋진 디자인을 구현하는 방법을 소개합니다.', '본문 내용입니다...', 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop', '11111111-1111-1111-1111-111111111111', now() - interval '2 days'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', '주말 카페 탐방기', '조용하고 분위기 좋은 동네 카페를 다녀왔습니다. 커피 맛도 일품이네요.', '본문 내용입니다...', 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop', '22222222-2222-2222-2222-222222222222', now() - interval '3 days'),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', '깔끔한 UI/UX 디자인의 비밀', '사용자를 사로잡는 마이크로 애니메이션과 직관적인 네비게이션 배치에 대해 알아봅니다.', '본문 내용입니다...', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop', '33333333-3333-3333-3333-333333333333', now() - interval '4 days'),
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '개발자 생산성 높이는 단축키들', '맥북 환경에서 알아두면 좋은 다양한 터미널 및 에디터 단축키를 정리했습니다.', '본문 내용입니다...', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop', '11111111-1111-1111-1111-111111111111', now() - interval '5 days'),
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', '한강 공원에서 자전거 타기', '주말 아침 상쾌한 공기를 마시며 한강공원 자전거길을 달린 후기입니다.', '본문 내용입니다...', 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=600&auto=format&fit=crop', '22222222-2222-2222-2222-222222222222', now() - interval '6 days')
ON CONFLICT (id) DO NOTHING;
