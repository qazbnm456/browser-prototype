import { app, BrowserWindow, ipcMain } from 'electron' // eslint-disable-line

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    tabbingIdentifier: 'window',
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// https://electron.atom.io/docs/api/app/#event-ready
app.on('ready', createWindow);

// https://github.com/electron/electron/blob/master/docs/api/app.md#event-new-window-for-tab-macos
app.on('new-window-for-tab', createWindow);

// https://electron.atom.io/docs/api/app/#event-window-all-closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// https://electron.atom.io/docs/api/app/#event-activate-macos
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// https://electron.atom.io/docs/api/ipc-main/#ipcmainonchannel-listener
ipcMain.on('set-title', (event, title) => {
  if (mainWindow !== null) {
    mainWindow.setTitle(title);
  }
});
