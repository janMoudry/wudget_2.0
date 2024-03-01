import { authApi } from "@api";
import { arrowDownIcon, profileIcon } from "@assets/icons";
import { useBooleanState } from "@hooks";
import { useAuth, useStore, useTranslation } from "@providers/index";
import React from "react";
import { useNavigate } from "react-router-dom";

type AvatarProps = {
  fullName: string;
};

const Avatar: React.FC<AvatarProps> = ({ fullName }) => {
  const [isOpen, switchOpen] = useBooleanState(false);
  const navigate = useNavigate();
  const { clearEntireStore } = useStore();
  const t = useTranslation();
  const { user } = useAuth();

  const handleNavigate = (path: string) => {
    navigate("/user" + path);
    switchOpen();
  };

  const logout = async () => {
    try {
      await authApi.logout({
        clientId: user?.sub || "",
      });

      clearEntireStore();
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <div
        className="flex justify-center items-center gap-2 cursor-pointer 
    border-1 border-gray-200 rounded-full pr-3 pl-1px py-1px bg-white shadow-md relative
    "
        onClick={switchOpen}
      >
        <div className="flex justify-center items-center w-10 h-10 rounded-full shadow-md">
          <img src={profileIcon} alt="profile" className="w-6 h-6" />
        </div>
        <p className="text-primary-500 font-thin text-smd px-2">{`${
          fullName.split(" ")[0]
        } ${fullName.split(" ")[1].charAt(0)}.`}</p>
        <img
          src={arrowDownIcon}
          alt="arrow down"
          className={`w-4 h-4 transition-all ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div
        className={`absolute top-10 left w-0 h-0 
        border-l-[30px] border-l-transparent
        border-b-[45px] border-b-white
        border-r-[30px] border-r-transparent
        ${isOpen ? "opacity-100" : "opacity-0"}
        `}
      />
      <div
        className={`absolute flex flex-col gap-2 top-15 right-1/2 bg-white w-full z-10 rounded-lg overflow-hidden transition-all ${
          isOpen ? "max-h-svh" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-2 items-center justify-center h-10 hover:bg-gray-100 cursor-pointer">
          <p
            className="text-primary-500 font-thin text-smd px-2 cursor-pointer"
            onClick={() => handleNavigate("/profile")}
          >
            {t("routes.profile")}
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center h-10 hover:bg-gray-100 cursor-pointer">
          <p
            className="text-primary-500 font-thin text-smd px-2 cursor-pointer"
            onClick={() => handleNavigate("/settings")}
          >
            {t("routes.settings")}
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center h-10 hover:bg-gray-100 cursor-pointer">
          <p
            className="text-primary-500 font-thin text-smd px-2 cursor-pointer"
            onClick={logout}
          >
            {t("functions.logout")}
          </p>
        </div>
      </div>
      {isOpen && (
        <div className="fixed top-0 left-0 w-svw h-svh" onClick={switchOpen} />
      )}
    </div>
  );
};

export default Avatar;
