import { LandingHeader } from "@components/headers";
import { FC } from "react";

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: FC<LandingLayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center w-vw min-h-svh">
      <LandingHeader />
      <main className="flex flex-col justify-center items-center w-full h-full gap-5">
        {children}
      </main>
    </div>
  );
};

export default LandingLayout;
