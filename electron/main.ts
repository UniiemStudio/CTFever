// noinspection JSIgnoredPromiseFromCall

import { app, BrowserWindow, shell, ipcMain, Tray, Menu, nativeImage, globalShortcut, protocol, dialog } from 'electron'
import path from 'path'
import { rawToolkits } from '~/config/meta'

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

const getQueryVariable = (url: string, name: string) => {
  let query = ''
  if (process.platform === 'darwin') {
    query = url.split('?')[1]
  } else {
    query = url[url.length - 1].split('?')[1]
  }
  if (!query) return false
  let vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=')
    if (pair[0] == name) {
      return pair[1]
    }
  }
  return false
}

let mainWindow: BrowserWindow | null = null

const bootstrap = async () => {
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
      height: 64,
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
    if (url.match(/^(?:http|https):\/\//)) shell.openExternal(url)
    return { action: 'deny' }
  })

  mainWindow.on('close', e => {
    e.preventDefault()
    mainWindow?.hide()
  })
}

const bootstrapOrFocus = () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    if (!mainWindow.isVisible()) mainWindow.show()
    mainWindow.focus()
  } else {
    bootstrap()
  }

}

const initTray = () => {
  const tray = new Tray(nativeImage.createFromPath(path.join(DIST_RENDERER, 'icon.png')))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open CTFever Desktop',
      click: bootstrapOrFocus,
    },
    { type: 'separator' },
    ...rawToolkits.map(toolkit => {
      return {
        label: `${ toolkit.key[0].toUpperCase() }${ toolkit.key.slice(1) }`.replace(/([A-Z])/g, ' $1').trim(),
        submenu: toolkit.tools.map(tool => {
          return {
            label: `${ tool.key[0].toUpperCase() }${ tool.key.slice(1) }`.replace(/([A-Z])/g, ' $1').trim(),
            click: () => {
              bootstrapOrFocus()
              mainWindow?.webContents.send('push-route', tool.route)
            },
          }
        }),
      }
    }),
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.quit()
        process.exit(0)
      },
    },
  ])
  tray.setToolTip('CTFever Desktop')
  tray.setContextMenu(contextMenu)
  tray.on('double-click', () => {
    bootstrapOrFocus()
  })
}

const initIpc = () => {

}

app.whenReady().then(() => {
  initTray()
  initIpc()
  bootstrap()

  // app.on('window-all-closed', () => {
  //   mainWindow = null
  //   if (process.platform !== 'darwin') app.quit()
  // })

  app.setLoginItemSettings({
    openAtLogin: true,
  })

  app.on('second-instance', (_, argv) => {
    bootstrapOrFocus()
    if (process.platform === 'win32') {
      mainWindow?.webContents.send('awaken', argv[argv.length - 1])
    }
  })

  app.setAsDefaultProtocolClient('ctfever')

  if (process.argv.length > 1) {
    ipcMain.once('app-ready', () => {
      app.emit('second-instance', null, process.argv)
    })
  }
})
