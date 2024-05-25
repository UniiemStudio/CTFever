import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld('desktop', {
  electronReady: true,
  appReady() {
    ipcRenderer.send('app-ready')
  },
  onPushRoute(callback: (route: string) => void) {
    ipcRenderer.on('push-route', (_, route: string) => callback(route))
  },
  onAwaken(callback: (url: string) => void) {
    ipcRenderer.on('awaken', (_, argv) => callback(argv))
  },
  getSettingsList() {
    return ipcRenderer.invoke('settings-list')
  },
  submitSettings(settings: Setting<boolean>[]) {
    ipcRenderer.send('settings-submit', settings)
  },
  onSettingsUpdate(callback: (settings: Setting<boolean>[]) => void) {
    ipcRenderer.on('settings-update', (_, settings) => callback(settings))
  }
})
