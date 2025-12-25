export function safeGet(key: string): string | null {
  if (typeof window === "undefined") return null
  try {
    return localStorage.getItem(key)
  } catch {
    // localStorage can fail (private mode, quota, browser policies)
    return null
  }
}

export function safeSet(key: string, value: string): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(key, value)
  } catch {
    // localStorage can fail (private mode, quota, browser policies)
  }
}
