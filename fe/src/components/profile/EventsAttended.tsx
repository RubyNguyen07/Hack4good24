import moment from "moment";
import event1 from "../../assets/event1.png";
import event2 from "../../assets/event2.png";
import { Card } from "../ui/card";

type EventData = {
  title: string;
  date: string;
  img: string;
};

const events: EventData[] = [
  {
    title: "Workshop 1",
    date: "2023-07-01",
    img: event1,
  },
  {
    title: "Workshop 2",
    date: "2023-08-01",
    img: event2,
  },
  {
    title: "Workshop 3",
    date: "2023-09-01",
    img: event1,
  },
  {
    title: "Workshop 4",
    date: "2023-10-01",
    img: event2,
  },
  {
    title: "Workshop 5",
    date: "2023-11-01",
    img: event1,
  },
];

function EventsAttended() {
  return (
    <div className="flex">
      <div className="flex-1 py-20">
        <h2 className="text-6xl font-bold">Events Attended</h2>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        {events.map((event, index) => (
          <Card key={index} className="flex gap-2 h-32">
            <img src={event.img} alt={event.title} className="h-full" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-sm opacity-70">
                Attended on {moment(event.date).calendar()}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default EventsAttended;
