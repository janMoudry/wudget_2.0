import { promoIcon } from "@assets/icons";
import { Button } from "@components/common";
import { LandingLayout } from "@components/layouts";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/login");
  };

  return (
    <LandingLayout>
      <div className="flex flex-col items-center justify-center gap-5 w-full px-5 h-svh">
        <h1 className="text-4xl text-center font-bold">
          Vítejte na <span className="text-primary">Wudget</span>
        </h1>
        <h2
          className="text-center text-2xl text-gray-600"
          data-testid="landing-subtitle"
        >
          Spravujte své finance jednoduše a efektivně s Wudget
        </h2>
        <img src={promoIcon} alt="promo" className="sm:w-1/2 w-full" />
        <Button
          variant="secondary"
          type="button"
          onClick={handleStart}
          className=""
        >
          Začít s Wudget
        </Button>
      </div>

      {/* <div>
        <p className="text-center text-gray-600 text-md">
          Ovládněte své finance s elegancí – Wudget vám přináší revoluci v
          osobní finanční správě. Naše aplikace je navržena tak, aby z
          finančního plánování učinila nejen nezbytnost, ale i potěšení.
          Srozumitelné grafy a přehledné kategorie transformují vaše příjmy a
          výdaje do snadno srozumitelného příběhu, kde je každá kapitola krokem
          k lepší finanční budoucnosti.
        </p>
      </div> */}
    </LandingLayout>
  );
};

export default LandingPage;
