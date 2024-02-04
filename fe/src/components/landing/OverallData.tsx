import { Card } from "@/components/ui/card";
import { TriangleUpIcon } from "@radix-ui/react-icons";

type MaterialItem = {
  title: string;
  amount: number;
  monthlyIncrease?: number;
  unit: string;
};

const materials: MaterialItem[] = [
  { title: "Plastic Saved", amount: 630, monthlyIncrease: 80, unit: "kg" },
  { title: "Paper Saved", amount: 340, monthlyIncrease: 42, unit: "kg" },
  { title: "Glass Saved", amount: 650, monthlyIncrease: 74, unit: "kg" },
  { title: "Metal Saved", amount: 570, monthlyIncrease: 68, unit: "kg" },
];

function OverallData() {
  return (
    <div className="py-6 grid grid-cols-[1fr_1fr] gap-6">
      <div className="flex gap-6">
        <Card className="p-6 flex-1 flex flex-col items-center justify-center">
          <h3 className="text-lg mb-6">Participants Registered</h3>
          <div className="font-semibold text-6xl">350</div>
          <div className="text-base mt-4">
            <TriangleUpIcon className="inline-block w-6 h-6 text-green-500" />
            <span className="opacity-70">38 since last month</span>
          </div>
        </Card>
        <Card className="p-6 flex-1 flex flex-col items-center justify-center">
          <h3 className="text-lg mb-6">Workshops Organized</h3>
          <div className="font-semibold text-6xl">48</div>
          <div className="text-base mt-4">
            <TriangleUpIcon className="inline-block w-6 h-6 text-green-500" />
            <span className="opacity-70">4 since last month</span>
          </div>
        </Card>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {materials.map((material, index) => (
          <Card key={index} className="p-6 w-full">
            <h3 className="text-sm mb-1">{material.title}</h3>
            <div className="font-semibold text-2xl">
              {material.amount}
              {material.unit}
            </div>
            <div className="text-xs opacity-60">
              +{material.monthlyIncrease}
              {material.unit} since last month
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default OverallData;
