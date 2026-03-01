export default function Hero() {
  return (
    <section className="hero reveal">
      <div className="hero-content">
        <div className="hero-title reveal">
  <h2 className="nickname-wrapper">
    <span className="nickname">Dan</span>
  </h2>
  <h1 className="real-name glitch-name">
    <span>D</span><span>a</span><span>n</span><span>i</span><span>l</span><span>o</span>
    <span>&nbsp;</span>
    <span>A</span><span>u</span><span>g</span><span>u</span><span>s</span><span>t</span><span>o</span>
  </h1>
</div>

        <p className="hero-subtitle reveal">Software Developer</p>
        <div className="hero-buttons reveal">
          <button
            className="btn gold"
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Contato
          </button>
        </div>


        <div>
  <video
    id="ashley1"
    src="/ashley-video.mp4"
    autoPlay
    muted
    playsInline
    loop
  />
</div>
      </div>
    </section>
  );
}
