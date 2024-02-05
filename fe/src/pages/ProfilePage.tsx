import Hero from "@/components/Hero";
import Achievement from "@/components/profile/Achievement";
import EventsAttended from "@/components/profile/EventsAttended";
import Rewards from "@/components/profile/Rewards";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const { user } = useUser();
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
        <Rewards />
        <Achievement />
        <EventsAttended />
      </div>
    </div>
  );
}
