import { useLocation } from "react-router-dom";
import { Avatar } from ".";
import { useAuth, useTranslation } from "@providers/index";

const UpperBar = () => {
  const t = useTranslation();
  const { pathname } = useLocation();
  const { user } = useAuth();

  return (
    <div className="flex justify-end sm:justify-between items-center w-full px-5 py-5 bg-bg-light border-b border-border-light ">
      <div className="hidden sm:flex gap-1 items-center w-full sm:w-auto justify-center sm:justify-start">
        <h1
          className="text-2xl font-bold text-gray-800"
          data-testid="page-title"
        >
          /
        </h1>
        <h1 className="text-md font-bold text-gray-600">
          {t(`routes.${pathname.split("/").pop()}`)}
        </h1>
      </div>
      {user?.name && <Avatar fullName={user.name} />}
    </div>
  );
};

export default UpperBar;
