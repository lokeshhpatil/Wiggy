export interface AuthenticatedUser {
  _id: string;
  role: "user" | "restaurant" | "rider";
  restaurantID? : string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}
