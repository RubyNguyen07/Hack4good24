import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function CampaignMgmtPage() {
  const { user } = useUser();

  return (
    <div>
      <Hero
        title="Manage Events"
        subtitle={`Hi, ${user?.firstName}. Welcome to Event Management Page!`}
      >
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </Hero>
    </div>
  );
}

export default CampaignMgmtPage;
