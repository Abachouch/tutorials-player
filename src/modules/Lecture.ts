export default class Lecture {
  title: string;
  fullpath: string;
  isDone = false;
  trackPositio = 0;

  constructor(fullpath: string, title: string) {
    this.fullpath = fullpath;
    this.title = title;
  }

  toString() {
    return this.title;
  }
}
