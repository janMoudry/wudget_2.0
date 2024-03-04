import { airbankIcon } from "@assets/images";

const Carousel = () => {
  const banks = [
    {
      name: "Moneta",
      logo: airbankIcon,
    },
    {
      name: "Česká spořitelna",
      logo: airbankIcon,
    },
    {
      name: "Fio banka",
      logo: airbankIcon,
    },
    {
      name: "Raiffeisenbank",
      logo: airbankIcon,
    },
    {
      name: "Air Bank",
      logo: airbankIcon,
    },
    {
      name: "Komerční banka",
      logo: airbankIcon,
    },
  ];

  return (
    <div className="flex items-center justify-start gap-5 w-svw sm:w-[75vw] overflow-hidden relative">
      <div
        className="absolute left-0 top-0 w-20 h-full z-20 bg-transparent"
        style={{
          backdropFilter: "blur(2px)",
        }}
      />
      <div className="flex items-center justify-start carousel-auto-play">
        {banks.map((bank) => (
          <span
            className="w-[50vw] sm:w-[20vw] text-center p-0 m-0"
            key={bank.name}
          >
            <img src={bank.logo} alt={bank.name} className="w-20" />
          </span>
        ))}
        {banks.map((bank) => (
          <span
            className="w-[50vw] sm:w-[20vw] text-center p-0 m-0"
            key={bank.name}
          >
            <img src={bank.logo} alt={bank.name} className="w-20" />
          </span>
        ))}
      </div>
      <div
        className="absolute right-0 top-0 w-20 h-full z-20 bg-transparent"
        style={{
          backdropFilter: "blur(2px)",
        }}
      />
    </div>
  );
};

export default Carousel;
