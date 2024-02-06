import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  QrCodeIcon,
  Trash2Icon,
  TreesIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { z } from "zod";
import EventForm, { eventFormSchema } from "./EventForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import supabase, { uploadImage } from "@/lib/supabaseClient";
import { toast } from "sonner";

export type EventData = {
  id: string;
  title: string;
  description: string;
  date: string;
  img: string;
  points: number;
  token: string;
};

const columns: ColumnDef<EventData>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "points",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Points
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("points")}</div>,
  },
  {
    id: "attendance",
    enableHiding: false,
    cell: ({ row }) => {
      const currEvent = row.original;

      return <AttendanceQRDialog event={currEvent} />;
    },
  },
  {
    id: "resource-saved",
    enableHiding: false,
    cell: ({ row }) => {
      const currEvent = row.original;

      return <ResourceSavedDialog event={currEvent} />;
    },
  },
  {
    id: "view",
    enableHiding: false,
    cell: ({ row }) => {
      const currEvent = row.original;

      return <ViewEventDialog event={currEvent} />;
    },
  },
  {
    id: "delete",
    enableHiding: false,
    cell: ({ row }) => {
      const currEvent = row.original;

      return <DeleteEventDialog event={currEvent} />;
    },
  },
];

function EventTable({ events }: { events: EventData[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: events,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="normal-case">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function AttendanceQRDialog({ event }: { event: EventData }) {
  const attendanceLink = `${window.location.origin}/review/${event.token}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} aria-label="View Attendance">
          <QrCodeIcon className={"h-4 w-4"}></QrCodeIcon>
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Attendance QR Code</DialogTitle>
          <DialogDescription>
            Please scan this QR code to register your attendance and leave a
            short review about the event.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-6 gap-4 underline">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${attendanceLink}`}
            alt="Attendance QR"
          />
          <a href={attendanceLink}>{attendanceLink}</a>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(`https://example.com`);
            }}
          >
            Copy Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const resourceSavedSchema = z.object({
  plastic: z.coerce.number().nonnegative(),
  paper: z.coerce.number().nonnegative(),
  glass: z.coerce.number().nonnegative(),
  metal: z.coerce.number().nonnegative(),
});

function ResourceSavedDialog({ event }: { event: EventData }) {
  React.useEffect(() => {
    const fetchResourceSaved = async () => {
      const { data, error } = await supabase
        .from("outputs")
        .select("type, quantity")
        .eq("campaign", event.id);
      if (error) {
        console.error(error);
        return;
      }
      const plastic = data.find((item) => item.type === "plastic")?.quantity;
      const paper = data.find((item) => item.type === "paper")?.quantity;
      const glass = data.find((item) => item.type === "glass")?.quantity;
      const metal = data.find((item) => item.type === "metal")?.quantity;
      plastic && form.setValue("plastic", plastic);
      paper && form.setValue("paper", paper);
      glass && form.setValue("glass", glass);
      metal && form.setValue("metal", metal);
    };
    fetchResourceSaved();
  }, []);

  const form = useForm<z.infer<typeof resourceSavedSchema>>({
    resolver: zodResolver(resourceSavedSchema),
    defaultValues: {
      plastic: 0,
      paper: 0,
      glass: 0,
      metal: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof resourceSavedSchema>) {
    const insertedPlastic = {
      campaign: event.id,
      type: "plastic",
      quantity: values.plastic,
    };
    const insertedPaper = {
      campaign: event.id,
      type: "paper",
      quantity: values.paper,
    };
    const insertedGlass = {
      campaign: event.id,
      type: "glass",
      quantity: values.glass,
    };
    const insertedMetal = {
      campaign: event.id,
      type: "metal",
      quantity: values.metal,
    };
    // check if plastic, paper, glass, metal is already in the database
    const { data: plasticData, error: plasticError } = await supabase
      .from("outputs")
      .select("type, quantity")
      .eq("campaign", event.id)
      .eq("type", "plastic");

    const { data: paperData, error: paperError } = await supabase
      .from("outputs")
      .select("type, quantity")
      .eq("campaign", event.id)
      .eq("type", "paper");

    const { data: glassData, error: glassError } = await supabase
      .from("outputs")
      .select("type, quantity")
      .eq("campaign", event.id)
      .eq("type", "glass");

    const { data: metalData, error: metalError } = await supabase
      .from("outputs")
      .select("type, quantity")
      .eq("campaign", event.id)
      .eq("type", "metal");

    if (plasticError || paperError || glassError || metalError) {
      console.error(plasticError, paperError, glassError, metalError);
      return;
    }

    if (plasticData.length > 0) {
      const { error } = await supabase
        .from("outputs")
        .update({ quantity: values.plastic })
        .eq("campaign", event.id)
        .eq("type", "plastic");
      if (error) {
        console.error(error);
        return;
      }
    } else {
      const { error } = await supabase.from("outputs").insert(insertedPlastic);
      if (error) {
        console.error(error);
        return;
      }
    }

    if (paperData.length > 0) {
      const { error } = await supabase
        .from("outputs")
        .update({ quantity: values.paper })
        .eq("campaign", event.id)
        .eq("type", "paper");
      if (error) {
        console.error(error);
        return;
      }
    } else {
      const { error } = await supabase.from("outputs").insert(insertedPaper);
      if (error) {
        console.error(error);
        return;
      }
    }

    if (glassData.length > 0) {
      const { error } = await supabase
        .from("outputs")
        .update({ quantity: values.glass })
        .eq("campaign", event.id)
        .eq("type", "glass");
      if (error) {
        console.error(error);
        return;
      }
    } else {
      const { error } = await supabase.from("outputs").insert(insertedGlass);
      if (error) {
        console.error(error);
        return;
      }
    }

    if (metalData.length > 0) {
      const { error } = await supabase
        .from("outputs")
        .update({ quantity: values.metal })
        .eq("campaign", event.id)
        .eq("type", "metal");
      if (error) {
        console.error(error);
        return;
      }
    } else {
      const { error } = await supabase.from("outputs").insert(insertedMetal);
      if (error) {
        console.error(error);
        return;
      }
    }
    toast.success("Resource saved updated successfully");
    window.location.reload();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"} aria-label="Update impact">
          <TreesIcon className={"h-4 w-4"}></TreesIcon>
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Update event impact</DialogTitle>
          <DialogDescription>
            Please update the amount of resources saved by '{event.title}'
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="plastic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plastic</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="50" {...field} />
                  </FormControl>
                  <FormDescription>
                    Amount of plastic saved in kilograms
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paper"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paper</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="50" {...field} />
                  </FormControl>
                  <FormDescription>
                    Amount of paper saved in kilograms
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="glass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Glass</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="50" {...field} />
                  </FormControl>
                  <FormDescription>
                    Amount of glass saved in kilograms
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="metal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Metal saved</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="50" {...field} />
                  </FormControl>
                  <FormDescription>
                    Amount of metal saved in kilograms
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function ViewEventDialog({ event }: { event: EventData }) {
  const [editMode, setEditMode] = React.useState(false);

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let img = "";

    if (values.img.length > 0) {
      const { data: uploadData, error: uploadError } = await uploadImage(
        values.img[0],
        "images",
        `event/${Math.floor(Math.random() * 1000)}-${values.img[0].name}`
      );
      if (uploadError || !uploadData) {
        console.error(uploadError);
        return;
      }
      img = `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/images/${uploadData?.path}`;
    }

    const { data } = await supabase
      .from("campaigns")
      .select()
      .eq("id", event.id);
    console.log(data);
    console.log(values);

    const { error } = await supabase
      .from("campaigns")
      .update({
        title: values.title,
        description: values.description,
        img: img ? img : event.img,
        date: values.date,
        points: values.points,
      })
      .eq("id", event.id);

    if (error) {
      console.error(error);
      return;
    }

    toast.success("Event updated successfully");
    window.location.reload();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} aria-label="View Event">
          <EyeIcon className={"h-4 w-4"}></EyeIcon>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-lg sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <EventForm
          event={event}
          editMode={editMode}
          setEditMode={setEditMode}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}

function DeleteEventDialog({ event }: { event: EventData }) {
  const onDelete = () => {
    console.log("Deleting event", event);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} aria-label="Delete Event">
          <Trash2Icon className={"h-4 w-4 text-red-500"}></Trash2Icon>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            event {event.title}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={onDelete}>Delete</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default EventTable;
