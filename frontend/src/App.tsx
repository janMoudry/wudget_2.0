import LocalizationProvider from "@providers/LocalizationProvider";
import StoreProvider from "@providers/StoreProvider";
import AuthProvider from "@providers/AuthProvider";
import Navigation from "@navigation";
import { BrowserRouter } from "react-router-dom";
import { useLayoutEffect } from "react";
import axios from "axios";
import StorageProvider from "@providers/StorageProvider";
import CookieConsent from "react-cookie-consent";
import { ModalProvider } from "@providers/ModalProvider";

const App = () => {
	const axiosInitPromise = new Promise((resolve, reject) => {
		try {
			axios.defaults.baseURL = process.env.API_URL;
			axios.defaults.headers.common["X-API-KEY"] = process.env.API_KEY;

			resolve("");
		} catch (e) {
			reject(e);
		}
	});

	useLayoutEffect(() => {
		axiosInitPromise.then().catch((e) => {
			console.error(e);

			window.location.href = "/error";
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ModalProvider>
			<BrowserRouter>
				<StoreProvider>
					<StorageProvider>
						<LocalizationProvider>
							<AuthProvider>
								<Navigation />
							</AuthProvider>
						</LocalizationProvider>
					</StorageProvider>
				</StoreProvider>

				<CookieConsent
					location="bottom"
					buttonText="Rozumím"
					cookieName="cookieConsent"
					style={{
						background: "#2B373B",
						color: "#FFF",
						fontSize: "13px",
						fontWeight: "bold",
					}}
					buttonStyle={{
						color: "#4e503b",
						fontSize: "13px",
						fontWeight: "bold",
						background: "#FFF",
						borderRadius: "5px",
					}}
					expires={150}
					onAccept={() => {
						console.log("onAccept");
					}}
				>
					Tohle je zatím jen testovací text pro cookie consent
				</CookieConsent>
			</BrowserRouter>
		</ModalProvider>
	);
};

export default App;
