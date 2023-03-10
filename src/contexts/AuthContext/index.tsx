import { createContext, ReactNode, useState, useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '770859653370-ls07432mca6moh690h7d6tc0qlp5bt18.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({useProxy: true}),
    scopes: ['profile', 'email'],
  })




  async function signIn() {
    try {
      setIsUserLoading(true);

      await promptAsync();
    } catch (error) {
      console.log(error)

      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signInWithGoogle(access_token: string) {
    console.log("token ===>", access_token);
  }

  useEffect(() => {
    if(response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  return (
    <AuthContext.Provider
      value={{
        user,
        isUserLoading,
        signIn,
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}

