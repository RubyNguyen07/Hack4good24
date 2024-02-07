import React from "react";
import { AxisOptions, Chart } from "react-charts";
import axios from "axios";

type EventStatData = {
  event: string;
  totalparticipants: number;
};

function VolunteerRegistration() {
  const [eventStat, setEventStat] = React.useState<EventStatData[]>([]);

  const eventData = [
    {
      label: "Participants",
      data: eventStat.map(
        (stat) =>
          ({
            event: stat.event,
            totalparticipants: stat.totalparticipants,
          } as EventStatData)
      ),
    },
  ];

  const eventPrimaryAxis = React.useMemo(
    (): AxisOptions<EventStatData> => ({
      getValue: (datum) => datum.event,
    }),
    []
  );

  const eventSecondaryAxes = React.useMemo(
    (): AxisOptions<EventStatData>[] => [
      {
        getValue: (datum) => datum.totalparticipants,
      },
    ],
    []
  );

  React.useEffect(() => {
    const fetchStatistics = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/statistics/totalEventParticipant`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      response.data.totalEventParticipant &&
        setEventStat(response.data.totalEventParticipant);
    };
    fetchStatistics();
  }, []);

  return (
    <div className="py-6">
      <h2 className="text-xl font-semibold mb-2">Participants Registration</h2>
      <div className="h-72">
        {eventStat.length > 0 && (
          <Chart
            options={{
              data: eventData,
              primaryAxis: eventPrimaryAxis,
              secondaryAxes: eventSecondaryAxes,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default VolunteerRegistration;
