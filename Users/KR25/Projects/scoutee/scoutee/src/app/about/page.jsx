export const metadata = {
  title: "About — Scoutee",
  description:
    "Learn more about Scoutee, your AI-powered survival companion for rides, SIMs and emergency numbers worldwide.",
};

export default function AboutPage() {
  return (
    <main className="container-app py-16 space-y-8">
      <h1 className="heading-gradient glow">About Scoutee</h1>
      <p className="muted text-lg">
        Scoutee was created to help travelers, digital nomads and locals find
        reliable services, instant eSIM connectivity, and emergency numbers
        wherever they are in the world.
      </p>
      <p>
        We believe in safety, accessibility, and convenience — combining AI
        support with curated tools that work globally.
      </p>
    </main>
  );
}
