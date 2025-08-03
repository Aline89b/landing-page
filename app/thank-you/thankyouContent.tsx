"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useState } from 'react'



export default function ThankYouPage() {
  
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

   const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleClick = async () => {
    if (!email) {
      setError("Email non presente nei parametri.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/upgrade-subscriber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Errore durante il passaggio al gruppo 2");
        return;
      }

      // Redirect al sito WordPress (modifica con l'URL corretto)
      router.push(`https://slowtravel.local/?email=${encodeURIComponent(email as string)}`);
    } catch (err) {
      console.error(err);
      setError("Errore imprevisto");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#2B9720] text-white px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Grazie per esserti iscritto!</h1>
      <p className="text-lg">Controlla la tua casella email, ti abbiamo appena inviato una conferma e il tuo regalo 🌱</p>
      <strong>{email}</strong>
      <Button onClick={handleClick} disabled={loading}>
        {loading ? "Caricamento..." : "Inizia ora"}
      </Button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>

  );
}
