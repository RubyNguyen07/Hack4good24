import Hero from "@/components/Hero";
import EventDashboard from "@/components/admin/EventDashboard";
import ParticipantDashboard from "@/components/admin/ParticipantDashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function AdminDashboardPage() {
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
      <div className="px-8 md:px-16 py-10">
        <Tabs defaultValue="events">
          <TabsList className="">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
          </TabsList>
          <TabsContent value="events" className="px-2 py-6">
            <EventDashboard />
          </TabsContent>
          <TabsContent value="participants" className="px-2 py-6">
            <ParticipantDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
