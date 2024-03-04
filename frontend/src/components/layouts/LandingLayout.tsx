import { Footer } from "@components/common";
import { LandingHeader } from "@components/headers";
import { FC, useEffect, useState } from "react";
import { landingPageBackground } from "@assets/background";
import { isMobile } from "@utils";

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: FC<LandingLayoutProps> = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const calculateBackgroundSize = () => {
    const zoomFactor = 1 + scrollPosition * 0.002;

    const viewportAspectRatio = window.innerWidth / window.innerHeight;

    if (viewportAspectRatio < 1.5) {
      return "cover";
    }

    const backgroundSize = `${zoomFactor * 100}%`;
    return backgroundSize > "300%" ? "300%" : backgroundSize;
  };

  return (
    <div className="flex justify-center items-center flex-col w-vw min-h-svh gap-5">
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-no-repeat bg-cover z-[-1]"
        style={{
          backgroundImage: `url(${landingPageBackground})`,
          backgroundSize: !isMobile() ? calculateBackgroundSize() : "cover",
          backgroundPosition: !isMobile() ? "center" : "100% 100%",
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
