declare namespace NodeJS {
  interface ProcessEnv {
    SECRET_KEY: string;
    DATABASE_URL: string;
    DIRECT_URL: string;
  }
}
