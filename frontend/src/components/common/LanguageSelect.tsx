import { arrowDownIcon } from "@assets/icons";
import { Language } from "@enums";
import { useBooleanState } from "@hooks";
import { useLocalization } from "@providers/index";

const LanguageSelect = () => {
  const { locale, changeLocale } = useLocalization();

  const [isOpen, switchOpen] = useBooleanState(false);

  const languagesWithFlags = [
    {
      id: 1,
      name: "czech",
      flag: "/path/to/czech-flag.png",
      value: Language.cs,
    },
    {
      id: 2,
      name: "english",
      flag: "/path/to/english-flag.png",
      value: Language.en,
    },
  ];

  const handleSelect = (value: Language) => {
    changeLocale(value);
    switchOpen();
  };

  return (
    <div className="flex relative cursor-pointer px-10">
      <img
        src={languagesWithFlags.find((lang) => lang.value === locale)?.flag}
        alt="flag"
      />
      <img src={arrowDownIcon} className={`transition-all w-5 h-5`} />

      <div
        className={`absolute top-10 right-0 bg-white w-20 z-10 rounded-sm overflow-hidden transition-all`}
        style={{
          height: isOpen ? `${languagesWithFlags.length * 40}px` : "0",
        }}
      >
        {languagesWithFlags.map((lang) => (
          <div
            key={lang.id}
            className="flex items-center justify-center h-10 hover:bg-gray-100"
            onClick={() => handleSelect(lang.value)}
          >
            <img src={lang.flag} alt="flag" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelect;
