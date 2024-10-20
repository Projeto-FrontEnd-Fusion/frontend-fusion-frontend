import { LoginProps } from "@/types/auth/login";
import { RegisterProps } from "@/types/auth/register";
import { IServerResponse } from "@/types/server-response";
import { api } from "@/utils";

export const AuthService = {
  login: async (payload: LoginProps): Promise<any> => {
    const { data } = await api.post<IServerResponse>("/auth", payload);

    return data.data;
  },
  register: async (payload: RegisterProps): Promise<any> => {
    const { data } = await api.post<IServerResponse>("/register", payload);

    return data;
  },
};
