export const ServerUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : process.env.SERVER_URL;
