import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("api", {
  getTutorial: (id: string) => ipcRenderer.invoke("getTutorial", id),
  getTutorials: () => ipcRenderer.invoke("getTutorials"),
  addTutorial: () => ipcRenderer.invoke("addTutorial"),
  remouveTutorial: (id: string) => ipcRenderer.invoke("remouveTutorial", id),
  findTutorialsByName: (searchQuery: string) =>
    ipcRenderer.invoke("findTutorialsByName", searchQuery),
  getThumbnail: (path: string) => ipcRenderer.invoke("getThumbnail", path),
});
