import { Card } from "@/components/ui/card";
import supabase from "@/lib/supabaseClient";
import { TriangleUpIcon } from "@radix-ui/react-icons";
import axios from "axios";
import React from "react";

type MaterialItem = {
  type: string;
  totalQuantity: number;
};

function OverallData() {
  const [participantCount, setParticipantCount] = React.useState(0);
  const [workshopCount, setWorkshopCount] = React.useState(0);
  const [materials, setMaterials] = React.useState<MaterialItem[]>([]);
  const [materialsLastMonth, setMaterialsLastMonth] = React.useState<
    MaterialItem[]
  >([]);
  const [participantsLastMonth, setParticipantsLastMonth] = React.useState(0);

  React.useEffect(() => {
    const participantPromise = supabase
      .from("volunteers")
      .select("*", { count: "exact", head: true });
    const workshopPromise = supabase
      .from("campaigns")
      .select("*", { count: "exact", head: true });

    Promise.all([participantPromise, workshopPromise]).then((values) => {
      // console.log(values);
      setParticipantCount(values[0].count || 0);
      setWorkshopCount(values[1].count || 0);
    });
  }, []);

  React.useEffect(() => {
    const fetchParticipantsLastMonth = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/statistics/totalVolunteers`
      );
      response.data.totalVoluteer &&
        setParticipantsLastMonth(response.data.totalVoluteer);
    };
    fetchParticipantsLastMonth();
  }, []);

  React.useEffect(() => {
    const fetchMaterials = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/statistics/totalAllMaterials`
      );
      setMaterials(response.data.statistics);
    };
    const fetchMaterialsLastMonth = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/statistics/totalMaterials`
      );
      setMaterialsLastMonth(
        response.data.totalMaterials.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (material: any) => ({
            type: material.material,
            totalQuantity: material.totalquantity,
          })
        )
      );
    };
    fetchMaterials();
    fetchMaterialsLastMonth();
  }, []);

  return (
    <div className="py-6 grid grid-cols-[1fr_1fr] gap-6">
      <div className="flex gap-6">
        <Card className="p-6 flex-1 flex flex-col items-center justify-center">
          <h3 className="text-lg mb-6">Participants Registered</h3>
          <div className="font-semibold text-6xl">{participantCount}</div>
          <div className="text-base mt-4">
            <TriangleUpIcon className="inline-block w-6 h-6 text-green-500" />
            <span className="opacity-70">
              {participantCount} since last month
            </span>
          </div>
        </Card>
        <Card className="p-6 flex-1 flex flex-col items-center justify-center">
          <h3 className="text-lg mb-6">Workshops Organized</h3>
          <div className="font-semibold text-6xl">{workshopCount}</div>
          <div className="text-base mt-4">
            <TriangleUpIcon className="inline-block w-6 h-6 text-green-500" />
            <span className="opacity-70">
              {participantsLastMonth} for last 5 months
            </span>
          </div>
        </Card>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {materials.map((material, index) => (
          <Card key={index} className="p-6 w-full">
            <h3 className="text-sm mb-1">{material.type}</h3>
            <div className="font-semibold text-2xl">
              {material.totalQuantity}kg
            </div>
            <div className="text-xs">
              <TriangleUpIcon className="inline-block w-4 h-4 text-green-500" />
              <span className="opacity-70">
                {materialsLastMonth.find((m) => m.type === material.type)
                  ?.totalQuantity || 0}
                kg since last month
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default OverallData;
