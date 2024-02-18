import { cn } from "@/lib/utils";
import achievementImg from "../../assets/achieve.png";
import { Card } from "../ui/card";

type AchievementData = {
  title: string;
  img: string;
  points: number;
};

const achievements: AchievementData[] = [
  {
    title: "Attend 1 workshop",
    img: achievementImg,
    points: 200,
  },
  {
    title: "Registered 5 workshop",
    img: achievementImg,
    points: 1000,
  },
];

function Achievement({ points }: { points: number }) {
  return (
    <div className="flex items-center">
      <div className="flex-1 py-20">
        <h2 className="text-5xl font-bold">Achievements</h2>
      </div>
      <div className="flex gap-4 flex-1">
        {achievements.map((achievement, index) => (
          <Card
            key={index}
            className={cn("w-64", points < achievement.points && "opacity-70")}
          >
            <img
              src={achievement.img}
              alt={achievement.title}
              className="w-full rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{achievement.title}</h3>
              <p className="text-sm opacity-70">{achievement.points} points</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Achievement;
