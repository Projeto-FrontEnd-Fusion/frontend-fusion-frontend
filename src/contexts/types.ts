import { LoginProps } from "@/types/auth/login";

export interface IAuth {
  userId: string;
  username: string;
  email: string;
  fullName: string;
  token: string;
}

export interface IAuthContext {
  auth: IAuth | null;
  loading: boolean;
  login: (props: LoginProps) => Promise<boolean>;
  logout: () => Promise<void>;
}
