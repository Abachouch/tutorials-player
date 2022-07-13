import { app, BrowserWindow, dialog, ipcMain, protocol } from "electron";
import { access } from "fs/promises";
import { join, normalize } from "path";
import Tutorial from "../common/modules/Tutorial";
import { constants } from "fs";
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
    titleBarStyle: "hidden",
    webPreferences: {
      preload: join(__dirname, "./preload.js"),
      devTools: true,
    },
  });
  // mainWindow.loadFile('./dist/index.html')
  mainWindow.maximize();
  mainWindow.webContents.openDevTools();
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
  console.log("tutorials");
  return getAllTutorials();
});

ipcMain.handle("getTutorial", (event, _id) => {
  return getTutorial(_id);
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

ipcMain.handle("getThumbnail", async (event, tutorialPath) => {
  let thumbnail: string | null = null;
  const thumbs = [
    "thumbnail.png",
    "thumbnail.jpeg",
    "thumbnail.webp",
    "thumbnail.svg",
  ];

  //
  for (let i = 0; i < thumbs.length; i++) {
    try {
      await access(join(tutorialPath, thumbs[i]), constants.F_OK);
      thumbnail = join(tutorialPath, thumbs[i]);
    } catch {}
  }
  return thumbnail;
});
