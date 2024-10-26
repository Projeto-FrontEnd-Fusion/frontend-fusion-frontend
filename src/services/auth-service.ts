import { IAuth } from "@/contexts/types";
import { IServerResponse } from "@/types/server-response";
import { LoginProps, RegisterProps } from "@/types/auth";
import { api } from "@/utils";

export const AuthService = {
  login: async (payload: LoginProps): Promise<IServerResponse<IAuth>> => {
    const { data } = await api.post<IServerResponse<IAuth>>(
      "/auth/login",
      payload
    );

    return data;
  },
  logout: async (email: string, token: string) => {
    if (!email) {
      return { message: "Missing email" };
    }
    const { data } = await api.delete<IServerResponse>("/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data.data, data.statusCode);
    return data.data;
  },
  register: async (payload: RegisterProps): Promise<any> => {
    const { data } = await api.post<IServerResponse>("/register", payload);

    return data;
  },
};
