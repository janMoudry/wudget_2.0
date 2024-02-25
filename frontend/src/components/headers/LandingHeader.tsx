import { enterIcon } from "@assets/icons";
import { appIcon } from "@assets/images";
import { BooleanShow, Button } from "@components/common";
import { useAuth, useTranslation } from "@providers/index";
import { useNavigate } from "react-router-dom";

const LandingHeader = () => {
  const t = useTranslation();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleNavigate = (to: string) => {
    navigate(to);
  };

  return (
    <header className="flex justify-center sm:justify-between items-center gap-5 w-full bg-white text-black fixed top-0 left-0 px-1 sm:px-10">
      <img
        src={appIcon}
        alt="icona wudget"
        className="w-40"
        onClick={() => handleNavigate("/")}
      />

      <BooleanShow cond={!auth}>
        <BooleanShow.True>
          <div className="gap-5 hidden sm:flex">
            <Button
              variant="secondary"
              type="button"
              onClick={() => handleNavigate("/login")}
            >
              {t("login.login")}
            </Button>
            <Button
              variant="primary"
              type="button"
              onClick={() => handleNavigate("/login")}
            >
              {t("login.signup")}
            </Button>
          </div>
        </BooleanShow.True>
        <BooleanShow.False>
          <span onClick={() => handleNavigate("/user/dashboard")}>
            <Button variant="secondary" type="button">
              {t("header.continue")}
            </Button>
          </span>
        </BooleanShow.False>
      </BooleanShow>
      <div
        className="flex sm:hidden absolute right-5"
        onClick={() => handleNavigate("/login")}
      >
        <img src={enterIcon} alt="enter icon" className="w-6 " />
      </div>
    </header>
  );
};

export default LandingHeader;
