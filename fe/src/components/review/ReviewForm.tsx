import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Slider } from "../ui/slider";

export const reviewFormSchema = z.object({
  img: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, "File is required."),
  rating: z.number().int().min(1).max(5),
  review: z.string().min(5),
});

function ReviewForm({
  onSubmit,
}: {
  onSubmit: (data: z.infer<typeof reviewFormSchema>) => void;
}) {
  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 5,
      review: "",
    },
  });
  const imgRef = form.register("img");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="img"
          render={() => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input type="file" {...imgRef} accept="image/*" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  defaultValue={[value]}
                  onValueChange={(values) => onChange(values[0])}
                  className="w-full max-w-60"
                />
              </FormControl>
              <FormDescription>{value} / 5</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="How do you feel about the event?"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default ReviewForm;
