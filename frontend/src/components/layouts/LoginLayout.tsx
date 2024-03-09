import { CommonHeader } from "@components/headers";
import { landingPageBackground } from "@assets/background";

interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  const calculateBackgroundSize = () => {
    const viewportAspectRatio = window.innerWidth / window.innerHeight;

    if (viewportAspectRatio < 1.5) {
      return "cover";
    }

    return "cover";
  };

  return (
    <div
      className="flex justify-center items-center w-vw h-svh"
      style={{
        backgroundImage: `url(${landingPageBackground})`,
        backgroundSize: calculateBackgroundSize(),
      }}
    >
      <CommonHeader />
      <main className="flex flex-col justify-center items-center w-full h-full">
        {children}
      </main>
    </div>
  );
};

export default LoginLayout;
