import React, { useState, createContext, ReactNode, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../services/api";

type AuthContextData = {
  user: userProps;
  isAuthenticated: boolean;
  realizarLogin: (credenciais: SignInProps) => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
  deslogarUsuario: ()=> Promise<void>;
};

type userProps = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type SignInProps = {
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<userProps>({
    id: "",
    name: "",
    email: "",
    token: "",
  });

  const [loadingAuth, setLoadinAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user.name;

  useEffect(() => {
    async function pegarUsuario() {
      // pegar os dados salvo do user

      const userInfo = await AsyncStorage.getItem("@portalfood");
      let temUsuario: userProps = JSON.parse(userInfo || "{}");

      // verificar se recebemos as info do usuario

      if (Object.keys(temUsuario).length > 0) {
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer  ${temUsuario.token}`;
      
        setUser({
          id: temUsuario.id,
          name: temUsuario.name,
          email: temUsuario.email,
          token: temUsuario.token,
        });
      
        setLoading(false);
        console.log("Usuário encontrado, loading definido como false");
      } else {
        setLoading(false);
        console.log("Usuário não encontrado, loading definido como false");
      }
    }

    pegarUsuario();
  }, []);

  async function realizarLogin({ email, password }: SignInProps) {
    setLoadinAuth(true);

    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      const { id, name, token } = response.data;

      const data = {
        ...response.data,
      };

      await AsyncStorage.setItem("@portalfood", JSON.stringify(data));

      api.defaults.headers.common["Authorization"] = `Bearer  ${token}`;

      setUser({
        id,
        name,
        email,
        token,
      });

      setLoadinAuth(false);
    } catch (err) {
      console.log("Erro ao acessar", err);
      setLoadinAuth(false);
    }
  }

  async function deslogarUsuario() {
    await AsyncStorage.clear()
    .then(() => {
      setUser({
        id: "",
        name: "",
        email: "",
        token: "",
      })
    })
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, realizarLogin, loading, loadingAuth, deslogarUsuario }}
    >
      {children}
    </AuthContext.Provider>
  );
}
