import { User } from "../generated/prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string | undefined;
      NODE_ENV: string | undefined;
      DATABASE_URL: string | undefined;
    }
  }
}


export {}