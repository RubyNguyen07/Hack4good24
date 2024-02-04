import Hero from "@/components/Hero";
import MaterialSavedChart from "@/components/landing/MaterialSavedChart";
import OverallData from "@/components/landing/OverallData";
import PastWorkshops from "@/components/landing/PastWorkshops";
import VolunteerRegistration from "@/components/landing/VolunteerRegistration";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function LandingPage() {
  const { user } = useUser();

  return (
    <div>
      <Hero
        title="Welcome!"
        subtitle="Volunteer with us, make the world greener and earn rewards!!"
      >
        <SignedIn>
          <Button asChild className="mr-4">
            <Link to="/profile">Profile</Link>
          </Button>
          {user?.publicMetadata.role === "admin" && (
            <Button asChild>
              <Link to="/manage">Admin Dashboard</Link>
            </Button>
          )}
        </SignedIn>
        <SignedOut>
          <Button asChild className="mr-4">
            <Link to="/sign-up">Sign Up</Link>
          </Button>
          <Button asChild>
            <Link to="/sign-in">Sign In</Link>
          </Button>
        </SignedOut>
      </Hero>
      <div className="px-8 md:px-16 py-10">
        <h2 className="text-3xl font-bold text-center">Overall Statistics</h2>
        <OverallData />
        <VolunteerRegistration />
        <MaterialSavedChart />
        <PastWorkshops />
      </div>
    </div>
  );
}

export default LandingPage;
