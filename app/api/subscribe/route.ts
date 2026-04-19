import { NextRequest, NextResponse } from 'next/server';

// Credenziali Brevo dalle variabili ambiente
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = 5; // 1step- LEAD list ID

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validazione server-side (HTML5 style)
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email è richiesta' },
        { status: 400 }
      );
    }

    // Controllo formato email (più semplice)
    if (!email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { error: 'Email non valida' },
        { status: 400 }
      );
    }

    // Controllo variabili ambiente
    if (!BREVO_API_KEY) {
      console.error('Brevo API key missing');
      return NextResponse.json(
        { error: 'Configurazione server non valida' },
        { status: 500 }
      );
    }

    // Chiamata a Brevo API per aggiungere contatto alla lista
    const response = await fetch('https://api.brevo.com/v3/contacts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'api-key': BREVO_API_KEY!,
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    email,
    listIds: [BREVO_LIST_ID],
    updateEnabled: true
  }),
});

    const data = await response.json();

    if (!response.ok) {
      // Gestione errori specifici Brevo
      if (response.status === 400 && data.message?.includes('already exists')) {
        return NextResponse.json(
          { error: 'Questa email è già iscritta' },
          { status: 400 }
        );
      }
      
      console.error('Brevo error:', data);
      return NextResponse.json(
        { error: 'Errore durante l\'iscrizione' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Iscrizione completata con successo', subscriber: data },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}
