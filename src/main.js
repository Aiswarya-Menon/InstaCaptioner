const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow} = electron;

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform ==='darwin';

function createMainWindow(){
    const mainWindow = new BrowserWindow({
        title: 'Instagram Captioner',
        width: isDev ? 1000 : 500,
        height: 600,
    });

    //open dev tools if in dev env
    if (isDev){
        mainWindow.webContents.openDevTools();
    }
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
}
app.whenReady().then(() => {
    createMainWindow();

    app.on('activate',() => {
        if (BrowserWindow.getAllWindows().length === 0){
            createMainWindow();
        }
    })
})

app.on('window-all-closed', () => {
    if (!isMac){
        app.quit()
    }
})



