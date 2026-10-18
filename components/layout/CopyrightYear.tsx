'use client'

import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}
const getYear = () => new Date().getFullYear()

export function CopyrightYear() {
  const year = useSyncExternalStore<number | null>(subscribe, getYear, () => null)
  return <>{year}</>
}
