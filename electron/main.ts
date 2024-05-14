import { app, BrowserWindow, shell } from 'electron'
import path from 'path'

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

process.env.APP_ROOT = path.join(__dirname, '..')

export const DIST_MAIN = path.join(process.env.APP_ROOT, 'dist_electron')
export const DIST_RENDERER = path.join(process.env.APP_ROOT, '.output', 'public')

process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : DIST_RENDERER

if (process.platform === 'win32')
  app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let mainWindow: BrowserWindow | null = null

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    title: 'CTFever Desktop',
    minWidth: 1038,
    minHeight: 615,
    width: 1038,
    height: 615,
    frame: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#00000000',
      symbolColor: 'rgba(128, 128, 128, .7)',
      height: 64
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  if (app.isPackaged) {
    mainWindow.loadFile(path.join(process.env.VITE_PUBLIC!, 'index.html'))
  } else {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL!)
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:') || url.startsWith('http:'))
      shell.openExternal(url)
    return { action: 'deny' }
  })

  app.on('window-all-closed', () => {
    mainWindow = null
    if (process.platform !== 'darwin') app.quit()
  })

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

app.whenReady().then(() => {
  createWindow()
})
