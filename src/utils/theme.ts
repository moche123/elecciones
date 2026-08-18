export type Theme = 'light' | 'dark'

const THEME_KEY = 'theme'

export function getInitialTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function saveTheme(theme: Theme) {
  localStorage.setItem(THEME_KEY, theme)
}
