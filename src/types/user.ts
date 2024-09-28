export interface User {
  id: number,
  email: string,
  username: string,
  role: 'admin' | 'user',
  picture_url: string | null,
  created_at: string
}

export interface IFormUser {
  file: File | null | string,
  role: 'user' | 'admin',
  email: string,
  password: string,
  username: string
}