import Hero from "@/components/Hero";
import Achievement from "@/components/profile/Achievement";
import EventsAttended from "@/components/profile/EventsAttended";
import Rewards from "@/components/profile/Rewards";
import { Button } from "@/components/ui/button";
import supabase from "@/lib/supabaseClient";
import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const { user } = useUser();
  const [points, setPoints] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchPoints = async () => {
      const { data, error } = await supabase
        .from("volunteers")
        .select("exp")
        .eq("id", user?.id);
      if (error) {
        console.error(error);
        return;
      }
      setPoints(data[0].exp);
    };
    user?.id && fetchPoints();
  }, []);

  return (
    <div>
      <Hero
        title="Profile"
        subtitle={`Hi, ${user?.firstName}. Welcome to your profile page!`}
      >
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </Hero>
      <div className="px-8 md:px-16 py-10 space-y-10">
        <Rewards points={points} />
        <Achievement points={points} />
        <EventsAttended />
      </div>
    </div>
  );
}
