import * as React from "react";
import { useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export default function ReviewLayout() {
  const { userId, isLoaded } = useAuth();
  const { token } = useParams();
  const navigate = useNavigate();

  // console.log("test", userId);

  React.useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, []);

  if (!token) return "404";

  if (!isLoaded) return "Loading...";

  return <Outlet />;
}
