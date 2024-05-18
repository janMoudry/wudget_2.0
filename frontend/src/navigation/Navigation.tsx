import { LoginLayout, MainLayout } from "@components/layouts";
import {
	AccountsPage,
	BankIdRedirectPage,
	DashboarPage,
	LandingPage,
	LoginPage,
	OverviewPage,
	ProfilePage,
	SettingsPage,
} from "@pages";
import { Route, Routes } from "react-router-dom";

const Navigation = () => (
	<Routes>
		<Route index element={<LandingPage />} />
		<Route path="/" element={<LoginLayout />}>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/bankid" element={<BankIdRedirectPage />} />
		</Route>

		<Route path="/" element={<MainLayout />}>
			<Route path="user/dashboard" index element={<DashboarPage />} />
			<Route path="/overview" element={<OverviewPage />} />
			<Route path="/accounts" element={<AccountsPage />} />

			<Route path="/profile" element={<ProfilePage />} />
			<Route path="/settings" element={<SettingsPage />} />
		</Route>
	</Routes>
);

export default Navigation;
