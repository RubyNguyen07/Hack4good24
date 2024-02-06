import React from "react";
import { Card } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { PenTool } from "lucide-react";
import supabase from "@/lib/supabaseClient";
import moment from "moment";

type WorkshopData = {
  id: string;
  title: string;
  img: string;
  date: string;
  description: string;
};

type ReviewData = {
  campaignId: string;
  rating: number;
  review: string;
};
//   {
//     title: "Workshop 1",
//     img: "https://via.placeholder.com/150",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
//     testimonials: [
//       {
//         rating: 5,
//         text: "I love it",
//       },
//       {
//         rating: 4,
//         text: "Lorem ipsum dolor",
//       },
//       {
//         rating: 3,
//         text: "cogito, ergo sum",
//       },
//     ],
//   },
//   {
//     title: "Workshop 2",
//     img: "https://via.placeholder.com/150",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     testimonials: [
//       {
//         rating: 5,
//         text: "I love it",
//       },
//       {
//         rating: 4,
//         text: "Lorem ipsum dolor",
//       },
//       {
//         rating: 3,
//         text: "cogito, ergo sum",
//       },
//     ],
//   },
//   {
//     title: "Workshop 3",
//     img: "https://via.placeholder.com/150",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     testimonials: [
//       {
//         rating: 5,
//         text: "I love it",
//       },
//       {
//         rating: 4,
//         text: "Lorem ipsum dolor",
//       },
//       {
//         rating: 3,
//         text: "cogito, ergo sum",
//       },
//     ],
//   },
//   {
//     title: "Workshop 4",
//     img: "https://via.placeholder.com/150",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     testimonials: [
//       {
//         rating: 5,
//         text: "I love it",
//       },
//       {
//         rating: 4,
//         text: "Lorem ipsum dolor",
//       },
//       {
//         rating: 3,
//         text: "cogito, ergo sum",
//       },
//     ],
//   },
//   {
//     title: "Workshop 5",
//     img: "https://via.placeholder.com/150",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     testimonials: [
//       {
//         rating: 5,
//         text: "I love it",
//       },
//       {
//         rating: 4,
//         text: "Lorem ipsum dolor",
//       },
//       {
//         rating: 3,
//         text: "cogito, ergo sum",
//       },
//     ],
//   },
// ];

function PastWorkshops() {
  const [pastEvents, setPastEvents] = React.useState<WorkshopData[]>([]);
  const [reviews, setReviews] = React.useState<ReviewData[]>([]);

  React.useEffect(() => {
    const fetchPastEvents = async () => {
      const { data, error } = await supabase
        .from("campaigns")
        .select("id, title, description, img, date")
        .lte("date", moment().format("YYYY-MM-DD"));
      if (error) {
        console.error(error);
        return;
      }
      // console.log(data);
      setPastEvents(data as WorkshopData[]);
    };
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("campaignId, rating, review");
      if (error) {
        console.error(error);
        return;
      }
      // console.log(data);
      setReviews(data as ReviewData[]);
    };
    fetchPastEvents();
    fetchReviews();
  }, []);

  return (
    <div className="flex flex-col items-center py-6">
      <h2 className="text-3xl font-bold">Past Campaigns</h2>
      <Carousel className="max-w-4xl mt-6">
        <CarouselContent>
          {pastEvents.map((workshop, index) => (
            <CarouselItem key={index} className="">
              <Card className="p-4 flex gap-4">
                <div className="w-64 h-64">
                  <img
                    src={workshop.img}
                    alt={workshop.title}
                    className="rounded-md object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{workshop.title}</h3>
                  <p className=" line-clamp-3">{workshop.description}</p>
                  <div className="grid grid-flow-col grid-rows-2 gap-2 mt-4">
                    {reviews
                      .filter((r) => r.campaignId === workshop.id)
                      .map((review, index) => (
                        <Card
                          key={index}
                          className="p-3 flex-1 flex justify-between"
                        >
                          <div className="text-sm text-ellipsis flex gap-2 items-center">
                            <PenTool className="w-4 h-4" />
                            {review.review}
                          </div>
                          <div className="flex items-center text-sm">
                            <StarFilledIcon className="w-4 h-4 text-yellow-500 mx-1" />
                            {review.rating}
                          </div>
                        </Card>
                      ))}
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default PastWorkshops;
