/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string
  readonly VITE_API_URL: string
  // добавьте другие переменные по мере необходимости
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}