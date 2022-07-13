declare var api: {
  getTutorials(): Promise<any>;
  getTutorial(id: string): Promise<any>;
  addTutorial: any;
  remouveTutorial(id: string): Promise<any>;
  findTutorialsByName: any;
  getThumbnail(path: string): Promise<any>;
};
