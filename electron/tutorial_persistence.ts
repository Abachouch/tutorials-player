import { join, basename } from "path";
import { app } from "electron";
import Datastore from "nedb-promises";

import dirTree from "directory-tree";

import Tutorial from "../common/modules/Tutorial";
import Lecture from "../common/modules/Lecture";
import Section from "../common/modules/Section";

const tutorialsFilePath = join(
  app.getPath("appData"),
  "tutorials_player",
  "data",
  "tutorials"
);

const tutorialsDatastore = Datastore.create(tutorialsFilePath);
tutorialsDatastore.ensureIndex({ fieldName: "title", unique: true });

export async function getAllTutorials() {
  return await tutorialsDatastore.find({});
}

export async function findTutorialByName(title: string) {
  const regx = new RegExp(title, "gi");
  return await tutorialsDatastore.find({ title: regx });
}

export function getTutorial(id: string): Promise<Tutorial> {
  return tutorialsDatastore
    .findOne({ _id: id }, { fullPath: 1 })
    .then((data) => {
      return sacanTutorialFolder(data.fullPath as string, data._id);
    });
}

export async function updateTutorial(tutorial: Tutorial) {
  return await tutorialsDatastore.update({ _id: tutorial._id }, tutorial);
}

export async function deleteTutorial(tutID: number) {
  return await tutorialsDatastore.remove(
    { _id: tutID },
    {
      multi: true,
    }
  );
}

export async function saveTutorial(
  folderPath: string
): Promise<void | ({ _id: string } & Tutorial)> {
  const tutorial: Tutorial = new Tutorial(
    getTitleFromPath(folderPath),
    folderPath,
    undefined
  );

  try {
    const data = await tutorialsDatastore.insert(tutorial);
    return data;
  } catch (err) {
    console.log(err);
  }
}

function getTitleFromPath(path: string): string {
  return basename(path);
}

function sacanTutorialFolder(
  tutorialpath: string,
  _id: string
): Promise<Tutorial> {
  return new Promise((resolve, reject) => {
    try {
      const tutorial = new Tutorial(
        getTitleFromPath(tutorialpath),
        tutorialpath,
        _id
      );
      const filteredTree = dirTree(tutorialpath, {
        extensions: /\.(ogg|mp4|webm)$/,
        attributes: ["type"],
      });
      if (filteredTree && filteredTree.children)
        filteredTree.children.forEach((element) => {
          if (element.type === "file") {
            tutorial.lectures.push(new Lecture(element.path, element.name));
          } else if (element.children && element.type === "directory") {
            const section = new Section(element.path, element.name);
            element.children.forEach((child) => {
              if (child.type === "file")
                section.lectures.push(new Lecture(child.path, child.name));
            });
            tutorial.sections.push(section);
          }
        });
      resolve(tutorial);
    } catch (error) {
      reject(error);
    }
  });
}
