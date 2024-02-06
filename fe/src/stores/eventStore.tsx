import { create } from "zustand";

type EventData = {
  id: string;
  title: string;
  description: string;
  date: Date;
  points: number;
  img: string;
  token: string;
};

type EventStore = {
  events: EventData[];
  setEvents: (events: EventData[]) => void;
  addEvent: (event: EventData) => void;
  removeEvent: (id: string) => void;
};

const useEventStore = create<EventStore>((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  removeEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),
}));

export default useEventStore;
