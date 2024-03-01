import { createContext, useEffect, useState } from "react";
import { useStorage, useStore } from ".";
import {
  STORAGE_KEYS,
  STORAGE_VALUES,
  STORE_KEYS,
  STORE_VALUES,
  UserInfo,
} from "@types";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { authApi, userApi } from "@api";

type AuthContextType = {
  auth: STORE_VALUES["auth"] | null;
  saveAuth: (
    auth: STORE_VALUES["auth"],
    beAuth: STORE_VALUES["be_auth"]
  ) => void;
  user: UserInfo | null;
  saveUser: (user: UserInfo) => void;
};

export const AuthContext = createContext<AuthContextType>({
  auth: null,
  saveAuth: () => {},
  user: null,
  saveUser: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const {
    getItem: getStoreItem,
    setItem: setStoreItem,
    clearEntireStore,
  } = useStore();
  const {
    getItem: getStorageItem,
    setItem: setStorageItem,
    clearItem: clearStorageItem,
  } = useStorage();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [auth, setAuth] = useState<STORE_VALUES["auth"] | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLogged, setIsLogged] = useState(false);

  const saveAuth = (
    auth: STORE_VALUES["auth"],
    beAuth: STORE_VALUES["be_auth"]
  ) => {
    setAuth(auth);
    setStoreItem(STORE_KEYS.AUTH, auth);
    setStoreItem(STORE_KEYS.BE_AUTH, beAuth);
    setIsLogged(true);
  };

  const saveUser = (user: UserInfo) => {
    setUser(user);
  };

  const fetchUserInfo = async () => {
    try {
      const res = await userApi.getUserInfo();

      if (res) {
        setUser(res);

        // checkTokenValidityInterval();
      }
    } catch (err) {
      console.error(err);
      clearEntireStore();
      navigate("/");
    }
  };

  const loginWithRefreshToken = async (
    refreshTokens: STORAGE_VALUES["refresh_token"]
  ) => {
    try {
      const response = await authApi.loginWithRefreshToken(refreshTokens);

      setStoreItem(STORE_KEYS.AUTH, response.BankIdResponse);
      setStoreItem(STORE_KEYS.BE_AUTH, response.BeAuthResponse);

      setAuth(response.BankIdResponse);

      axios.defaults.headers.common["X-Auth-Token"] =
        "Bearer " + response.BeAuthResponse.accessToken;
      axios.defaults.headers.common["access_token"] =
        response.BankIdResponse.access_token;
      axios.defaults.headers.common["user_id"] = response.BeAuthResponse.sub;

      setStorageItem(STORAGE_KEYS.REFRESH_TOKEN, {
        wudget: response.BeAuthResponse.refreshToken,
        bankId: response.BankIdResponse.refresh_token,
      });

      fetchUserInfo();
    } catch (err) {
      console.error(err);
      clearStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
    }
  };

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          const refreshTokens = getStorageItem(STORAGE_KEYS.REFRESH_TOKEN);

          if (refreshTokens) {
            clearEntireStore();
            loginWithRefreshToken(refreshTokens);
          }
        }
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const storedAuth = getStoreItem(STORE_KEYS.AUTH);
    const storedBeAuth = getStoreItem(STORE_KEYS.BE_AUTH);

    const refreshTokens = getStorageItem(STORAGE_KEYS.REFRESH_TOKEN);

    if (storedAuth && storedBeAuth) {
      setAuth(storedAuth);

      axios.defaults.headers.common["X-Auth-Token"] =
        "Bearer " + storedBeAuth.accessToken;
      axios.defaults.headers.common["access_token"] = storedAuth.access_token;
      axios.defaults.headers.common["user_id"] = storedBeAuth.sub;

      fetchUserInfo();
      return;
    }

    if (refreshTokens && !storedAuth && !storedBeAuth && !isLogged) {
      loginWithRefreshToken(refreshTokens);
      return;
    }

    if (!storedAuth && pathname.split("/").includes("user")) {
      navigate("/");
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        saveAuth,
        user,
        saveUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
