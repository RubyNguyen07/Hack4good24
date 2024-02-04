import Hero from "@/components/Hero";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <Hero
        title="Welcome!"
        subtitle="Volunteer with us, make the world greener and earn rewards!!"
      />
      <div>
        <ul>
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LandingPage;
