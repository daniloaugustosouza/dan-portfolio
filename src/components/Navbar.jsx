export default function Navbar() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    </header>
  );
}
