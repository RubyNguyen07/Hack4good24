import moment from "moment";
import React from "react";
import { AxisOptions, Chart } from "react-charts";

type VolunteerData = {
  date: Date;
  amount: number;
};

function VolunteerRegistration() {
  const data = [
    {
      label: "Participants",
      data: [
        {
          date: new Date(2023, 7, 1),
          amount: 58,
        },
        {
          date: new Date(2023, 8, 1),
          amount: 49,
        },
        {
          date: new Date(2023, 9, 1),
          amount: 61,
        },
        {
          date: new Date(2023, 10, 1),
          amount: 73,
        },
        {
          date: new Date(2023, 11, 1),
          amount: 75,
        },
        {
          date: new Date(2024, 0, 1),
          amount: 88,
        },
      ] as VolunteerData[],
    },
  ];

  const primaryAxis = React.useMemo(
    (): AxisOptions<VolunteerData> => ({
      getValue: (datum) => moment(datum.date).format("MMM YYYY"),
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<VolunteerData>[] => [
      {
        getValue: (datum) => datum.amount,
        elementType: "line",
      },
    ],
    []
  );

  return (
    <div className="py-6">
      <h2 className="text-xl font-semibold mb-2">Participants Registration</h2>
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

export default VolunteerRegistration;
