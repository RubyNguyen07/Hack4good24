import { SignedIn, SignedOut } from "@clerk/clerk-react";
import heroImg from "../assets/hero.png";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function Hero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="relative h-52 flex flex-col items-center justify-center text-center text-white">
      <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
        <img
          className="min-w-full absolute object-cover object-bottom"
          src={heroImg}
          alt="Hero Image"
        />
      </div>
      <div className="space-y-4 z-10">
        <h1 className="font-bold text-3xl">{title}</h1>
        <h3 className="font-light text-lg">{subtitle}</h3>
        <div className="flex gap-4 justify-center">
          <SignedIn>
            <Button asChild>
              <Link to="/profile">Profile</Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button asChild>
              <Link to="/sign-up">Sign Up</Link>
            </Button>
            <Button asChild>
              <Link to="/sign-in">Sign In</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </section>
  );
}

export default Hero;
