export default function HowITWorks() {
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto mt-10">
            <h2 className="text-3xl font-bold text-center mb-6">Come funziona?</h2>
            <p className="text-gray-600 text-center mb-8"> 3 semplici passi: </p>
            <div className=" flex flex-col items-center w-full">
                <div className="fade-in-scroll delay-1 w-full bg-white shadow-lg rounded-lg p-6 mb-4 ">
                    <h3 className="text-xl font-semibold mb-2">1. Verifica i green powers</h3>
                    <p className="text-gray-700">La tua struttura deve soddisfare almeno tre dei requisiti elencati sopra.</p>
                </div>
                <div className="fade-in-scroll delay-2 w-full bg-white shadow-lg rounded-lg p-6 mb-4">
                    <h3 className="text-xl font-semibold mb-2">2. inserisci la tua email</h3>
                    <p className="text-gray-700">Inserisci la tua migliore e-mail nel campo sopra o sotto questa sezione.</p>
                </div>
                <div className= " fade-in-scroll delay-3 w-full bg-white shadow-lg rounded-lg p-6 mb-4">
                    <h3 className="text-xl font-semibold mb-2">3. Completa il tuop profilo</h3>
                    <p className="text-gray-700">Vai direttamente al sito per completare il tuo profilo e inserire i dettagli della tua struttura.</p>
                </div>
                <div className="w-2xs h-full animate-bounce delay-4 bg-green-100 shadow-lg rounded-lg p-6 mb-4">
                    <h3 className="text-xl font-semibold mb-2">Pronti!! </h3>
                    <p className="text-gray-700">Una volta approvato, inizia a ricevere richieste di prenotazione dai viaggiatori.</p>
                </div>
            </div>
        </div>
    );
}