'use client'

import { useActionState, useState } from 'react'
import { login, signup, type ActionState } from './actions'
import Link from 'next/link'
import { Mail, Lock, Loader2, ArrowLeft } from 'lucide-react'

// Define the initial state matching what actions return
const initialState: ActionState = {
  message: '',
  error: '',
  isSuccess: false,
}

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  
  // Choose the action based on the toggle
  const actionToUse = isLogin ? login : signup
  const [state, formAction, isPending] = useActionState(actionToUse, initialState)

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
        <div className="p-8">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              <ArrowLeft size={16} />
              홈으로 돌아가기
            </Link>
          </div>

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {isLogin ? '환영합니다' : '계정 만들기'}
            </h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              {isLogin 
                ? '계정에 로그인하여 서비스를 이용해보세요.' 
                : '새로운 계정을 만들고 모든 역할을 경험해보세요.'}
            </p>
          </div>

          <form action={formAction} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-xl border-0 py-3 pl-10 pr-3 text-zinc-900 ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 dark:focus:ring-blue-500 transition-shadow outline-none"
                  placeholder="이메일 주소"
                />
              </div>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-xl border-0 py-3 pl-10 pr-3 text-zinc-900 ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700 dark:focus:ring-blue-500 transition-shadow outline-none"
                  placeholder="비밀번호"
                />
              </div>
            </div>

            {state?.error && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400">
                {state.error}
              </div>
            )}
            
            {state?.message && !state?.error && (
              <div className="rounded-lg bg-green-50 p-4 text-sm text-green-600 dark:bg-green-950/50 dark:text-green-400">
                {state.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="group relative flex w-full justify-center rounded-xl bg-blue-600 py-3 px-4 flex-row items-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLogin ? '로그인' : '가입하기'}
            </button>
          </form>
        </div>
        
        <div className="border-t border-zinc-100 bg-zinc-50/50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {isLogin ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              {isLogin ? '회원가입' : '로그인'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
