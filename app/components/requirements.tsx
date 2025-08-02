import Requirement from "./requirement"
import { requirementData } from "../data/requirementData"

export function Requirements() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl lg:max-w-6xl mx-auto p-2 mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">La tua struttura è eco? Scoprilo!</h2>
      <p className="text-gray-600 text-center mb-8">
        L’utilizzo di energie rinnovabili, una gestione attenta dell’acqua, la riduzione dei rifiuti e una cucina sostenibile sono i pilastri su cui si basano gli eco-hotel.
      </p>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:w-full">
      {requirementData.map((req) => (
        <Requirement key={req.id} {...req} />
      ))}
    </div>
    </div>
  );
}
