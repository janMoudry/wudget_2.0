import { SideMenu, UpperBar } from "@components/common";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-row h-screen">
      <SideMenu />
      <div className="flex flex-col flex-1 transition-all">
        <UpperBar />
        <div className="flex-1 overflow-y-auto bg-bg-light">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
