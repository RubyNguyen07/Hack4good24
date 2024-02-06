import axios from "axios";
import React from "react";
import { AxisOptions, Chart } from "react-charts";

type MaterialSavedResponse = MaterialSavedData & {
  type: string;
};

type MaterialSavedData = {
  event: string;
  totalquantity: number;
};

function MaterialSavedChart() {
  const [materialData, setMaterialData] = React.useState<
    MaterialSavedResponse[]
  >([]);

  const data = React.useMemo(
    () => processData(materialData),
    [materialData.length]
  );

  React.useEffect(() => {
    const fetchStatistics = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/statistics/eventMaterial`
      );
      console.log(response.data);
      response.data.totalMaterials &&
        setMaterialData(response.data.totalMaterials);
    };
    fetchStatistics();
  }, []);

  const primaryAxis = React.useMemo(
    (): AxisOptions<MaterialSavedData> => ({
      getValue: (datum: MaterialSavedData) => datum.event,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<MaterialSavedData>[] => [
      {
        getValue: (datum: MaterialSavedData) => datum.totalquantity,
        stacked: true,
      },
    ],
    []
  );

  return (
    <div className="py-6">
      <h2 className="text-xl font-semibold mb-2">Material Recycled</h2>
      <div className="h-72">
        {data.length > 0 && (
          <Chart
            options={{
              data,
              primaryAxis,
              secondaryAxes,
            }}
          />
        )}
      </div>
    </div>
  );
}

function processData(materials: MaterialSavedResponse[]) {
  const allLabels = [...new Set(materials.map((material) => material.type))];
  const allEvents = new Set(materials.map((material) => material.event));

  const data = allLabels.map((label) => {
    const materialData = materials.filter(
      (material) => material.type === label
    );
    return {
      label,
      data: materialData.map((material) => ({
        event: material.event,
        totalquantity: material.totalquantity,
      })),
    };
  });

  for (const material of data) {
    const events = new Set(material.data.map((data) => data.event));
    for (const event of allEvents) {
      if (!events.has(event)) {
        material.data.push({ event, totalquantity: 0 });
      }
    }
    material.data.sort((a, b) => {
      if (a.event > b.event) return 1;
      if (a.event < b.event) return -1;
      return 0;
    });
  }

  return data;
}

export default MaterialSavedChart;
