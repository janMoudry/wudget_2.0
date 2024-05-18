import { SideMenu, UpperBar } from "@components/common";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
	return (
		<div className="flex flex-row h-screen">
			<SideMenu />
			<div className="flex flex-col flex-1 transition-all">
				<UpperBar />
				<div className="flex-1 overflow-y-auto bg-bg-light">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default MainLayout;
