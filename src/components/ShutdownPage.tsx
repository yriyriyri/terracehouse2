export default function ShutdownPage() {
  return (
    <>
      <video
        className="bgVideo"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <main className="shutdownPage">
        <section className="shutdownMessage">
          <h1 className="bigTitle shutdownTitle">
            &apos;Terrace House 2&apos; is shutting down indefinitely
          </h1>
          <p className="shutdownBody">
            Recently our server hosting &apos;Terrace House 2&apos; has undergone a
            number of cyberattacks targeting compromising blackmail material
            regarding certain members of the house. Our lawyers have advised us
            not the speak out on the matter this early on in the invesigation. We
            can assure you any recording maliciously gathered was specifically
            adulterated to sound disturbing, the truth will come to light in due
            time.
          </p>
        </section>
      </main>
    </>
  );
}
