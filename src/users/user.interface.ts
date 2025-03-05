export interface IUser {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  user_status?: boolean;
  role_id: number;
}

export interface IUserQueries {
  page?: string;
  take?: string;
}

export interface IUserParams {
  id?: string;
}
