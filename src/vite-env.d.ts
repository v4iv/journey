/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GTAG: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
