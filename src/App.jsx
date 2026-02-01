import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Technologies from "./components/Technologies";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { useEffect } from "react";
import initBackground from "./script/Background";

export default function App() {
  useEffect(() => {
    const cleanup = initBackground();
    return () => cleanup && cleanup();
  }, []);

  return (
    <>
      <Navbar />
      <main className="app-main"></main>
      <main id="effects-root">
        <Hero />
        <About />
        <Technologies />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
