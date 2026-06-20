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
