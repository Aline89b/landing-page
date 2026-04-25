import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
<Card className="w-full max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
  <div className="flex flex-col items-center mb-4 w-full">
  <CardHeader className="w-full">
    <CardTitle className="w-full">Un modo diverso di viaggiare</CardTitle>
   
  </CardHeader>
  <CardContent>
    <p> Sempre più persone scelgono di viaggiare in modo consapevole.
Allo stesso tempo, sempre più host investono in un’ospitalità attenta all’ambiente e alla comunità.

Questo progetto nasce per far incontrare queste due realtà.

Per dare visibilità a chi fa scelte sostenibili e costruire insieme qualcosa che vada oltre il semplice viaggio.</p>
  </CardContent>
  </div>
  </Card>
  )
}

