import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";
import { Values } from "@/components/sections/Values";
import { Contact } from "@/components/sections/Contact";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden w-full">
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Values />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
