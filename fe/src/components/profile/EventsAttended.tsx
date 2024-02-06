import moment from "moment";
import { Card } from "../ui/card";
import React from "react";
import supabase from "@/lib/supabaseClient";
import { useUser } from "@clerk/clerk-react";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";

type EventData = {
  title: string;
  description: string;
  date: string;
  img: string;
};

function EventsAttended() {
  const { user } = useUser();
  const [events, setEvents] = React.useState<EventData[]>([]);

  React.useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("campaigns(title, description, date, img)")
        .eq("volunteerId", user?.id);
      if (error) {
        console.error(error);
        return;
      }
      console.log(data);
      setEvents(data.map((event) => event.campaigns as unknown as EventData));
    };
    fetchEvents();
  }, []);

  return (
    <div className="flex">
      <div className="flex-1 py-20">
        <h2 className="text-5xl font-bold">Events Attended</h2>
      </div>
      <ScrollArea className="flex-1 h-96">
        {events.map((event, index) => (
          <Card key={index} className="flex gap-2 h-32 mb-4">
            <img src={event.img} alt={event.title} className="h-full" />
            <div className="p-4 w-full">
              <div className="flex gap-2 items-center justify-between">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <Badge className="">{moment(event.date).calendar()}</Badge>
              </div>
              <p className="text-sm line-clamp-2 mt-2">{event.description}</p>
            </div>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
}

export default EventsAttended;
