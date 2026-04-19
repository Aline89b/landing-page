import { NextRequest, NextResponse } from 'next/server';

// Credenziali Brevo dalle variabili ambiente
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = 5; // Lista LEAD

export async function POST(request: NextRequest) {
  try {
    // -----------------------------
    // Parse body sicuro
    // -----------------------------
    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Richiesta non valida.' },
        { status: 400 }
      );
    }

    const { email } = body;

    // -----------------------------
    // Validazione email
    // -----------------------------
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Inserisci la tua email.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { error: 'Inserisci un indirizzo email valido.' },
        { status: 400 }
      );
    }

    // -----------------------------
    // Check config server
    // -----------------------------
    if (!BREVO_API_KEY) {
      console.error('BREVO_API_KEY mancante');

      return NextResponse.json(
        { error: 'Errore temporaneo del server. Riprova più tardi.' },
        { status: 500 }
      );
    }

    // -----------------------------
    // Chiamata Brevo
    // -----------------------------
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: cleanEmail,
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });

    // -----------------------------
    // Parse risposta sicuro
    // -----------------------------
    const raw = await response.text();

    let data: any = {};

    try {
      data = raw ? JSON.parse(raw) : {};
    } catch {
      data = { raw };
    }

    // -----------------------------
    // Errori Brevo
    // -----------------------------
    if (!response.ok) {
      console.error('Brevo error:', response.status, data);

      if (response.status === 400) {
        return NextResponse.json(
          {
            error:
              'Questa email risulta già registrata oppure non è valida.',
          },
          { status: 400 }
        );
      }

      if (response.status === 401 || response.status === 403) {
        return NextResponse.json(
          {
            error:
              'Servizio momentaneamente non disponibile. Riprova tra poco.',
          },
          { status: 500 }
        );
      }

      if (response.status === 429) {
        return NextResponse.json(
          {
            error:
              'Hai effettuato troppi tentativi. Attendi qualche minuto.',
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          error:
            'Non siamo riusciti a completare l’iscrizione. Riprova tra poco.',
        },
        { status: 500 }
      );
    }

    // -----------------------------
    // Successo
    // -----------------------------
    return NextResponse.json(
      {
        success: true,
        message:
          'Perfetto! Controlla la tua email per ricevere il regalo e il prossimo step.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);

    return NextResponse.json(
      {
        error:
          'Si è verificato un errore imprevisto. Riprova tra qualche minuto.',
      },
      { status: 500 }
    );
  }
}