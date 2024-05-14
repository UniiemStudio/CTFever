import { app, BrowserWindow, shell } from 'electron'
import path from 'path'

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

if (process.platform === 'win32')
  app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let mainWindow: BrowserWindow | null = null

const distPath = path.join(__dirname, '..', '.output', 'public')

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    title: 'CTFever Desktop',
    minWidth: 1024,
    minHeight: 615,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  if (app.isPackaged) {
    mainWindow.loadFile(path.join(distPath, 'index.html'))
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
