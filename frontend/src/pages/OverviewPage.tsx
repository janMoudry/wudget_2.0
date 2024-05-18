import { BasicPieChart } from "@components/Charts";
import { Tabs } from "@components/common";

const OverviewPage = () => {
	return (
		<>
			<Tabs
				tabsClassname="w-full sm:w-full flex justify-center items-center"
				contentClassname="w-full sm:w-full flex justify-center items-center"
				containerClassname="mt-1 sm:mt-10"
			>
				{[
					<Tabs.Tab key={"1"} title="Přehled">
						<div className="w-full sm:w-full">
							<BasicPieChart income={1000} expenses={500} />
						</div>
					</Tabs.Tab>,
					<Tabs.Tab key={"2"} title="Grafy">
						<div className="">
							<h1>
								Tady bude nějaký přehled, který bude
								customizovatelný uživatelem
							</h1>
						</div>
					</Tabs.Tab>,
				]}
			</Tabs>
		</>
	);
};

export default OverviewPage;
