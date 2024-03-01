import { Footer } from "@components/common";
import { LandingHeader } from "@components/headers";
import { FC } from "react";

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: FC<LandingLayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center flex-col w-vw min-h-svh gap-5">
      <LandingHeader />
      <main className="flex flex-col justify-center items-center w-full gap-5 min-h-svh">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
