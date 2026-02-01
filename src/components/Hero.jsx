export default function Hero() {
  return (
    <section className="hero reveal">
      <div className="hero-glow"></div>

      <div className="hero-content">
        <h2 className="hero-title reveal">
          <span className="nickname-wrapper">
            <span className="nickname">Dan</span> 
          </span>
          <span className="real-name">Danilo Augusto</span>
        </h2>

        <p className="hero-subtitle reveal">Software Developer</p>

        <div className="hero-buttons reveal">
          <button
            className="btn gold"
            onClick={() => {
              const contatoSection = document.getElementById("contact");
              if (contatoSection) {
                contatoSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Contato
          </button>
        </div>
      </div>
    </section>
  );
}
