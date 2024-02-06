import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

function RatingDisplay({ rating }: { rating: number }) {
  return (
    <div className=" text-start">
      {[...Array(5)].map((_, index) =>
        rating > index ? (
          <StarFilledIcon
            key={index}
            className="w-6 h-6 text-yellow-500 inline"
          />
        ) : (
          <StarIcon key={index} className="w-6 h-6 text-gray-300 inline" />
        )
      )}
    </div>
  );
}

export default RatingDisplay;
