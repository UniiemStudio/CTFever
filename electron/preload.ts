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
})

contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  once(...args: Parameters<typeof ipcRenderer.once>) {
    const [channel, listener] = args
    return ipcRenderer.once(channel, (event, ...args) => listener(event, ...args))
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },
})

