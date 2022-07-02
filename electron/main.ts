import { app, BrowserWindow, dialog, ipcMain, protocol } from "electron";
import { normalize } from "path";
import Tutorial from "../src/modules/Tutorial";
import {
  deleteTutorial,
  findTutorialByName,
  getAllTutorials,
  getTutorial,
  saveTutorial,
} from "./tutorial_persistence";

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minHeight: 400,
    minWidth: 500,
    // titleBarStyle: 'hidden',
    // webPreferences: {
    //   preload: join(__dirname, './preload.js'),
    // },
  });
  // mainWindow.loadFile('./dist/index.html')
  mainWindow.loadURL("http://localhost:3000/");
};

app.whenReady().then(() => {
  //This needs to be used after app. Ready is triggered
  protocol.registerFileProtocol("atom", (request, callback) => {
    const url = request.url.substr(7);
    callback(decodeURI(normalize(url)));
  });

  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("getTutorials", () => {
  return getAllTutorials();
});

ipcMain.handle("getTutorial", (event, id) => {
  return getTutorial(id);
});

ipcMain.handle("addTutorial", async () => {
  const tutorials: Tutorial[] = [];

  return dialog
    .showOpenDialog({
      properties: ["openDirectory", "multiSelections"],
      title: "add Tutorials",
    })
    .then(async (selections) => {
      if (!selections.canceled && selections.filePaths[0] !== "") {
        for (let i = 0; i < selections.filePaths.length; i++) {
          const tut = await saveTutorial(selections.filePaths[i]);
          if (tut) tutorials.push(tut);
        }
        console.log(tutorials);
        return tutorials;
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

ipcMain.handle("findTutorialsByName", (event, searchName) => {
  return findTutorialByName(searchName);
});

ipcMain.handle("remouveTutorial", (event, tutorialId) => {
  return deleteTutorial(tutorialId);
});
