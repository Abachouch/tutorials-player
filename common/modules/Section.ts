import Lecture from "./Lecture";

export default class Section {
  title: string;
  fullPath: string;
  lectures: Lecture[];

  constructor(fullPath: string, title: string) {
    this.fullPath = fullPath;
    this.lectures = [];
    this.title = title;
  }

  appendLecture(lecture: Lecture) {
    if (this.lectures.findIndex((f) => f.title === lecture.title) === -1)
      this.lectures.push(lecture);
  }

  toString() {
    return this.title;
  }
}
