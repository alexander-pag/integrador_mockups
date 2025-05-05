import { useState, useEffect } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
} from "chart.js";
import {
  FaHeartbeat,
  FaChartBar,
  FaUsers,
  FaMapMarkedAlt,
  FaChartLine,
  FaUserInjured,
} from "react-icons/fa";

// Registro de componentes
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  BarElement
);
import { motion } from "framer-motion";
import TablaRegiones from "./TablaRegiones";
import dataCorto from "../data/corto.json";

const MotionDiv = motion.div;

export const CardiovascularDashboard = () => {
  const [riskLevel, setRiskLevel] = useState<"low" | "moderate" | "high">(
    "moderate"
  );
  const [loading, setLoading] = useState(true);

  const demoData = {
    ageDistribution: {
      labels: ["18-30", "31-45", "46-60", "60+"],
      datasets: [
        {
          data: [15, 30, 35, 20],
          backgroundColor: ["#10B981", "#3AB7C1", "#6B7280", "#EF4444"],
          borderWidth: 0,
        },
      ],
    },
    riskFactors: {
      labels: ["Lifestyle", "Genetic", "Environmental"],
      datasets: [
        {
          data: [40, 35, 25],
          backgroundColor: ["#3AB7C1", "#10B981", "#6B7280"],
          borderWidth: 0,
        },
      ],
    },
    trendData: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Risk Trend",
          data: [65, 59, 80, 81, 56, 55],
          borderColor: "#10B981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
  };

  const anos = dataCorto.map((item) => item.AÑO_DIAGNOSTICO);
  const riesgosPromedio = dataCorto.map((item) => item.promedio_riesgo);
  const pacientesTotales = dataCorto.map((item) => item.total_pacientes);

  // Dataset para el gráfico de línea
  const riskTrendData = {
    labels: anos,
    datasets: [
      {
        label: "Promedio de Riesgo",
        data: riesgosPromedio,
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Dataset para el gráfico de barras
  const patientsTrendData = {
    labels: anos,
    datasets: [
      {
        label: "Total de Pacientes",
        data: pacientesTotales,
        backgroundColor: "#3AB7C1",
        borderRadius: 10,
      },
    ],
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const getRiskColor = (risk: "low" | "moderate" | "high") => {
    const colors = {
      low: "bg-green-500",
      moderate: "bg-yellow-500",
      high: "bg-red-500",
    };
    return colors[risk] || colors.moderate;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
        <div className="animate-pulse text-3xl text-gray-600 font-semibold">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <motion.header
        className="bg-white rounded-3xl shadow-lg p-6 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <FaHeartbeat className="text-5xl text-[#10B981]" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Cardiovascular Dashboard
              </h1>
              <p className="text-gray-500 text-sm">Caldas, Colombia</p>
            </div>
          </div>
          <div
            className={`px-6 py-2 rounded-full ${getRiskColor(
              riskLevel
            )} text-white font-semibold shadow-md text-center transition duration-300`}
          >
            {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
          </div>
        </div>
      </motion.header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Age Distribution */}
        {/* <MotionDiv
          className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Age Distribution
            </h2>
            <FaChartBar className="text-[#3AB7C1]" />
          </div>
          <div className="h-72">
            <Doughnut
              data={demoData.ageDistribution}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </MotionDiv> */}

        <MotionDiv
          className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Risk Evolution
            </h2>
            <FaChartLine className="text-[#10B981]" />
          </div>
          <div className="h-[300px]">
            <Line
              data={riskTrendData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </MotionDiv>

        {/* Total Pacientes por Año */}
        <MotionDiv
          className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Patients Diagnosed
            </h2>
            <FaUserInjured className="text-[#3AB7C1]" />
          </div>
          <div className="h-[300px]">
            <Bar
              data={patientsTrendData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </MotionDiv>

        {/* Risk Factors */}
        {/* <MotionDiv
          className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Risk Factors
            </h2>
            <FaUsers className="text-[#3AB7C1]" />
          </div>
          <div className="h-72">
            <Doughnut
              data={demoData.riskFactors}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </MotionDiv> */}

        {/* Risk Trend */}
        {/* <MotionDiv
          className="bg-white rounded-3xl shadow-lg p-6 lg:col-span-1 hover:shadow-2xl transition duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Risk Trend</h2>
            <FaMapMarkedAlt className="text-[#3AB7C1]" />
          </div>
          <div className="h-[400px]">
            <Line
              data={demoData.trendData}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </MotionDiv> */}
      </div>

      {/* Key Insights */}
      <MotionDiv
        className="mt-8 bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-emerald-50 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Lifestyle Impact
            </h3>
            <p className="text-gray-600">40% contribution to overall risk</p>
          </div>
          <div className="p-6 bg-sky-50 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Genetic Factors
            </h3>
            <p className="text-gray-600">35% contribution to overall risk</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Environmental Factors
            </h3>
            <p className="text-gray-600">25% contribution to overall risk</p>
          </div>
        </div>
      </MotionDiv>

      <MotionDiv
        className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition duration-300 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Risk Factors by Region
          </h2>
          <FaMapMarkedAlt className="text-[#3AB7C1]" />
        </div>

        {/* Aquí quitas el h-72 y le das overflow si lo necesitas */}
        <div className="overflow-auto">
          <TablaRegiones />
        </div>
      </MotionDiv>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-xs">
        © 2025 Cardiovascular Risk Assessment
      </footer>
    </div>
  );
};
