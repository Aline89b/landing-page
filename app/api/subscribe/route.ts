import { NextRequest, NextResponse } from 'next/server';

// -------------------------------------
// Config
// -------------------------------------
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = 5;

// -------------------------------------
// Types
// -------------------------------------
type RequestBody = {
  email?: string;
};

type ApiResponse = {
  success?: boolean;
  message?: string;
  error?: string;
};

// -------------------------------------
// Route
// -------------------------------------
export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    // ---------------------------------
    // Parse body
    // ---------------------------------
    let body: RequestBody;

    try {
      body = (await request.json()) as RequestBody;
    } catch {
      return NextResponse.json(
        { error: 'Richiesta non valida.' },
        { status: 400 }
      );
    }

    const email = body.email?.trim().toLowerCase();

    // ---------------------------------
    // Validation
    // ---------------------------------
    if (!email) {
      return NextResponse.json(
        { error: 'Inserisci la tua email.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Inserisci un indirizzo email valido.' },
        { status: 400 }
      );
    }

    // ---------------------------------
    // Env check
    // ---------------------------------
    if (!BREVO_API_KEY) {
      console.error('BREVO_API_KEY mancante');

      return NextResponse.json(
        { error: 'Errore temporaneo del server.' },
        { status: 500 }
      );
    }

    // ---------------------------------
    // Request to Brevo
    // ---------------------------------
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });

    // ---------------------------------
    // Safe parse response
    // ---------------------------------
    const rawText = await response.text();

    let data: unknown = null;

    try {
      data = rawText ? JSON.parse(rawText) : null;
    } catch {
      data = rawText;
    }

    // ---------------------------------
    // Error handling
    // ---------------------------------
    if (!response.ok) {
      console.error('Brevo Error:', response.status, data);

      if (response.status === 400) {
        return NextResponse.json(
          {
            error:
              'Email già presente oppure non valida.',
          },
          { status: 400 }
        );
      }

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        return NextResponse.json(
          {
            error:
              'Servizio temporaneamente non disponibile.',
          },
          { status: 500 }
        );
      }

      if (response.status === 429) {
        return NextResponse.json(
          {
            error:
              'Troppi tentativi. Riprova tra poco.',
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          error:
            'Non è stato possibile completare l’iscrizione.',
        },
        { status: 500 }
      );
    }

    // ---------------------------------
    // Success
    // ---------------------------------
    return NextResponse.json(
      {
        success: true,
        message:
          'Perfetto! Controlla la tua email.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error:', error);

    return NextResponse.json(
      {
        error:
          'Errore imprevisto. Riprova più tardi.',
      },
      { status: 500 }
    );
  }
}