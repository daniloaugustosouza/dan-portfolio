export default function Contact() {
  return (
    <section id="contact" className="section reveal">
      <h3 className="reveal">Contato</h3>
      <div className="section-divider reveal"></div>

      <p className="reveal contact-text">
        Deixe-me saber como podemos colaborar para criar algo notável juntos.
      </p>

      <br />

      <div className="contact-links reveal">
        <a
          href="https://mail.google.com/mail/?view=cm&to=souzadaniloaugusto6@email.com"
          target="_blank"
          className="contact-item"
        >
          <i className="fa-solid fa-envelope"></i>
          <span>Email</span>
        </a>

        <a
          href="https://www.linkedin.com/in/danilo-augusto-souza"
          target="_blank"
          className="contact-item"
        >
          <i className="fa-brands fa-linkedin"></i>
          <span>LinkedIn</span>
        </a>

        <a
          href="https://github.com/daniloaugustosouza"
          target="_blank"
          className="contact-item"
        >
          <i className="fa-brands fa-github"></i>
          <span>GitHub</span>
        </a>
      </div>
      
    </section>
  );
}
