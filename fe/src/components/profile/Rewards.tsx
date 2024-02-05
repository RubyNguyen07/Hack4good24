import React from "react";
import reward1 from "@/assets/reward1.png";
import reward2 from "@/assets/reward2.png";
import { Card, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

type RewardData = {
  title: string;
  img: string;
  points: number;
};

const currentPoints = 800;

const rewards: RewardData[] = [
  {
    title: "Sketchbook",
    img: reward1,
    points: 600,
  },
  {
    title: "Bouquet Lego",
    img: reward2,
    points: 1000,
  },
];

function Rewards() {
  return (
    <div className="flex">
      <div className="flex-1 py-20">
        <h2 className="text-6xl font-bold">Rewards</h2>
        <p className="text-xl text-gray-500">
          Current Point Balance: {currentPoints} points
        </p>
      </div>
      <div className="flex gap-4 flex-1">
        {rewards.map((reward, index) => (
          <Card key={index} className="w-64">
            <img src={reward.img} alt={reward.title} className="w-full" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{reward.title}</h3>
              <p className="text-sm opacity-70">{reward.points} points</p>
            </div>
            <CardFooter>
              <Button
                disabled={currentPoints < reward.points}
                className="w-full"
              >
                Redeem
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Rewards;
