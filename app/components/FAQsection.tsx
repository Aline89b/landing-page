import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function FAQsection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 mt-5">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Domande Frequenti</h2>
        <Accordion type="single" collapsible className="space-y-4 bg-white p-3.5 rounded">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold">
             Chi può iscrivere la propria struttura sul portale?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">
              Qualsiasi proprietario o gestore di una struttura attenta all’ambiente: case vacanza, eco-hotel, agriturismi, B&B sostenibili, glamping, rifugi. L’importante è rispettare alcuni criteri di sostenibilità.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold">
              Come funziona la gestione delle prenotazioni e dei prezzi?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">
             Gestisci in autonomia il tuo annuncio, disponibilità e prenotazioni direttamente dalla piattaforma (proprio come su Airbnb). I pagamenti vengono rilasciati solo dopo il check-in dell’ospite.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-semibold">
              Quali sono i requisiti per essere considerata una struttura ecosostenibile?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">
              Valutiamo l’impatto ambientale, l’uso di energia rinnovabile, la gestione dei rifiuti, l’utilizzo di prodotti locali o biologici, e la promozione di un turismo lento e consapevole. Dopo l’invio dell’annuncio, facciamo una verifica e ti daremo un feedback.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-semibold">
             Quanto costa iscriversi?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">
              Niente! L'iscrizione è gratuita. Paghi una piccola commissione solo se ricevi una prenotazione. Nessun abbonamento o costo fisso.
           </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-semibold">
            Come ricevo i pagamenti?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">
            Riceverai pagamenti al netto della commissione scelta direttamente sul tuo conto bancario un giorno dopo il check in dell’ospite.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-semibold">
            Come attiro i primi clienti?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">
            All’inizio ci sarà una campagna promozionale mirata per dare visibilità alle prime strutture del portale, anche tramite social e pubblicità estera. Più il tuo annuncio è curato, più possibilità hai di ricevere richieste!
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
      </div>
    </section>
  );
}