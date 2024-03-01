import { STORE_KEYS, STORE_VALUES } from "@types";
import { createContext } from "react";

type StoreProviderType = {
  getItem: <T extends STORE_KEYS>(key: T) => STORE_VALUES[T] | null;
  setItem: <T extends STORE_KEYS>(key: T, value: STORE_VALUES[T]) => void;
  clearItem: (key: STORE_KEYS) => void;
  clearEntireStore: () => void;
};

export const StoreContext = createContext<StoreProviderType>({
  getItem: () => null,
  setItem: () => {},
  clearItem: () => {},
  clearEntireStore: () => {},
});

interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  const getItem = <T extends STORE_KEYS>(key: T) => {
    const item = sessionStorage.getItem(key);

    if (!item) {
      return null;
    }

    return JSON.parse(item);
  };

  const setItem = <T extends STORE_KEYS>(key: T, value: STORE_VALUES[T]) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  const clearItem = (key: STORE_KEYS) => {
    sessionStorage.removeItem(key);
  };

  const clearEntireStore = () => {
    sessionStorage.clear();
  };

  return (
    <StoreContext.Provider
      value={{
        getItem,
        setItem,
        clearItem,
        clearEntireStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
