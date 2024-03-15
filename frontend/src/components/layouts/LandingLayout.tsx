import { Footer } from "@components/common";
import { LandingHeader } from "@components/headers";
import { FC } from "react";
import { landingPageBackground } from "@assets/background";
import { isMobile } from "@utils";

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: FC<LandingLayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center flex-col w-vw min-h-svh gap-5">
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-no-repeat bg-cover z-[-1]"
        style={{
          backgroundImage: `url(${landingPageBackground})`,
          backgroundPosition: isMobile() ? "100% 100%" : "center",
        }}
      />
      <LandingHeader />
      <main className="flex flex-col justify-center items-center w-full gap-5 min-h-svh">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
