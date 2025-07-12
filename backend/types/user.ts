export interface CreateUser {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  birthdate: Date;
  role: string;
}
export interface getUser {
  id: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  birthdate: Date;
  role: string;
  create_at: Date;
}
export interface loginUser {
  username: string;
  password: string;
}
