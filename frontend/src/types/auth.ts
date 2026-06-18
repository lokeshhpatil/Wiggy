export interface GoogleAuthPayload {
  code: string
}

export interface AuthResponse {
  token: string,
  user?: {
    id: string,
    email:string
  }
}