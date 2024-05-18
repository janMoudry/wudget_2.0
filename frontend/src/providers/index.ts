import { useContext } from "react";
import { LocalizationContext } from "./LocalizationProvider";
import { StoreContext } from "./StoreProvider";
import { AuthContext } from "./AuthProvider";
import { StorageContext } from "./StorageProvider";
import { ModalContext } from "./ModalProvider";

const useLocalization = () => useContext(LocalizationContext);
const useTranslation = () => useContext(LocalizationContext).t;
const useStore = () => useContext(StoreContext);
const useAuth = () => useContext(AuthContext);
const useStorage = () => useContext(StorageContext);
const useModalContext = () => useContext(ModalContext);

export {
	useLocalization,
	useTranslation,
	useStore,
	useAuth,
	useStorage,
	useModalContext,
};
