import About from "./components/about";
import Advantages from "./components/advantages";
import CTA_SECTION from "./components/cta-section";
import FAQsection from "./components/FAQsection";
import Footer from "./components/footer";
import Hero from "./components/hero";
import HowITWorks from "./components/howitworks";
import { Requirements } from "./components/requirements";

export default function Home() {
  return  (
    <main>
     <Hero />
     < Requirements />
     < Advantages />
     <HowITWorks />
     <CTA_SECTION/>
     < About />
     <FAQsection />
     <Footer /> 
    </main>
  );
}
