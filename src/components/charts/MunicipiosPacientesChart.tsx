import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface MunicipioData {
  municipio: string;
  pacientes: number;
}

interface Props {
  data: MunicipioData[];
}

export const MunicipiosPacientesChart = ({ data }: Props) => {
  const chartData = {
    labels: data.map((d) => d.municipio),
    datasets: [
      {
        label: "Pacientes",
        data: data.map((d) => d.pacientes),
        backgroundColor: "#3AB7C1",
        borderRadius: 10,
      },
    ],
  };

  return (
    <div className="h-[400px]">
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};
