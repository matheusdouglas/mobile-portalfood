import React, { useState, createContext, ReactNode } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../services/api";

type AuthContextData = {
  user: userProps;
  isAuthenticated: boolean;
  realizarLogin : (credenciais : SignInProps) => Promise<void>
};

type userProps = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type AuthProviderProps =  {
    children : ReactNode
}

type SignInProps = {
    email : string
    password : string
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children } : AuthProviderProps) {

  const [user, setUser] = useState<userProps>({
    id: "",
    name: "",
    email: "",
    token: "",
  });

  const [loadingAuth, setLoadinAuth] = useState(false)

  const isAuthenticated = !!user.name;

  async function realizarLogin({email, password} : SignInProps) {
      setLoadinAuth(true)

      try {
        const response = await api.post('/session', {
            email,
            password
        })

       const { id, name ,token } = response.data

       const data = {
        ...response.data 
       }

       await AsyncStorage.setItem('@portalfood', JSON.stringify(data))

       api.defaults.headers.common['Authorization'] = `Bearer  ${token}`

       setUser({
        id,
        name,
        email,
        token
       })

       setLoadinAuth(false);

      }catch(err){
        console.log('Erro ao acessar', err)
        setLoadinAuth(false);
      }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, realizarLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
