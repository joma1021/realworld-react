export interface UserData {
  username: string;
  email: string;
  bio: string;
  image: string;
  token: string;
}

export interface UpdateUser {
  username: string;
  email: string;
  bio?: string;
  image: string;
  password?: string;
}

export interface UserContext {
  username: string;
  image: string | undefined;
  isLoggedIn: boolean;
  authToken: string;
}
