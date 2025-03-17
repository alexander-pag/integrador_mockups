import { motion } from "framer-motion";

const regionesCaldas = [
  { region: "Manizales", riesgo: "Alto", porcentaje: 75 },
  { region: "La Dorada", riesgo: "Medio", porcentaje: 50 },
  { region: "Chinchiná", riesgo: "Bajo", porcentaje: 20 },
  { region: "Riosucio", riesgo: "Alto", porcentaje: 68 },
  { region: "Anserma", riesgo: "Medio", porcentaje: 45 },
  { region: "Salamina", riesgo: "Bajo", porcentaje: 30 },
];

const getColor = (riesgo) => {
  switch (riesgo) {
    case "Alto":
      return "text-red-600 bg-red-100";
    case "Medio":
      return "text-yellow-600 bg-yellow-100";
    case "Bajo":
      return "text-green-600 bg-green-100";
    default:
      return "";
  }
};

const TablaRegiones = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg p-6 w-full"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Riesgo Cardiovascular por Región (Caldas)
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 p-3 text-left text-sm text-gray-600">
                Región
              </th>
              <th className="border-b-2 p-3 text-left text-sm text-gray-600">
                Riesgo
              </th>
              <th className="border-b-2 p-3 text-left text-sm text-gray-600">
                Porcentaje
              </th>
              <th className="border-b-2 p-3 text-left text-sm text-gray-600">
                Progreso
              </th>
            </tr>
          </thead>
          <tbody>
            {regionesCaldas.map((reg, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="hover:bg-green-50"
              >
                <td className="p-3 text-sm text-gray-700">{reg.region}</td>
                <td className="p-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getColor(
                      reg.riesgo
                    )}`}
                  >
                    {reg.riesgo}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-700">{reg.porcentaje}%</td>
                <td className="p-3">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${
                        reg.porcentaje >= 60
                          ? "bg-red-500"
                          : reg.porcentaje >= 40
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${reg.porcentaje}%` }}
                    ></div>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default TablaRegiones;
