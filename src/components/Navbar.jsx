import { useState, useRef } from "react";

export default function Navbar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <header className="navbar">
      <h1 className="logo" onClick={scrollToTop} style={{ cursor: "pointer" }}>
        Dan
      </h1>

      <nav>
        <a href="#about">Sobre</a>
        <a href="#technologies">Tecnologias</a>
        <a href="#projects">Projetos</a>
        <a href="#contact">Contato</a>
      </nav>

      {/* Ícone de música */}
    <div
  className={`music-icon ${isPlaying ? "playing" : ""}`}
  onClick={toggleMusic}
  title={isPlaying ? "pausar música" : "tocar música"}
>
  <div className="note-head note1"></div>
  <div className="note-stem note1"></div>
  <div className="note-flag note1"></div>
  
  <div className="note-head note2"></div>
  <div className="note-stem note2"></div>
  <div className="note-flag note2"></div>
</div>

      {/* Áudio */}
      <audio ref={audioRef} loop>
        <source src="/soundtrack.mp3" type="audio/mpeg" />
        Seu navegador não suporta áudio.
      </audio>
    </header>
  );
}
