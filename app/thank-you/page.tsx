import { Suspense } from "react";
import ThankYouContent from "./thankyouContent";

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Caricamento...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
