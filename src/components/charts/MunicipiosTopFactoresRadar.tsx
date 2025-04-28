import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface MunicipioData {
  municipio: string;
  top_factores: [string, number][];
}

interface Props {
  data: MunicipioData;
}

export const MunicipiosTopFactoresRadar = ({ data }: Props) => {
  const chartData = {
    labels: data.top_factores.map((f) => f[0]),
    datasets: [
      {
        label: "Importancia",
        data: data.top_factores.map((f) => f[1]),
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        borderColor: "#10B981",
        pointBackgroundColor: "#10B981",
      },
    ],
  };

  return (
    <div className="h-[300px]">
      <Radar
        data={chartData}
        options={{
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: { display: false },
              suggestedMin: 0,
              suggestedMax: 0.005,
            },
          },
        }}
      />
    </div>
  );
};
