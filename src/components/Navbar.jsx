import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fadeOutAudio = (audio, duration = 1000) => {
    if (!audio) return;
    const step = 50;
    const volumeStep = audio.volume / (duration / step);

    const fade = setInterval(() => {
      if (audio.volume > volumeStep) {
        audio.volume -= volumeStep;
      } else {
        audio.volume = 1; 
        audio.pause();
        clearInterval(fade);
      }
    }, step);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      fadeOutAudio(audioRef.current, 1000);
      setIsPlaying(false);
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 1;
      audioRef.current.play().catch(() => {}); 
      setIsPlaying(true);
    }
  };


  useEffect(() => {
    const musicIcons = document.querySelectorAll(".music-icon");
    musicIcons.forEach((icon) => {
      let touchTimeout;
      const addTouchActive = () => {
        icon.classList.add("touch-active");
        clearTimeout(touchTimeout);
        touchTimeout = setTimeout(() => {
          icon.classList.remove("touch-active");
        }, 500);
      };
      icon.addEventListener("touchstart", addTouchActive);
    });
  }, []);

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

      <audio ref={audioRef} loop>
        <source src="/eight-mountains-by-savfk.mp3" type="audio/mpeg" />
        Seu navegador não suporta áudio.
      </audio>
    </header>
  );
}
