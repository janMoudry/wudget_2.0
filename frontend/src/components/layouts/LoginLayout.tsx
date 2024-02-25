import { CommonHeader } from "@components/headers";

interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center w-vw h-svh">
      <CommonHeader />
      <main className="flex flex-col justify-center items-center w-full h-full">
        {children}
      </main>
    </div>
  );
};

export default LoginLayout;
