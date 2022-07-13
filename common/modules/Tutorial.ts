import Lecture from "./Lecture";
import Section from "./Section";

export default class Tutorial {
  _id: string;
  title: string;
  fullPath: string;
  lastSeen: Date;
  thumbnail: string | undefined;
  lectures: Lecture[];
  sections: Section[];

  constructor(title: string, fullpath: string, _id: string) {
    this._id = _id;
    this.title = title;
    this.fullPath = fullpath;
    this.lastSeen = new Date();
    this.sections = [];
    this.lectures = [];
  }

  setAsSeenNow() {
    this.lastSeen = new Date();
  }

  setThumbnail(thumbnailPath: string) {
    this.thumbnail = thumbnailPath;
  }
}
