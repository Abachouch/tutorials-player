import { join, basename } from "path";
import { app } from "electron";
import Datastore from "nedb-promises";

import dirTree from "directory-tree";

import Tutorial from "../src/modules/Tutorial";
import Lecture from "../src/modules/Lecture";
import Section from "../src/modules/Section";

const tutorialsFilePath = join(
  app.getPath("appData"),
  "tutorials_player",
  "data",
  "tutorials"
);

const tutorialsDatastore = Datastore.create(tutorialsFilePath);
tutorialsDatastore.ensureIndex({ fieldName: "name", unique: true });

export async function getAllTutorials() {
  return await tutorialsDatastore.find({});
}

export async function findTutorialByName(name: string) {
  const regx = new RegExp(name, "gi");
  return await tutorialsDatastore.find({ name: regx });
}

export async function getTutorial(id: string): Promise<Tutorial> {
  return tutorialsDatastore
    .findOne({ _id: id }, { fullpath: 1 })
    .then((data) => {
      return new Promise((res, rej) => {
        if (data && data.fullpath) {
          return sacanTutorialFolder(data.fullpath as string);
        } else {
          rej(new Error("can't find tutorial"));
        }
      });
    });
}

export async function updateTutorial(tutorial: Tutorial) {
  return await tutorialsDatastore.update({ _id: tutorial.id }, tutorial);
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
    getNameFromPath(folderPath),
    folderPath
  );

  try {
    const data = await tutorialsDatastore.insert(tutorial);
    return data;
  } catch (err) {
    console.log(err);
  }
}

function getNameFromPath(path: string): string {
  return basename(path);
}

function sacanTutorialFolder(tutorialpath: string): Promise<Tutorial> {
  return new Promise((resolve, reject) => {
    try {
      const tutorial = new Tutorial(
        getNameFromPath(tutorialpath),
        tutorialpath
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
