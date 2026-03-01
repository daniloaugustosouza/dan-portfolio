import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Technologies from "./components/Technologies";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useEffect } from "react";
import initBackground from "./script/Background";
import "./script/Cards";
import "./script/TechItems";
import "./script/Particles";

export default function App() {
  useEffect(() => {
    const cleanup = initBackground();
    
    return () => cleanup && cleanup();
  }, []);

  return (
    <>
      <Navbar />
      <main id="effects-root" className="app-main">
        <Hero />
        <About />
        <Technologies />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
