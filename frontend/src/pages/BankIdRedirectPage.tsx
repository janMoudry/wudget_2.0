import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { authApi } from "@api";
import { LoginLayout } from "@components/layouts";
import { TokenResponse } from "@types";
import { Loader } from "@components/common";
import { useAuth } from "@providers/index";

const BankIdRedirectPage = () => {
  const navigate = useNavigate();
  const { saveAuth } = useAuth();

  const login = async (accessToken: TokenResponse) => {
    const res = await authApi.login(accessToken);

    if (res) {
      saveAuth(res.BankIdResponse, res.BeAuthResponse);
      navigate("/user/dashboard");
    }
  };

  function parseHashFragment() {
    const data = {
      code: "",
      state: "",
    };

    const params = new URLSearchParams(window.location.search);

    data.code = params.get("code") || "";
    data.state = params.get("state") || "";

    return data;
  }

  useEffect(() => {
    const data = parseHashFragment();

    if (data) {
      login(data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoginLayout>
      <div className="flex flex-col justify-center items-center w-full min-h-svh">
        <h1
          className="text-2xl text-gray-600 text-center"
          data-testid="loading-text"
        >
          Chvíli strpení, probíhá přihlášení...
        </h1>
        <div className="mt-10">
          <Loader />
        </div>
      </div>
    </LoginLayout>
  );
};

export default BankIdRedirectPage;
