import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
<Card className="w-full max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
  <div className="flex flex-col items-center mb-4 w-full">
  <CardHeader className="w-full">
    <CardTitle className="w-full"> Chi c’è dietro questo progetto?</CardTitle>
   
  </CardHeader>
  <CardContent>
    <p> Ciao! 👋 Mi chiamo Aline, sono appassionata di viaggi autentici e sostenibilità. Questo progetto nasce da un’idea semplice: aiutare strutture attente all’ambiente a farsi conoscere da viaggiatori consapevoli.

 Se hai una struttura ecosostenibile e vuoi essere tra i primi, ti invito a candidarti: la visibilità sarà tutta concentrata su di voi!</p>
  </CardContent>
  </div>
  </Card>
  )
}

