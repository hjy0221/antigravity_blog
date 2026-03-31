'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export type WriteActionState = {
  error?: string
  message?: string
  postId?: string
}

export async function saveDraft(
  prevState: WriteActionState | null,
  formData: FormData
): Promise<WriteActionState> {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const postId = formData.get('postId') as string | null

  if (!title?.trim()) {
    return { error: '제목을 입력해주세요.' }
  }

  const supabase = await createClient()

  // 로그인 여부 확인 (익명 허용)
  const { data: { user } } = await supabase.auth.getUser()
  const authorId = user?.id ?? null

  if (postId) {
    // 기존 draft 업데이트
    const query = supabase
      .from('posts')
      .update({ title, content, status: 'draft' })
      .eq('id', postId)

    // 로그인한 경우에만 author_id 조건 추가
    if (authorId) {
      query.eq('author_id', authorId)
    }

    const { error } = await query
    if (error) return { error: '저장 중 오류가 발생했습니다: ' + error.message }
    return { message: '임시저장 완료!', postId }
  } else {
    // 새 draft 생성
    const { data, error } = await supabase
      .from('posts')
      .insert({
        title,
        content,
        status: 'draft',
        author_id: authorId,
      })
      .select('id')
      .single()

    if (error) return { error: '저장 중 오류가 발생했습니다: ' + error.message }
    return { message: '임시저장 완료!', postId: data.id }
  }
}

export async function publishPost(
  prevState: WriteActionState | null,
  formData: FormData
): Promise<WriteActionState> {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const postId = formData.get('postId') as string | null

  if (!title?.trim()) {
    return { error: '제목을 입력해주세요.' }
  }
  if (!content?.trim()) {
    return { error: '내용을 입력해주세요.' }
  }

  const supabase = await createClient()

  // 로그인 여부 확인 (익명 허용)
  const { data: { user } } = await supabase.auth.getUser()
  const authorId = user?.id ?? null

  if (postId) {
    // 기존 글 업데이트 후 발행
    const query = supabase
      .from('posts')
      .update({ title, content, status: 'published' })
      .eq('id', postId)

    if (authorId) {
      query.eq('author_id', authorId)
    }

    const { error } = await query
    if (error) return { error: '발행 중 오류가 발생했습니다: ' + error.message }
  } else {
    // 새 글 생성 후 발행
    const { error } = await supabase
      .from('posts')
      .insert({
        title,
        content,
        status: 'published',
        author_id: authorId,
      })

    if (error) return { error: '발행 중 오류가 발생했습니다: ' + error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
