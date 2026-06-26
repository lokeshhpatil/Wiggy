export interface AuthenticatedUser {
  _id: string;
  role: "user" | "restaurant" | "rider";
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}
