export interface UserFiles {
  id: string;
  files: File[];
}

export interface File {
  id: number;
  url: string;
  name: string;
  mimetype: string;
  createAt: Date;
}
