
import CTA from "./cta"

export default function Hero() {
  return (
    <section className="relative bg-[url(https://plus.unsplash.com/premium_photo-1664355811261-642e566f3e82?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen bg-cover bg-no-repeat bg-center"
    
  >
    <div className="absolute inset-0 bg-black/50 z-10" />
    <div className="relative ml-0 text-left items-start z-20 max-w-md mx-auto flex flex-col justify-center h-full px-4 text-white space-y-6">
        <h1 className="text-3xl font-bold font-architects">
          Hai una struttura ecosostenibile?
        </h1>
        <p className="text-base font-arsenal">
          Unisciti al primo portale dedicato all’ospitalità consapevole. Raggiungi viaggiatori che condividono i tuoi valori.
        </p>
        <CTA />
      </div>
    </section>
  )
}