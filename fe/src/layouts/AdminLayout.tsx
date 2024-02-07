import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  // console.log("test", user?.publicMetadata);

  React.useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role !== "admin") {
      navigate("/sign-in");
    }
  }, []);

  if (!isLoaded) return "Loading...";

  return <Outlet />;
}
