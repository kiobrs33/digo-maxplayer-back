import { Request } from 'express';

export interface ISessionRequest extends Request {
  user?: {
    user_id: number;
    first_name: string;
    last_name: string;
    role: { name: string };
  };
}

export interface IJwtPayload {
  user_id: number;
  first_name: string;
  last_name: string;
}
