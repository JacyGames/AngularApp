export interface User {
  email: string
  password: string
  returnSecureToken?: boolean
}

export interface FbAuthResponse {
  idToken: string
  expiresIn: string
}

export interface Post {
  id?: string
  name: string
  content: string
  author: string
  date: Date
}

export interface Environment {
  production: boolean,
  apiKey: string,
  FBdataBase: string
}
export interface FbResponse {
  name: string
}
