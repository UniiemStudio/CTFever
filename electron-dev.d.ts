declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    APP_ROOT: string
    /** /dist/ or /public/ */
    VITE_PUBLIC: string
  }
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
  desktop?: {
    electronReady: boolean
    appReady(): void
    onPushRoute(callback: (route: string) => void): void
    onAwaken(callback: (url: string) => void): void
    getSettingsList(): Promise<Setting<boolean>[]>
    submitSettings(settings: Setting<boolean>[]): void
    onSettingsUpdate(callback: (settings: Setting<boolean>[]) => void): void
  }
}