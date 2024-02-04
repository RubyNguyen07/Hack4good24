import moment from "moment";
import React from "react";
import { Chart } from "react-charts";

type MaterialSavedData = {
  date: Date;
  amount: number;
};

function MaterialSavedChart() {
  const data = [
    {
      label: "Plastic",
      data: [
        { date: new Date(2023, 7, 1), amount: 16 },
        { date: new Date(2023, 8, 1), amount: 24 },
        { date: new Date(2023, 9, 1), amount: 20 },
        { date: new Date(2023, 10, 1), amount: 21 },
        { date: new Date(2023, 11, 1), amount: 24 },
        { date: new Date(2024, 0, 1), amount: 27 },
      ] as MaterialSavedData[],
    },
    {
      label: "Paper",
      data: [
        { date: new Date(2023, 7, 1), amount: 8 },
        { date: new Date(2023, 8, 1), amount: 10 },
        { date: new Date(2023, 9, 1), amount: 12 },
        { date: new Date(2023, 10, 1), amount: 11 },
        { date: new Date(2023, 11, 1), amount: 15 },
        { date: new Date(2024, 0, 1), amount: 14 },
      ] as MaterialSavedData[],
    },
    {
      label: "Glass",
      data: [
        { date: new Date(2023, 7, 1), amount: 16 },
        { date: new Date(2023, 8, 1), amount: 18 },
        { date: new Date(2023, 9, 1), amount: 15 },
        { date: new Date(2023, 10, 1), amount: 16 },
        { date: new Date(2023, 11, 1), amount: 20 },
        { date: new Date(2024, 0, 1), amount: 19 },
      ] as MaterialSavedData[],
    },
    {
      label: "Metal",
      data: [
        { date: new Date(2023, 7, 1), amount: 12 },
        { date: new Date(2023, 8, 1), amount: 24 },
        { date: new Date(2023, 9, 1), amount: 20 },
        { date: new Date(2023, 10, 1), amount: 21 },
        { date: new Date(2023, 11, 1), amount: 18 },
        { date: new Date(2024, 0, 1), amount: 18 },
      ] as MaterialSavedData[],
    },
  ];

  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum: MaterialSavedData) =>
        moment(datum.date).format("MMM YYYY"),
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum: MaterialSavedData) => datum.amount,
        stacked: true,
      },
    ],
    []
  );

  return (
    <div className="py-6">
      <h2 className="text-xl font-semibold mb-2">Material Recycled</h2>
      <div className="h-72">
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </div>
    </div>
  );
}

export default MaterialSavedChart;
