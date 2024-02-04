import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="flex justify-center py-24">
      <SignIn />
    </div>
  );
}
