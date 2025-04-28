import { useState } from "react";
import data from "../data/largo.json"; // Asegúrate de ajustar tu path
import { MunicipiosPacientesChart } from "./charts/MunicipiosPacientesChart";
import { MunicipiosRiesgoChart } from "./charts/MunicipiosRiesgoChart";
import { MunicipiosTopFactoresRadar } from "./charts/MunicipiosTopFactoresRadar";
import { Select } from "@chakra-ui/react";

export const MunicipiosDashboard = () => {
  const [departamento, setDepartamento] = useState("Caldas");

  // Filtrar municipios por departamento seleccionado
  const municipiosFiltrados = data.municipios.filter(
    (m) => m.departamento.toLowerCase() === departamento.toLowerCase()
  );

  return (
    <div className="space-y-8">
      {/* Selector de departamento */}
      <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col md:flex-row md:items-center justify-between">
        <h2 className="text-2xl font-bold mb-4 md:mb-0 text-gray-700">
          Dashboard Cardiovascular
        </h2>
        <Select
          value={departamento}
          onChange={(e) => setDepartamento(e.target.value)}
          width="full"
          maxW="300px"
          colorScheme="teal"
          rounded="full"
          variant="outline"
          bg="gray.50"
          _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal" }}
        >
          <option value="Caldas">Caldas</option>
          <option value="Risaralda">Risaralda</option>
          <option value="Quindio">Quindío</option>
          <option value="Antioquia">Antioquia</option>
        </Select>
      </div>

      {/* Pacientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Pacientes por Municipio ({departamento})
          </h2>
          <MunicipiosPacientesChart data={municipiosFiltrados} />
        </div>

        {/* Promedio de Riesgo */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Promedio de Riesgo por Municipio ({departamento})
          </h2>
          <MunicipiosRiesgoChart data={municipiosFiltrados} />
        </div>
      </div>

      {/* Top Factores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {municipiosFiltrados.map((municipio, idx) => (
          <div key={idx} className="bg-white rounded-3xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">
              {municipio.municipio}
            </h3>
            <MunicipiosTopFactoresRadar data={municipio} />
          </div>
        ))}
      </div>
    </div>
  );
};
