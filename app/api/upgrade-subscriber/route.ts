// app/api/upgrade-subscriber/route.ts
import { NextResponse } from 'next/server'

const MAILERLITE_API_TOKEN = process.env.MAILERLITE_API_TOKEN
const GROUP_ID_STEP_1 = process.env.MAILERLITE_GROUP_ID_STEP_1
const GROUP_ID_STEP_2 = process.env.MAILERLITE_GROUP_ID_STEP_2

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email non valida' }, { status: 400 });
    }

    // Ottieni il subscriber
    const res = await fetch(`https://connect.mailerlite.com/api/subscribers/${email}`, {
      headers: {
        Authorization: `Bearer ${MAILERLITE_API_TOKEN}`,
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Utente non trovato' }, { status: 404 });
    }

    const subscriberData = await res.json();
    const subscriberId = subscriberData.data.id;
    const groups = subscriberData.data.groups || [];

    const isInGroup1 = groups.some((g) => g.id === GROUP_ID_STEP_1);

    if (!isInGroup1) {
      return NextResponse.json({ error: 'Utente non fa parte del primo gruppo' }, { status: 400 });
    }

    // Aggiorna i gruppi con solo il gruppo 2
    const update = await fetch(`https://connect.mailerlite.com/api/subscribers/${subscriberId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${MAILERLITE_API_TOKEN}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        groups: [GROUP_ID_STEP_2],
      }),
    });

    if (!update.ok) {
      const err = await update.json();
      return NextResponse.json({ error: err.message || 'Errore aggiornamento gruppo' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Utente aggiornato con successo' });
  } catch (err) {
    console.error('Errore API:', err);
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 });
  }
}
