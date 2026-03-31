'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export type ActionState = {
  message?: string
  error?: string
  isSuccess?: boolean
}

export async function login(prevState: ActionState | null, formData: FormData): Promise<ActionState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: '이메일과 비밀번호를 모두 입력해주세요.' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: '이메일 또는 비밀번호가 올바르지 않습니다.' }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(prevState: ActionState | null, formData: FormData): Promise<ActionState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: '이메일과 비밀번호를 모두 입력해주세요.' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { error: '가입 중 오류가 발생했습니다: ' + error.message }
  }

  // 성공 시 메시지를 반환하여 UI에 표시 (가입 이메일 확인 플로우)
  return { message: '가입 확인 이메일이 발송되었습니다. 이메일을 확인해주세요.', isSuccess: true }
}
