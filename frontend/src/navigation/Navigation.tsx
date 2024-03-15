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
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/bankid" element={<BankIdRedirectPage />} />

    <Route path="/user/dashboard" element={<DashboarPage />} />
    <Route path="/user/overview" element={<OverviewPage />} />
    <Route path="/user/accounts" element={<AccountsPage />} />

    <Route path="/user/profile" element={<ProfilePage />} />
    <Route path="/user/settings" element={<SettingsPage />} />
  </Routes>
);

export default Navigation;
