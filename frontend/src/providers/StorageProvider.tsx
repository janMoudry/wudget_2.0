import { STORAGE_KEYS, STORAGE_VALUES } from "@types";
import { createContext } from "react";

type StorageContext = {
  getItem: <T extends STORAGE_KEYS>(key: T) => STORAGE_VALUES[T] | null;
  setItem: <T extends STORAGE_KEYS>(key: T, value: STORAGE_VALUES[T]) => void;
  clearItem: (key: STORAGE_KEYS) => void;
  clearEntireStorage: () => void;
};

export const StorageContext = createContext<StorageContext>({
  setItem: () => {},
  getItem: () => null,
  clearItem: () => {},
  clearEntireStorage: () => {},
});

interface StorageProviderProps {
  children: React.ReactNode;
}

const StorageProvider = ({ children }: StorageProviderProps) => {
  const getItem = <T extends STORAGE_KEYS>(key: T) => {
    const item = localStorage.getItem(key);

    if (!item) {
      return null;
    }

    return JSON.parse(item);
  };

  const setItem = <T extends STORAGE_KEYS>(
    key: T,
    value: STORAGE_VALUES[T]
  ) => {
    console.log(key, value);

    localStorage.setItem(key, JSON.stringify(value));
  };

  const clearItem = (key: STORAGE_KEYS) => {
    localStorage.removeItem(key);
  };

  const clearEntireStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <StorageContext.Provider
      value={{
        getItem,
        setItem,
        clearItem,
        clearEntireStorage,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export default StorageProvider;
