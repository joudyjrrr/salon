export interface SetLogInType {
  username: string;
  password: string;
}
export interface GetLogInType {
  userId: string;
  token: string;
  refreshToken: string;
}
export interface SetUserType {
  userId: string;
  username: string;
  password: string;
  roleId: string;
}
export interface GetUsersType {
  data: {
    id: string;
    username: string;
    role: string;
  }[];
}
export interface GetRoles {
  id: string;
  name: string;
}
[];
