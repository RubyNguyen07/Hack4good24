import Hero from "@/components/Hero";
import ReviewForm, { reviewFormSchema } from "@/components/review/ReviewForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import supabase, { uploadImage } from "@/lib/supabaseClient";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

function ReviewPage() {
  const { user } = useUser();
  const { token } = useParams();
  const [campaignId, setCampaignId] = React.useState<string>("");
  const [exist, setExist] = React.useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaignId = async () => {
      const { data, error } = await supabase
        .from("campaigns")
        .select("id")
        .eq("token", token);
      if (error) {
        console.error(error);
        return;
      }
      if (data) {
        setCampaignId(data[0].id);
      }
    };
    const checkReviewExist = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("campaignId")
        .eq("campaignId", campaignId)
        .eq("volunteerId", user?.id);
      if (error) {
        console.error(error);
        return;
      }
      if (data.length > 0) {
        console.log("Review exist", data);
        setExist(true);
      }
    };
    token && fetchCampaignId();
    campaignId && user?.id && checkReviewExist();
  }, [user?.id, campaignId, token]);

  const onReviewSubmit = async (values: z.infer<typeof reviewFormSchema>) => {
    const { data: uploadData, error: uploadError } = await uploadImage(
      values.img[0],
      "images",
      `review/${Math.floor(Math.random() * 1000)}-${values.img[0].name}`
    );
    if (uploadError || !uploadData) {
      console.error(uploadError);
      return;
    }

    const newReview = {
      id: user?.id,
      rating: values.rating,
      review: values.review,
      img: `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/images/${uploadData?.path}`,
    };

    // const { error: insertError } = await supabase
    //   .from("reviews")
    //   .insert([newReview]);

    // if (insertError) {
    //   console.error(insertError);
    //   return;
    // }

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/volunteers/review/${token}`,
        newReview
      );
      navigate("/profile");
      toast.success("Review submitted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review");
    }
  };

  if (!campaignId) {
    return (
      <Hero
        title="Invalid token"
        subtitle="Please use a valid link to leave a review."
      >
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
        <Button asChild className="ml-4">
          <Link to="/profile">Profile</Link>
        </Button>
      </Hero>
    );
  }

  if (exist) {
    return (
      <Hero
        title="Review already submitted"
        subtitle="You have already submitted a review for this event."
      >
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
        <Button asChild className="ml-4">
          <Link to="/profile">Profile</Link>
        </Button>
      </Hero>
    );
  }

  return (
    <div>
      <Hero
        title={`Thank you, ${user?.firstName}!`}
        subtitle={`Please register your attendance by leaving a review and earn rewards!`}
      >
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
        <Button asChild className="ml-4">
          <Link to="/profile">Profile</Link>
        </Button>
      </Hero>
      <div className="px-8 md:px-16 py-10">
        <h2 className="text-3xl font-bold text-center">Leave us a review</h2>
        <Card className="p-8 mt-6">
          <ReviewForm onSubmit={onReviewSubmit} />
        </Card>
      </div>
    </div>
  );
}

export default ReviewPage;
