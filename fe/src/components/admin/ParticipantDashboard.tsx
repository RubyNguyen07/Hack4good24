import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import supabase from "@/lib/supabaseClient";
import { Card } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import RatingDisplay from "../RatingDisplay";

type ReviewData = {
  campaignId: string;
  campaigns: { title: string };
  review: string;
  created_at: string;
  img: string;
  rating: number;
  volunteerId: string;
};

function ParticipantDashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reviews, setReviews] = React.useState<ReviewData[]>([]);

  const campaignTitles = [
    ...new Set(reviews.map((review) => review.campaigns.title)),
  ];

  React.useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*, campaigns(title)");

      if (error) {
        console.error(error);
        return;
      }
      console.log(data);
      setReviews(data);
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold">All reviews from participants</h2>
      <Accordion type="single" collapsible className="mt-6">
        {campaignTitles.map((title, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-3 gap-4">
                {reviews
                  .filter((review) => review.campaigns.title === title)
                  .map((review, index) => (
                    <Dialog>
                      <DialogTrigger>
                        <ReviewCard key={index} review={review} />
                      </DialogTrigger>
                      <DialogContent className="w-full max-w-lg sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
                        <DialogHeader>
                          <DialogTitle>
                            Review for {review.campaigns.title}
                          </DialogTitle>
                          <DialogDescription className="flex gap-6 pt-4">
                            <img
                              src={review.img}
                              alt={review.campaigns.title}
                              className="h-72 aspect-square object-cover"
                            />
                            <div>
                              <RatingDisplay rating={review.rating} />
                              <p className="ml-1 mt-2 text-base">
                                {review.review}
                              </p>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function ReviewCard({ review }: { review: ReviewData }) {
  return (
    <Card className="flex h-28 hover:shadow-lg transition-shadow">
      <img
        src={review.img}
        alt={review.campaigns.title}
        className="h-full aspect-square object-cover"
      />
      <div className="p-2">
        <RatingDisplay rating={review.rating} />
        <div className="line-clamp-3 text-sm text-start ml-1 mt-1">
          {review.review}
        </div>
      </div>
    </Card>
  );
}

export default ParticipantDashboard;
