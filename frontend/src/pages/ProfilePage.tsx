import { MainLayout } from "@components/layouts";
import { useAuth } from "@providers/index";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="flex gap-2 justify-center items-center w-full min-h-svh">
        <label
          htmlFor="fullname"
          className="text-2xl text-gray-600 text-center"
        >
          Jméno:
        </label>
        <h1
          className="text-2xl text-gray-600 text-center"
          data-testid="fullname"
        >
          {user?.name}
        </h1>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
