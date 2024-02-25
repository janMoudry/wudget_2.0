import { isMobile } from "@utils";
import ReactEcharts from "echarts-for-react";
import { FC } from "react";

interface BasicPieChartProps {
  income: number;
  expenses: number;
}

const BasicPieChart: FC<BasicPieChartProps> = ({ income, expenses }) => {
  const width = isMobile() ? "50%" : "80%";

  const options = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} kč ({d}%)",
    },
    series: [
      {
        name: "Poměr výdajů a příjmů",
        type: "pie",
        radius: ["0%", width],
        avoidLabelOverlap: true,
        label: {
          show: true,
          formatter: "{b}: ({d}%)",
          // Removed fixed font size and position for better automatic adjustment
        },
        emphasis: {
          label: {
            show: true,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: true,
        },
        data: [
          { value: expenses, name: "výdaje" },
          { value: income, name: "Příjmy" },
        ],
      },
    ],
  };

  return (
    <div className="w-full">
      <ReactEcharts option={options} style={{ width: "100%" }} />
    </div>
  );
};

export default BasicPieChart;
