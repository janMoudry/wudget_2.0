import {
  linkedinIcon,
  facebookIcon,
  instagramIcon,
  tiktokIcon,
} from "@assets/icons";

const socials = [
  {
    link: "https://www.linkedin.com/company/100653917/admin/feed/posts/",
    icon: linkedinIcon,
    alt: "linkedin icon",
  },
  {
    link: "https://www.facebook.com/wudgetcz",
    icon: facebookIcon,
    alt: "facebook icon",
  },
  {
    link: "https://www.instagram.com/wudget.cz/",
    icon: instagramIcon,
    alt: "instagram icon",
  },
  {
    link: "https://www.tiktok.com/@wudgetcz",
    icon: tiktokIcon,
    alt: "tiktok icon",
  },
];

const Footer = () => {
  return (
    <footer className="flex flex-col bg-white w-full min-h-40 justify-center items-center">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-5 w-full px-10">
        <div>
          <h2 className="text-md sm:text-2xl font-bold">Sledujte nás:</h2>
          <div
            className="flex justify-center items-center gap-5 w-full h-10"
            data-testid="footer-socials"
          >
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={social.icon}
                  alt={social.alt}
                  className="sm:w-7 sm:h-7 w-4 h-4 hover:animate-wiggle"
                />
              </a>
            ))}
          </div>
        </div>
        <div
          className="flex flex-col justify-center items-center gap-5"
          data-testid="footer-contact"
        >
          <h2
            className="text-md sm:text-2xl font-bold"
            data-testid="footer-contact-title"
          >
            Můžete nás kontaktovat na emailu:{" "}
          </h2>
          <a
            href="mailto:"
            className="underline"
            data-testid="footer-contact-email"
          >
            support@wudget.cz
          </a>
          <p>Nebo přes naše sociální sítě</p>
        </div>
      </div>
      <span className="">
        <p className="text-sm">© 2021 Wudget</p>
      </span>
    </footer>
  );
};

export default Footer;
