import { createContext, useEffect, useState } from "react";
import { useStore } from ".";
import { STORE_KEYS, STORE_VALUES, UserInfo } from "@types";
import {
  useLocation,
  // useNavigate
} from "react-router-dom";
import axios from "axios";
import { userApi } from "@api";

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
  const { getItem, setItem } = useStore();
  // const navigate = useNavigate();
  const { pathname } = useLocation();

  const [auth, setAuth] = useState<STORE_VALUES["auth"] | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);

  const saveAuth = (
    auth: STORE_VALUES["auth"],
    beAuth: STORE_VALUES["be_auth"]
  ) => {
    setAuth(auth);
    setItem(STORE_KEYS.AUTH, auth);
    setItem(STORE_KEYS.BE_AUTH, beAuth);
  };

  const saveUser = (user: UserInfo) => {
    setUser(user);
  };

  const fetchUserInfo = async () => {
    try {
      const res = await userApi.getUserInfo();

      if (res) {
        setUser(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const auth = getItem(STORE_KEYS.AUTH);
    const beAuth = getItem(STORE_KEYS.BE_AUTH);

    if (auth && beAuth) {
      setAuth(auth);

      axios.defaults.headers.common["X-Auth-Token"] = beAuth.access_token;
      axios.defaults.headers.common["access_token"] = auth.access_token;
      axios.defaults.headers.common["user_id"] = beAuth.sub;

      fetchUserInfo();
    }

    if (!auth && pathname.split("/").includes("user")) {
      // navigate("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
