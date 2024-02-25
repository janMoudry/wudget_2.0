import LocalizationProvider from "@providers/LocalizationProvider";
import StoreProvider from "@providers/StoreProvider";
import AuthProvider from "@providers/AuthProvider";
import Navigation from "@navigation";
import { BrowserRouter } from "react-router-dom";
import { useLayoutEffect } from "react";
import axios from "axios";

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
    <BrowserRouter>
      <StoreProvider>
        <LocalizationProvider>
          <AuthProvider>
            <Navigation />
          </AuthProvider>
        </LocalizationProvider>
      </StoreProvider>
    </BrowserRouter>
  );
};

export default App;
