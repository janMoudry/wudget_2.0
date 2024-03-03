import { enterIcon } from "@assets/icons";
import { appIcon } from "@assets/images";
import { Button } from "@components/common";
import { useTranslation } from "@providers/index";
import { useNavigate } from "react-router-dom";

const CommonHeader = () => {
  const t = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = (to: string) => {
    navigate(to);
  };

  return (
    <header className="justify-center sm:justify-between items-center gap-5 w-full bg-transparent text-black fixed top-0 left-0 px-1 sm:px-5 hidden md:flex">
      <img
        src={appIcon}
        alt="icona wudget"
        className="w-40 cursor-pointer"
        onClick={() => handleNavigate("/")}
      />

      <div className="gap-5 hidden sm:flex">
        <Button
          variant="secondary"
          type="button"
          onClick={() => handleNavigate("/")}
        >
          {t("login.home")}
        </Button>
      </div>
      <div
        className="flex sm:hidden absolute right-5"
        onClick={() => handleNavigate("/login")}
      >
        <img src={enterIcon} alt="enter icon" className="w-6 " />
      </div>
    </header>
  );
};

export default CommonHeader;
