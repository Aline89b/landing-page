import { NextRequest, NextResponse } from 'next/server';

// Credenziali MailerLite dalle variabili ambiente
const MAILERLITE_API_TOKEN = process.env.MAILERLITE_API_TOKEN;
const MAILERLITE_GROUP_ID_STEP_1 = process.env.MAILERLITE_GROUP_ID_STEP_1;

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
    if (!MAILERLITE_API_TOKEN || !MAILERLITE_GROUP_ID_STEP_1) {
      console.error('MailerLite credentials missing');
      return NextResponse.json(
        { error: 'Configurazione server non valida' },
        { status: 500 }
      );
    }

    // Chiamata a MailerLite API
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_TOKEN}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        groups: [MAILERLITE_GROUP_ID_STEP_1],
        status: 'active',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Gestione errori specifici MailerLite
      if (response.status === 422 && data.errors?.email) {
        return NextResponse.json(
          { error: 'Questa email è già iscritta' },
          { status: 400 }
        );
      }
      
      console.error('MailerLite error:', data);
      return NextResponse.json(
        { error: 'Errore durante l\'iscrizione' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Iscrizione completata con successo', subscriber: data.data },
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
