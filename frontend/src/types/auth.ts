export type Role = "user" | "restaurant" | "rider" | "admin";

export interface GoogleAuthPayload {
  code: string
}

export interface AuthUser {
  _id: string
  name: string
  email: string
  role: string
}

export interface AuthResponse {
  token: string
  user: AuthUser
}

export interface ApiResponse<T> {
  statusCode: number
  data: T
  message: string
  success: boolean
}

export interface Location {
  latitude: number,
  longitude: number,
  formattedAddress: string,
}

export interface AppContextType {
  user: AuthUser | null,
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
  isAuth: boolean,
  loading: boolean, 
  setIsAuth: React.Dispatch<React.SetStateAction<boolean  | false>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean  | false>>,
  location: Location,
  loadingLocation: boolean,
  city: string
  // error: boolean,
  // setLocation: string,
  // setError: React.Dispatch<React.SetStateAction<boolean  | false>>
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
  role: Role;
  provider: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface UpdateRoleResponse {
  updatedRole: UserData;
  token: string;
}

export interface RestaurantType {
    name: string;
  description?: string;
  image: string;
  ownerID: string;
  phone: number;
  isVerified: boolean;

  autoLocation: {
    type: "Point",
    coordinates: [number, number], //longtitude latitude
    formattedAddress: string;
  };
  
  isOpen: boolean;
  createdAt: Date;
}
