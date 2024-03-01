import { authApi } from "@api";
import { appIcon } from "@assets/images";
import { Button } from "@components/common";
import { Checkbox } from "@components/inputs";
import { LoginLayout } from "@components/layouts";
import { useTranslation } from "@providers/index";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const t = useTranslation();

  const { register, handleSubmit } = useForm<{
    rememberMe: boolean;
  }>({
    defaultValues: {
      rememberMe: true,
    },
  });

  const handleNavigateToBankId = async (rememberMe: boolean) => {
    const redirectUrl = await authApi.getRedirectUri(rememberMe);

    window.location.href = redirectUrl.toString();
  };

  return (
    <LoginLayout>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <img src={appIcon} alt="promo icon" className="" />
        <p className="text-center text-gray-600 w-full px-5 sm:w-1/3 sm:p-0">
          {t("login.text")}
        </p>
        <form
          className="mt-10"
          onSubmit={handleSubmit((data) => {
            handleNavigateToBankId(data.rememberMe);
          })}
        >
          <Button variant="primary" type="submit" data-testid="login-button">
            {t("login.bankId")}
          </Button>
          <Checkbox
            className="mt-5"
            label={t("login.rememberMe")}
            register={register}
            registerName="rememberMe"
          />
        </form>
      </div>
    </LoginLayout>
  );
};

export default LoginPage;
