import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { PopoverContent } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventData } from "./EventTable";
import { Input } from "../ui/input";
import moment from "moment";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { DialogFooter } from "../ui/dialog";

export const eventFormSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.date(),
  img: z.instanceof(FileList),
  points: z.coerce.number().positive(),
});

function EventForm({
  event,
  editMode,
  setEditMode,
  onSubmit,
}: {
  event?: EventData;
  editMode: boolean;
  setEditMode?: (editMode: boolean) => void;
  onSubmit: (data: z.infer<typeof eventFormSchema>) => void;
}) {
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      date: event ? moment(event.date).toDate() : new Date(),
      points: event?.points || 200,
    },
  });
  const imgRef = form.register("img");

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            disabled={!editMode}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input placeholder="Workshop 1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            disabled={!editMode}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Lorem Ipsum Dolor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            disabled={!editMode}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block">Event Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          disabled={!editMode}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="img"
            disabled={!editMode}
            render={() => (
              <FormItem>
                <FormLabel>Event Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    {...imgRef}
                    accept="image/*"
                    disabled={!editMode}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="points"
            disabled={!editMode}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Points</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="200" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className={cn(editMode ? "" : "hidden")}>
            <>
              <Button type="submit">Save changes</Button>
              {setEditMode && (
                <Button
                  variant="outline"
                  onClick={() => setEditMode && setEditMode(false)}
                >
                  Cancel
                </Button>
              )}
            </>
          </DialogFooter>
        </form>
      </Form>
      <DialogFooter className={cn(editMode ? "hidden" : "")}>
        <Button onClick={() => setEditMode && setEditMode(true)}>Edit</Button>
      </DialogFooter>
    </>
  );
}

export default EventForm;
