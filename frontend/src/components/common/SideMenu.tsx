import {
  accountsIcon,
  dashboardIcon,
  menuIcon,
  overviewIcon,
} from "@assets/icons";
import { appIcon } from "@assets/images";
import { MenuLink } from ".";
import { useTranslation } from "@providers/index";
import { MenuLinkType } from "@types";
import { useBooleanState } from "@hooks";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const t = useTranslation();
  const navigate = useNavigate();

  const [isOpen, switchOpen] = useBooleanState(false);

  const menuLinks: MenuLinkType[] = [
    {
      id: 1,
      to: "/dashboard",
      text: t("sideMenu.dashboard"),
      icon: dashboardIcon,
    },
    {
      id: 2,
      to: "/overview",
      text: t("sideMenu.overview"),
      icon: overviewIcon,
    },
    {
      id: 3,
      to: "/accounts",
      text: t("sideMenu.accounts"),
      icon: accountsIcon,
    },
  ];

  return (
    <>
      <div className={`relative w-side-menu h-full hidden sm:flex`} />

      <span
        className="absolute top-8 left-5 sm:hidden z-50"
        onClick={switchOpen}
      >
        <img
          src={menuIcon}
          alt="menu icon"
          className="w-6 h-6 cursor-pointer"
        />
      </span>

      <div
        className={`flex-col fixed top-0 left-0 h-screen items-center bg-white z-40 shadow-md transition-all w-svw sm:w-side-menu ${
          isOpen ? "flex" : "hidden"
        } sm:flex`}
      >
        <img
          src={appIcon}
          alt="app icon"
          className="w-1/2 sm:w-3/4"
          onClick={() => navigate("/user/dashboard")}
        />
        <div className="flex flex-col gap-2 mt-10 w-full">
          {menuLinks.map((link) => (
            <MenuLink {...link} key={link.id} />
          ))}
        </div>
        
      </div>
    </>
  );
};

export default SideMenu;
