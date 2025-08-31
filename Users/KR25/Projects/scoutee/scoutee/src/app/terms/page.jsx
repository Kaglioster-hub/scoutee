export const metadata = {
  title: "Terms & Conditions – Scoutee",
  description: "Read the terms and conditions of using Scoutee services.",
};

export default function TermsPage() {
  return (
    <section className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Terms & Conditions</h1>
      <p>
        Utilizzando Scoutee accetti di farlo a tuo rischio. Non garantiamo
        che tutti i servizi o numeri di emergenza siano sempre accurati o
        disponibili.
      </p>
      <p>
        L’app è fornita così com’è, senza garanzie espresse o implicite.
        Raccomandiamo sempre di verificare le informazioni critiche
        attraverso fonti ufficiali.
      </p>
    </section>
  );
}
