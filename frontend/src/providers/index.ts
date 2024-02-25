import { useContext } from "react";
import { LocalizationContext } from "./LocalizationProvider";
import { StoreContext } from "./StoreProvider";
import { AuthContext } from "./AuthProvider";

const useLocalization = () => useContext(LocalizationContext);
const useTranslation = () => useContext(LocalizationContext).t;
const useStore = () => useContext(StoreContext);
const useAuth = () => useContext(AuthContext);

export { useLocalization, useTranslation, useStore, useAuth };
