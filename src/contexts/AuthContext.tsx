import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthService } from "@/services/auth-service";
import { LoginProps } from "@/types/auth";
import { IAuth, IAuthContext } from "./types";

const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [auth, setAuth] = useState<IAuth | null>(null);

  async function login(props: LoginProps) {
    const data = await AuthService.login(props);

    if (data) {
      window.localStorage.setItem('accessToken', JSON.stringify(data.data.token));
      setAuth(data.data);
      return true;
    };
    return false;
  }

  async function logout(): Promise<void> {
    const accessToken = window.localStorage.getItem('accessToken');

    if (accessToken) {
      if (!auth) return;
      await AuthService.logout(auth.email, accessToken)

      router.push('/');
    }

    setAuth(() => null)
    window.localStorage.removeItem('accessToken');
  }

  useEffect(() => {
    setLoading(() => !!localStorage.getItem("accessToken"))
  }, [])

  const context = {
    auth,
    loading,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = (): IAuthContext => {
  return useContext(AuthContext);
}