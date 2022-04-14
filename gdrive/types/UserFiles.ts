export interface UserFiles {
  id: string;
  files: Files[];
}

export interface Files {
  id: number;
  url: string;
  name: string;
  mimetype: string;
  createAt: Date;
}
