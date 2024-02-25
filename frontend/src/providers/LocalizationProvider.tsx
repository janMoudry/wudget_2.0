import { Language } from "@enums";
import React, { createContext, useState } from "react";
import en from "@locale/en.json";
import cs from "@locale/cs.json";
import { useStore } from ".";
import { STORE_KEYS } from "@types";

const languages = {
  en,
  cs,
};

type LocalizationContextType = {
  locale: string;
  changeLocale: (newLocale: Language) => void;
  t: (key: string) => string;
};

export const LocalizationContext = createContext<LocalizationContextType>({
  locale: "en",
  changeLocale: () => {},
  t: () => "",
});

interface LocalizationProviderProps {
  children: React.ReactNode;
}

const LocalizationProvider: React.FC<LocalizationProviderProps> = ({
  children,
}) => {
  const { getItem } = useStore();

  const [locale, setLocale] = useState<Language>(
    getItem(STORE_KEYS.LANGUAGE) || Language.cs
  );

  const changeLocale = (newLocale: Language) => {
    setLocale(newLocale);
  };

  const t = (key: string) => {
    const arr = key.split(".");

    if (arr.length === 0) {
      throw new Error("Invalid key");
    }

    const localeFile = languages[locale];

    const getValue = (
      arr: string[],
      index: number,
      currentMap: Record<string, string | object>
    ): string => {
      if (index === arr.length - 1) {
        return currentMap[arr[index]] as string;
      }

      const newMap = currentMap[arr[index]] as Record<string, string | object>;

      return getValue(arr, index + 1, newMap);
    };

    return getValue(arr, 0, localeFile);
  };

  return (
    <LocalizationContext.Provider value={{ locale, changeLocale, t }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export default LocalizationProvider;
