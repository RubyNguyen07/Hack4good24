import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/clerk-react";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();
  return (
    <ClerkProvider navigate={navigate} publishableKey={PUBLISHABLE_KEY}>
      <Navbar />
      <main>
        <Outlet />
        <Toaster />
      </main>
      <Footer />
    </ClerkProvider>
  );
}
