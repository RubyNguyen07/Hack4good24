import heroImg from "../assets/hero.jpg";

function Hero({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative h-52 flex flex-col items-center justify-center text-center text-white">
      <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
        <img
          className="min-w-full absolute object-cover brightness-50"
          src={heroImg}
          alt="Hero Image"
        />
      </div>
      <div className="space-y-4 z-10">
        <h1 className="font-bold text-3xl">{title}</h1>
        <h3 className="font-light text-lg">{subtitle}</h3>
        {children ?? (
          <div className="flex gap-4 justify-center">{children}</div>
        )}
      </div>
    </section>
  );
}

export default Hero;
