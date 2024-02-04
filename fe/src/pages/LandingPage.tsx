import Hero from "@/components/Hero";
import MaterialSavedChart from "@/components/landing/MaterialSavedChart";
import OverallData from "@/components/landing/OverallData";
import PastWorkshops from "@/components/landing/PastWorkshops";
import VolunteerRegistration from "@/components/landing/VolunteerRegistration";

function LandingPage() {
  return (
    <div>
      <Hero
        title="Welcome!"
        subtitle="Volunteer with us, make the world greener and earn rewards!!"
      />
      <div className="px-8 md:px-16 py-10">
        <h2 className="text-3xl font-bold text-center">Overall Statistics</h2>
        <OverallData />
        <VolunteerRegistration />
        <MaterialSavedChart />
        <PastWorkshops />
      </div>
    </div>
  );
}

export default LandingPage;
