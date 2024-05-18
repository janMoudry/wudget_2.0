import { CommonHeader } from "@components/headers";
import { landingPageBackground } from "@assets/background";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
	return (
		<div
			className="flex justify-center items-center w-vw h-svh bg-no-repeat bg-cover bg-center bg-fixed z-[-1]"
			style={{
				backgroundImage: `url(${landingPageBackground})`,
			}}
		>
			<CommonHeader />
			<main className="flex flex-col justify-center items-center w-full h-full">
				<Outlet />
			</main>
		</div>
	);
};

export default LoginLayout;
