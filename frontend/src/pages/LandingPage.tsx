import { enterIcon } from "@assets/icons";
import {
	businessIdeaSticker2,
	checkListSticker,
	dataAnalysisSticker,
	monitoringSticker2,
	teamWorkSticker,
} from "@assets/stickers";
import {
	Button,
	// Carousel
} from "@components/common";
import { LandingLayout } from "@components/layouts";
import { useIsVisible } from "@hooks";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
	const navigate = useNavigate();
	const [isLoginIconShown, setIsLoginIconShown] = useState(false);

	const section1Ref = useRef(null);
	const section2Ref = useRef(null);

	const isVisible1 = useIsVisible(section1Ref);
	const isVisible2 = useIsVisible(section2Ref);

	const handleStart = () => {
		navigate("/login");
	};

	useEffect(() => {
		const showLoginIconOnScroll = () => {
			if (window.scrollY > 100) {
				setIsLoginIconShown(true);
			} else {
				setIsLoginIconShown(false);
			}
		};

		window.addEventListener("scroll", showLoginIconOnScroll);

		return () => {
			window.removeEventListener("scroll", showLoginIconOnScroll);
		};
	}, []);

	return (
		<LandingLayout>
			{isLoginIconShown && (
				<div
					className={`fixed top-2 right-2 sm:top-5 sm:right-5 shadow-md shadow-gray-300 rounded-full justify-center item-center z-30 p-3 cursor-pointer transition-all hover:shadow-gray-500 fade-in`}
					onClick={handleStart}
				>
					<img src={enterIcon} alt="enter icon" className="w-6" />
				</div>
			)}
			{/* Main section */}
			<section className="flex relative flex-col items-center justify-start gap-8 w-full px-5 h-svh">
				<h1 className="text-4xl text-center font-bold animate-fade-up">
					Vítejte na <span className="text-primary">Wudget</span>
				</h1>
				<h2
					className="text-center text-2xl text-gray-600 animate-fade-up animate-delay-[500ms]"
					data-testid="landing-subtitle"
				>
					Spravujte své finance jednoduše a efektivně na jednom místě
				</h2>
				<img
					src={teamWorkSticker}
					alt="promo"
					className="sm:w-auto sm:h-1/2 w-full h-1/3 animate-fade-up animate-delay-[1000ms]"
				/>
				<Button
					variant="primary"
					type="button"
					onClick={handleStart}
					className="animate-fade-up animate-delay-[1500ms]"
				>
					Začít s Wudget
				</Button>
			</section>
			<section
				className={`flex flex-col min-h-[50svh] items-center justify-start gap-5 w-full px-5`}
				data-testid="landing-why-wudget"
				ref={section1Ref}
			>
				<div
					className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full"
					data-testid="landing-why-wudget-list"
				>
					<div
						className={`flex h-1/3 flex-col items-center justify-center gap-5 shadow-md shadow-gray-300 rounded-md p-5 bg-white ${
							isVisible1 ? "animate-jump-in animate-delay-0" : ""
						}`}
					>
						<h2 className="text-2xl text-center font-bold">
							Jednoduché
						</h2>
						<img
							src={dataAnalysisSticker}
							alt="promo"
							className="w-1/2"
						/>
						<p className="text-center text-gray-600">
							Jednoduché a přehledné zobrazení ve formě grafů a
							tabulek
						</p>
					</div>
					<div
						className={`flex h-1/3 flex-col items-center justify-center gap-5 shadow-md shadow-gray-300 rounded-md p-5 bg-white ${
							isVisible1
								? "animate-jump-in animate-delay-[500ms]"
								: ""
						}`}
					>
						<h2 className="text-2xl text-center font-bold">
							Vše na jednom místě
						</h2>
						<img
							src={checkListSticker}
							alt="promo"
							className="w-1/2"
						/>
						<p className="text-center text-gray-600">
							Všechny důležité informace o vašich financích na
							jednom místě
						</p>
					</div>
					<div
						className={`flex h-1/3 flex-col items-center justify-center gap-5 shadow-md shadow-gray-300 rounded-md p-5 bg-white ${
							isVisible1
								? "animate-jump-in animate-delay-[1000ms]"
								: ""
						}`}
					>
						<h2 className="text-2xl text-center font-bold">
							Odborná pomoc
						</h2>
						<img
							src={monitoringSticker2}
							alt="promo"
							className="w-1/2"
						/>
						<p className="text-center text-gray-600">
							Získejte pomoc od odborníků na finance a investice
							na jedno kliknutí
						</p>
					</div>
				</div>
			</section>
			<section
				ref={section2Ref}
				className={`flex items-center justify-center min-h-[50svh] flex-col sm:flex-row w-full px-5 mt-20`}
			>
				<div
					className="flex flex-col items-center justify-center w-full sm:w-2/3"
					data-testid="landing-what-wudget"
				>
					<h2
						className={`text-3xl text-center font-bold
            ${isVisible2 ? "animate-fade-right" : ""}
            `}
						data-testid="landing-what-wudget"
					>
						<span className="text-primary">Wudget</span> vám pomůže
						s vašimi financemi
					</h2>
					<p
						className={`text-center text-gray-600  
            ${isVisible2 ? "animate-fade-right" : ""}
            `}
						data-testid="landing-what-wudget-text"
					>
						Wudget vám pomůže s plánováním vašich financí,
						investicemi a mnohem více. Vše na jednom místě.
					</p>
					<ul
						className="flex flex-col items-start justify-center mt-5"
						data-testid="landing-what-wudget-list"
					>
						<li
							className={`text-center text-gray-600 before:content-['✔️'] flex gap-2 ${
								isVisible2
									? "animate-fade-up animate-delay-[200ms]"
									: ""
							}`}
							data-testid="landing-what-wudget-list"
						>
							Povědomí o všech předplaných
						</li>
						<li
							className={`text-center text-gray-600 before:content-['✔️'] flex gap-2 ${
								isVisible2
									? "animate-fade-up animate-delay-[500ms]"
									: ""
							}`}
							data-testid="landing-what-wudget-list"
						>
							Přehled o vašich investicích
						</li>
						<li
							className={`text-center text-gray-600 before:content-['✔️'] flex gap-2 ${
								isVisible2
									? "animate-fade-up animate-delay-[800ms]"
									: ""
							}`}
							data-testid="landing-what-wudget-list"
						>
							Odborná pomoc na jedno kliknutí
						</li>
						<li
							className={`text-center text-gray-600 before:content-['✔️'] flex gap-2 ${
								isVisible2
									? "animate-fade-up animate-delay-[1100ms]"
									: ""
							}`}
							data-testid="landing-what-wudget-list"
						>
							Stáhnutí výpisů z bankovních účtů
						</li>
					</ul>
				</div>
				<img
					src={businessIdeaSticker2}
					alt="promo"
					className={`w-full sm:w-1/3
          ${isVisible2 ? "animate-fade-left" : ""}
          `}
				/>
			</section>
			<section
				className="flex flex-col items-center justify-center w-full px-5 mt-20"
				data-testid="landing-supported-banks"
			>
				<h2
					className="text-3xl text-center font-bold mb-5"
					data-testid="landing-supported-banks"
				>
					Podporované banky
				</h2>
				{/* <Carousel /> */}
				Zatím žádné banky nejsou podporovány
			</section>
		</LandingLayout>
	);
};

export default LandingPage;
