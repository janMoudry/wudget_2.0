import { MenuLinkType } from "@types";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface MenuLinkProps extends MenuLinkType {}

const MenuLink: FC<MenuLinkProps> = ({ icon, to, text }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNavigate = () => {
    navigate("/user" + to);
  };

  const isVisited = pathname.includes(to);

  return (
    <span
      className={`flex flex-row items-center gap-3 px-5 py-3 rounded-md cursor-pointer hover:bg-gray-100 w-full justify-start ${
        isVisited && "bg-gray-100 text-primary-500 font-bold"
      } `}
      onClick={handleNavigate}
    >
      <img src={icon} alt="icon" className="w-6 h-6" />
      <p>{text}</p>
    </span>
  );
};

export default MenuLink;
