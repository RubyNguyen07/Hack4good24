import moment from "moment";
import { Card } from "../ui/card";
import React from "react";
import supabase from "@/lib/supabaseClient";
import { useUser } from "@clerk/clerk-react";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RatingDisplay from "../RatingDisplay";

type EventData = {
  id: string;
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
        .select("campaigns(id, title, description, date, img)")
        .eq("volunteerId", user?.id);
      if (error) {
        console.error(error);
        return;
      }
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
          <EventDialog key={index} event={event} />
        ))}
      </ScrollArea>
    </div>
  );
}

type ReviewData = {
  review: string;
  created_at: string;
  img: string;
  rating: number;
};

function EventDialog({ event }: { event: EventData }) {
  const [review, setReview] = React.useState<ReviewData>();
  const { user } = useUser();

  React.useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("review, created_at, img, rating")
        .eq("campaignId", event.id)
        .eq("volunteerId", user?.id);
      if (error) {
        console.error(error);
        return;
      }
      console.log(data);
      setReview(data[0]);
    };
    fetchReviews();
  }, [event.title]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="flex gap-2 h-32 mb-4 cursor-pointer hover:shadow-md transition-all">
          <img
            src={event.img}
            alt={event.title}
            className="h-full aspect-square object-cover rounded-s-lg"
          />
          <div className="p-4 w-full">
            <div className="flex gap-2 items-center justify-between">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <Badge className="">
                {moment(event.date).format("DD/MM/YYYY")}
              </Badge>
            </div>
            <p className="text-sm line-clamp-2 mt-2">{event.description}</p>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="w-full max-w-lg sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="">
            Your review on '{event.title}' on{" "}
            {moment(event.date).format("DD MMM YYYY")}
          </DialogTitle>
          <DialogDescription className="flex gap-6 pt-4">
            <img
              src={review?.img}
              alt={event.title}
              className="h-72 aspect-square object-cover rounded-lg"
            />
            <div>
              <RatingDisplay rating={review?.rating || 0} />
              <p className="ml-1 mt-2 text-base">{review?.review}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default EventsAttended;
