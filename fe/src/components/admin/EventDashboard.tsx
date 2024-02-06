import moment from "moment";
import { Card } from "../ui/card";
import EventTable, { EventData } from "./EventTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import EventForm, { eventFormSchema } from "./EventForm";
import { z } from "zod";
import React from "react";
import supabase, { supabaseClient, uploadImage } from "@/lib/supabaseClient";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";

function EventDashboard() {
  const [events, setEvents] = React.useState<EventData[]>([]);
  const { getToken } = useAuth();

  React.useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("campaigns")
        .select("id, title, description, img, date, points, token")
        .order("date", { ascending: true });
      if (error) {
        console.error(error);
        return;
      }
      console.log(data);
      setEvents(data as EventData[]);
    };
    fetchEvents();
  }, []);

  const onEventCreate = async (values: z.infer<typeof eventFormSchema>) => {
    const token = (await getToken({ template: "supabase" })) || "";

    const supabase = await supabaseClient(token);

    console.log(values);
    if (values.img.length === 0) {
      toast.error("Please upload an image");
      return;
    }
    const { data: uploadData, error: uploadError } = await uploadImage(
      values.img[0],
      "images",
      `event/${Math.floor(Math.random() * 1000)}-${values.img[0].name}`
    );
    if (uploadError || !uploadData) {
      console.error(uploadError);
      return;
    }
    const { error } = await supabase.from("campaigns").insert({
      title: values.title,
      description: values.description,
      img: `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/images/${uploadData?.path}`,
      date: values.date,
      points: values.points,
    });
    if (error) {
      console.error(error);
      return;
    }
    window.location.reload();
    toast.success("Event created successfully");
  };

  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold">Upcoming Events</h2>
        <div className="py-4 space-x-6 whitespace-nowrap w-full overflow-x-scroll">
          {events
            .filter((ev) => moment().isBefore(moment(ev.date)))
            .map((event, index) => (
              <Card key={index} className="w-72 inline-block align-top h-96">
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-xs opacity-70">On {event.date}</p>
                  <p className="text-sm mt-2 whitespace-normal line-clamp-6">
                    {event.description}
                  </p>
                </div>
              </Card>
            ))}
        </div>
        <div className="py-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">All Events</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button aria-label="Create Event" size={"sm"}>
                  <PlusIcon className={"h-4 w-4 mr-2"} /> Create Event
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-lg sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
                <DialogHeader>
                  <DialogTitle>Create a new event</DialogTitle>
                </DialogHeader>
                <EventForm editMode={true} onSubmit={onEventCreate} />
              </DialogContent>
            </Dialog>
          </div>
          <EventTable events={events} />
        </div>
      </div>
    </div>
  );
}

export default EventDashboard;
