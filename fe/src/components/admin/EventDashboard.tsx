import moment from "moment";
import event from "../../assets/event.png";
import { Card } from "../ui/card";
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
import { ArrowUpDown, EyeIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { Label } from "../ui/label";

type EventData = {
  title: string;
  description: string;
  date: string;
  img: string;
  points: number;
};

const events: EventData[] = [
  {
    title: "Workshop 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    date: "2023-07-01",
    img: event,
    points: 200,
  },
  {
    title: "Workshop 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    date: "2023-08-01",
    img: event,
    points: 200,
  },
  {
    title: "Workshop 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    date: "2023-09-01",
    img: event,
    points: 200,
  },
  {
    title: "Workshop 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    date: "2023-10-01",
    img: event,
    points: 200,
  },
  {
    title: "Workshop 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    date: "2023-11-01",
    img: event,
    points: 200,
  },
];

const today = moment("2023-08-20");

function EventDashboard() {
  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold">Upcoming Events</h2>
        <div className="flex gap-6 py-4">
          {events
            .filter((ev) => today.isBefore(moment(ev.date)))
            .map((event, index) => (
              <Card key={index} className="w-72">
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-xs opacity-70">On {event.date}</p>
                  <p className="text-sm mt-2">{event.description}</p>
                </div>
              </Card>
            ))}
        </div>
        <div className="py-4">
          <h2 className="text-3xl font-bold mb-4">All Events</h2>
          <EventTable />
        </div>
      </div>
    </div>
  );
}

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
    cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
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
    cell: ({ row }) => <div className="lowercase">{row.getValue("date")}</div>,
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
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("points")}</div>
    ),
  },
  {
    id: "view",
    enableHiding: false,
    cell: ({ row }) => {
      const currEvent = row.original;

      return (
        <Button
          variant={"ghost"}
          onClick={() => console.log("View", currEvent)}
          aria-label="View Event"
        >
          <EyeIcon className={"h-4 w-4"}></EyeIcon>
        </Button>
      );
    },
  },
  {
    id: "delete",
    enableHiding: false,
    cell: ({ row }) => {
      const currEvent = row.original;

      return (
        <Button
          variant={"ghost"}
          onClick={() => console.log("Delete", currEvent)}
          aria-label="Delete Event"
        >
          <Trash2Icon className={"h-4 w-4 text-red-500"}></Trash2Icon>
        </Button>
      );
    },
  },
];

function EventTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [viewDialogOpen, setViewDialogOpen] = React.useState(false);

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
                    <TableCell key={cell.id}>
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
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EventDashboard;
