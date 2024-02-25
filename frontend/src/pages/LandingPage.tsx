import { promoIcon } from "@assets/icons";
import { LandingLayout } from "@components/layouts";

const LandingPage = () => {
  return (
    <LandingLayout>
      <img src={promoIcon} alt="promo icon" className="w-3/4" />
    </LandingLayout>
  );
};

export default LandingPage;
