"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";


export default function CTA() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  type StatusType = 'success' | 'error' | null;
  const [status, setStatus] = useState<StatusType>(null); // 'success', 'error', null
  const [message, setMessage] = useState("");

  interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
  }

  interface CTAForm extends HTMLFormElement {
    elements: FormElements;
  }

  
  const handleSubmit = async (e: React.FormEvent<CTAForm>) => {
    e.preventDefault();
    
    // Reset stato
    setStatus(null);
    setMessage("");

    // Usa le validazioni HTML5 native di React
    const form = e.target as CTAForm;
    const formData = new FormData(form);
    const emailValue = formData.get('email');

    // Controllo validità del form (HTML5 validation)
    if (!form.checkValidity()) {
      const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement | null;
      if (emailInput && !emailInput.validity.valid) {
        if (emailInput.validity.valueMissing) {
          setStatus('error');
          setMessage('Inserisci un indirizzo email');
          return;
        }
        if (emailInput.validity.typeMismatch) {
          setStatus('error');
          setMessage('Inserisci un indirizzo email valido');
          return;
        }
      }
    }

    if (!isChecked) {
      setStatus('error');
      setMessage('Devi accettare i termini e le condizioni');
      return;
    }

    setIsLoading(true);

    try {
      // Chiamata alla nostra API route
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailValue }),
      });

      const data: { error?: string } = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Iscrizione completata con successo!');
        setEmail('');
        setIsChecked(false);
        router.push(`/thank-you?email=${encodeURIComponent(email)}`);


      } else {
        setStatus('error');
        setMessage(data.error || 'Si è verificato un errore. Riprova più tardi.');
      }
    } catch (error) {
      console.error('Errore durante l\'iscrizione:', error);
      setStatus('error');
      setMessage('Si è verificato un errore. Riprova più tardi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Input
            type="email"
            name="email"
            placeholder="La tua email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white text-black"
            disabled={isLoading}
            required
          />
        
          <Button 
            type="submit"
            className="bg-[#2B9720] hover:bg-[#49AD3F] text-white disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Iscrizione...' : 'Iscriviti'}
          </Button>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Checkbox 
            id="terms" 
            checked={isChecked}
            onCheckedChange={setIsChecked}
            className="data-[state=checked]:bg-[#2B9720] data-[state=checked]:border-[#2B9720]"
            disabled={isLoading}
          />
          <label htmlFor="terms" className="text-sm text-white cursor-pointer">
            Accetto i termini e le condizioni
          </label>
        </div>
      </form>

      {/* Messaggi di stato */}
      {status && (
        <div className={`mt-4 p-3 rounded-md text-sm ${
          status === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {status === 'success' ? '✓ ' : '⚠ '}
          {message}
        </div>
      )}
    </div>
  );
}
