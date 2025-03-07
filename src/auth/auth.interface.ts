export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  balance: number;
  role_id: number;
}
