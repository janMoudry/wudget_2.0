import { authApi } from "@api";
import { appIcon } from "@assets/images";
import { LoginLayout } from "@components/layouts";
import { useTranslation } from "@providers/index";

const LoginPage = () => {
  const t = useTranslation();

  const handleNavigateToBankId = async () => {
    const redirectUrl = await authApi.getRedirectUri();

    window.location.href = redirectUrl.toString();
  };

  return (
    <LoginLayout>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <img src={appIcon} alt="promo icon" className="" />
        <p className="text-center text-gray-600 w-full px-5 sm:w-1/3 sm:p-0">
          {t("login.text")}
        </p>
        <div className="mt-10">
          <button
            type="button"
            data-testid="login-button"
            className="px-6 py-3 rounded-lg font-bold transition-all duration-300 bg-black text-white hover:bg-black-light"
            onClick={handleNavigateToBankId}
          >
            {t("login.bankId")}
          </button>
        </div>
      </div>
    </LoginLayout>
  );
};

export default LoginPage;
