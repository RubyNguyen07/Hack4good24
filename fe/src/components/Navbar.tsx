import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "@/assets/logo.png";
import { SignedIn, UserButton } from "@clerk/clerk-react";

function Navbar() {
  return (
    <nav className={"border px-6 py-4 flex justify-between items-center"}>
      <div className="flex gap-6 items-center">
        <Avatar>
          <AvatarImage src={logo} alt="@shadcn" />
          <AvatarFallback>GUI</AvatarFallback>
        </Avatar>
        <span className={"text-2xl font-semibold"}>Ground-Up Initiative</span>
      </div>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </nav>
  );
}

export default Navbar;
