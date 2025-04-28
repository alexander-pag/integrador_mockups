import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface MunicipioData {
  municipio: string;
  promedio_riesgo: number;
}

interface Props {
  data: MunicipioData[];
}

export const MunicipiosRiesgoChart = ({ data }: Props) => {
  const chartData = {
    labels: data.map((d) => d.municipio),
    datasets: [
      {
        label: "Promedio de Riesgo",
        data: data.map((d) => d.promedio_riesgo),
        fill: true,
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="h-[400px]">
      <Line
        data={chartData}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};
